<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Barang;
use Illuminate\Http\Request;

class BarangController extends Controller
{
    // GET /api/barang - Ambil semua barang
    public function index(Request $request)
    {
        $query = Barang::query();

        // Filter berdasarkan kategori atau pencarian nama barang
        if ($request->has('kategori')) {
            $query->where('kategori', $request->query('kategori'));
        }

        if ($request->has('search')) {
            $search = $request->query('search');
            $query->where(function($q) use ($search) {
                $q->where('nama_barang', 'like', "%$search%");
            });
        }

        // Pagination
        $perPage = $request->query('per_page', 10);
        $barangs = $query->paginate($perPage);

        return response()->json($barangs, 200);
    }

    // POST /api/barang - Tambah barang baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode_barang' => 'required|string|unique:barang,kode_barang|max:50',
            'nama_barang' => 'required|string|max:255',
            'kategori' => 'required|string|max:100',
            'satuan' => 'required|string|max:50',
            'stok' => 'required|integer|min:0',
            'stok_minimum' => 'required|integer|min:0',
        ]);

        $barang = Barang::create($validated);

        return response()->json($barang, 201);
    }

    // PUT /api/barang/{id} - Update barang
    public function update(Request $request, $id)
    {
        $barang = Barang::findOrFail($id);

        if (! $barang) {
            return response()->json(['message' => 'Barang tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'kode_barang' => 'sometimes|string|unique:barang,kode_barang,' . $id . '|max:50',
            'nama_barang' => 'sometimes|string|max:255',
            'kategori' => 'sometimes|string|max:100',
            'satuan' => 'sometimes|string|max:50',
            'stok' => 'sometimes|integer|min:0',
            'stok_minimum' => 'sometimes|integer|min:0',
        ]);

        $barang->update($validated);

        return response()->json($barang, 200);
    }

    // DELETE /api/barang/{id} - Hapus barang
    public function destroy($id)
    {
        $barang = Barang::findOrFail($id);

        if (! $barang) {
            return response()->json(['message' => 'Barang tidak ditemukan'], 404);
        }

        $barang->delete();

        return response()->json(['message' => 'Barang berhasil dihapus'], 200);
    }
}