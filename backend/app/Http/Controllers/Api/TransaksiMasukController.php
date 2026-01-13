<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Barang;
use App\Models\TransaksiMasuk;
use Illuminate\Http\Request;

class TransaksiMasukController extends Controller
{
    // GET /api/transaksi-masuk - Ambil semua transaksi masuk
    public function index(Request $request)
    {
        $query = TransaksiMasuk::with(['supplier', 'user', 'details.barang']);

        // Filter berdasarkan tanggal atau supplier
        if ($request->has('tanggal_dari') && $request->has('tangal_sampai')) {
            $query->whereBetween('tanggal', [$request->query('tanggal_dari'), $request->query('tangal_sampai')]);
        }

        if ($request->has('supplier_id')) {
            $query->where('supplier_id', $request->query('supplier_id'));
        }

        // Sorting
        $sortBy = $request->query('sort_by', 'tanggal');
        $sortOrder = $request->query('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->query('per_page', 10);
        $transaksiMasuks = $query->paginate($perPage);

        // Tambahkan total harga beli untuk setiap transaksi
        $transaksiMasuks->getCollection()->transform(function ($transaksi) {
            $transaksi->total_harga_beli = $transaksi->total;
            return $transaksi;
        });

        return response()->json($transaksiMasuks, 200);
    }

    // POST /api/transaksi-masuk - Tambah transaksi masuk baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tanggal' => 'required|date',
            'supplier_id' => 'required|exists:supplier,id',
            'user_id' => 'required|exists:users,id',
            'keterangan' => 'nullable|string',
            'details' => 'required|array|min:1',
            'details.*.barang_id' => 'required|exists:barang,id',
            'details.*.jumlah' => 'required|integer|min:1',
            'details.*.harga_beli' => 'required|numeric|min:0',
        ]);

        $transaksiMasuk = TransaksiMasuk::create([
            'tanggal' => $validated['tanggal'],
            'supplier_id' => $validated['supplier_id'],
            'user_id' => $validated['user_id'],
            'keterangan' => $validated['keterangan'] ?? null,
            'status' => 0,
            'disetujui_oleh' => null,
            'disetujui_pada' => null,
        ]);

        foreach ($validated['details'] as $detail) {
            $transaksiMasuk->details()->create($detail);

            // Update stok barang
            $barang = Barang::find($detail['barang_id']);
            $barang->stok += $detail['jumlah'];
            $barang->save();
        }

        // Muat ulang relasi details untuk mengembalikan data lengkap
        $transaksiMasuk->load(['supplier', 'user', 'details.barang']);
        $transaksiMasuk->total_harga_beli = $transaksiMasuk->total;

        return response()->json([
            'message' => 'Transaksi masuk berhasil ditambahkan',
            'data' => $transaksiMasuk
        ], 201);
    }

    // GET /api/transaksi-masuk/{id} - Ambil detail transaksi masuk berdasarkan ID
    public function show($id)
    {
        $transaksiMasuk = TransaksiMasuk::with(['supplier', 'user', 'details.barang'])->findOrFail($id);

        if (! $transaksiMasuk) {
            return response()->json(['message' => 'Transaksi masuk tidak ditemukan'], 404);
        }

        $transaksiMasuk->total_harga_beli = $transaksiMasuk->total;

        return response()->json($transaksiMasuk, 200);
    }

    // PUT  /api/transaksi-masuk/{id} - Update transaksi masuk
    public function update(Request $request, $id)
    {
        $transaksiMasuk = TransaksiMasuk::findOrFail($id);

        if (! $transaksiMasuk) {
            return response()->json(['message' => 'Transaksi masuk tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'tanggal' => 'sometimes|date',
            'supplier_id' => 'sometimes|exists:supplier,id',
            'user_id' => 'sometimes|exists:users,id',
            'keterangan' => 'nullable|string',
            'details' => 'sometimes|array|min:1',
            'details.*.barang_id' => 'required_with:details|exists:barang,id',
            'details.*.jumlah' => 'required_with:details|integer|min:1',
            'details.*.harga_beli' => 'required_with:details|numeric|min:0',
        ]);

        foreach ($transaksiMasuk->details as $oldDetail) {
            $barang = Barang::find($oldDetail->barang_id);
            $barang->stok -= $oldDetail->jumlah;
            $barang->save();
        }

        $transaksiMasuk->details()->delete();

        $transaksiMasuk->update([
            'tanggal' => $validated['tanggal'],
            'supplier_id' => $validated['supplier_id'],
            'user_id' => $validated['user_id'],
            'keterangan' => $validated['keterangan'],
        ]);

        foreach ($request->details as $detail) {
            $transaksiMasuk->details()->create([
                'transaksi_masuk_id' => $transaksiMasuk->id,
                'barang_id' => $detail['barang_id'],
                'jumlah' => $detail['jumlah'],
                'harga_beli' => $detail['harga_beli'],
            ]);

            // Update stok barang
            $barang = Barang::find($detail['barang_id']);
            $barang->stok += $detail['jumlah'];
            $barang->save();
        }

        // Muat ulang relasi details untuk mengembalikan data lengkap
        $transaksiMasuk->load(['supplier', 'user', 'details.barang']);
        $transaksiMasuk->total_harga_beli = $transaksiMasuk->total;

        return response()->json([
            'message' => 'Transaksi masuk berhasil diperbarui',
            'data' => $transaksiMasuk
        ], 200);
    }

    // DELETE /api/transaksi-masuk/{id} - Hapus transaksi masuk
    public function destroy($id)
    {
        $transaksiMasuk = TransaksiMasuk::findOrFail($id);

        if (! $transaksiMasuk) {
            return response()->json(['message' => 'Transaksi masuk tidak ditemukan'], 404);
        }

        foreach ($transaksiMasuk->details as $detail) {
            $barang = Barang::find($detail->barang_id);
            $barang->stok -= $detail->jumlah;
            $barang->save();
        }

        $transaksiMasuk->delete();

        return response()->json(['message' => 'Transaksi masuk berhasil dihapus'], 200);
    }
}