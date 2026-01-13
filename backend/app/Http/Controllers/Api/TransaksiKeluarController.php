<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Barang;
use App\Models\TransaksiKeluar;
use Illuminate\Http\Request;

class TransaksiKeluarController extends Controller
{
    // GET /api/transaksi-keluar - Ambil semua transaksi keluar
    public function index(Request $request)
    {
        $query = TransaksiKeluar::with(['customer', 'user', 'details.barang']);

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
        $transaksiKeluars = $query->paginate($perPage);

        // Tambahkan total harga beli untuk setiap transaksi
        $transaksiKeluars->getCollection()->transform(function ($transaksi) {
            $transaksi->total_harga_beli = $transaksi->total;
            return $transaksi;
        });

        return response()->json($transaksiKeluars, 200);
    }

    // POST /api/transaksi-keluar - Tambah transaksi keluar baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tanggal' => 'required|date',
            'customer_id' => 'required|exists:customer,id',
            'user_id' => 'required|exists:users,id',
            'keterangan' => 'nullable|string',
            'details' => 'required|array|min:1',
            'details.*.barang_id' => 'required|exists:barang,id',
            'details.*.jumlah' => 'required|integer|min:1',
            'details.*.harga_jual' => 'required|numeric|min:0',
        ]);

        $transaksiKeluar = TransaksiKeluar::create([
            'tanggal' => $validated['tanggal'],
            'customer_id' => $validated['customer_id'],
            'user_id' => $validated['user_id'],
            'keterangan' => $validated['keterangan'] ?? null,
            'status' => 0,
            'disetujui_oleh' => null,
            'disetujui_pada' => null,
        ]);

        foreach ($validated['details'] as $detail) {
            $transaksiKeluar->details()->create($detail);

            // Update stok barang
            $barang = Barang::find($detail['barang_id']);
            $barang->stok -= $detail['jumlah'];
            $barang->save();
        }

        // Muat ulang relasi details untuk mengembalikan data lengkap
        $transaksiKeluar->load(['customer', 'user', 'details.barang']);
        $transaksiKeluar->total_harga_beli = $transaksiKeluar->total;

        return response()->json([
            'message' => 'Transaksi keluar berhasil ditambahkan',
            'data' => $transaksiKeluar
        ], 201);
    }

    // GET /api/transaksi-keluar/{id} - Ambil detail transaksi keluar berdasarkan ID
    public function show($id)
    {
        $transaksiKeluar = TransaksiKeluar::with(['customer', 'user', 'details.barang'])->findOrFail($id);

        if (! $transaksiKeluar) {
            return response()->json(['message' => 'Transaksi keluar tidak ditemukan'], 404);
        }

        $transaksiKeluar->total_harga_beli = $transaksiKeluar->total;
        return response()->json($transaksiKeluar, 200);
    }

    // PUT  /api/transaksi-keluar/{id} - Update transaksi keluar
    public function update(Request $request, $id)
    {
        $transaksiKeluar = TransaksiKeluar::findOrFail($id);

        if (! $transaksiKeluar) {
            return response()->json(['message' => 'Transaksi keluar tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'tanggal' => 'sometimes|date',
            'customer_id' => 'sometimes|exists:customer,id',
            'user_id' => 'sometimes|exists:users,id',
            'keterangan' => 'nullable|string',
            'details' => 'sometimes|array|min:1',
            'details.*.barang_id' => 'required_with:details|exists:barang,id',
            'details.*.jumlah' => 'required_with:details|integer|min:1',
            'details.*.harga_beli' => 'required_with:details|numeric|min:0',
        ]);

        foreach ($transaksiKeluar->details as $oldDetail) {
            $barang = Barang::find($oldDetail->barang_id);
            $barang->stok += $oldDetail->jumlah;
            $barang->save();
        }

        $transaksiKeluar->details()->delete();
        $transaksiKeluar->update([
            'tanggal' => $validated['tanggal'],
            'customer_id' => $validated['customer_id'],
            'user_id' => $validated['user_id'],
            'keterangan' => $validated['keterangan'],
        ]);

        foreach ($request->details as $detail) {
            $transaksiKeluar->details()->create([
                'transaksi_keluar_id' => $transaksiKeluar->id,
                'barang_id' => $detail['barang_id'],
                'jumlah' => $detail['jumlah'],
                'harga_beli' => $detail['harga_beli'],
            ]);

            // Update stok barang
            $barang = Barang::find($detail['barang_id']);
            $barang->stok -= $detail['jumlah'];
            $barang->save();
        }

        // Muat ulang relasi details untuk mengembalikan data lengkap
        $transaksiKeluar->load(['customer', 'user', 'details.barang']);
        $transaksiKeluar->total_harga_beli = $transaksiKeluar->total;

        return response()->json([
            'message' => 'Transaksi keluar berhasil diperbarui',
            'data' => $transaksiKeluar
        ], 200);
    }

    // DELETE /api/transaksi-keluar/{id} - Hapus transaksi keluar
    public function destroy($id)
    {
        $transaksiKeluar = TransaksiKeluar::findOrFail($id);

        if (! $transaksiKeluar) {
            return response()->json(['message' => 'Transaksi keluar tidak ditemukan'], 404);
        }

        foreach ($transaksiKeluar->details as $detail) {
            $barang = Barang::find($detail->barang_id);
            $barang->stok -= $detail->jumlah;
            $barang->save();
        }

        $transaksiKeluar->delete();

        return response()->json(['message' => 'Transaksi keluar berhasil dihapus'], 200);
    }
}
