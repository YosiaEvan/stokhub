<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    // GET /api/suppliers - Ambil semua supplier
    public function index(Request $request)
    {
        $query = Supplier::query();

        if ($request->has('search')) {
            $search = $request->query('search');
            $query->where(function($q) use ($search) {
                $q->where('nama', 'like', "%$search%");
            });
        }

        // Pagination
        $perPage = $request->query('per_page', 10);
        $suppliers = $query->paginate($perPage);

        return response()->json($suppliers, 200);
    }

    // POST /api/suppliers - Tambah supplier baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'kontak' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'email' => 'required|string|max:255',
        ]);

        $supplier = Supplier::create($validated);

        return response()->json($supplier, 201);
    }

    // PUT /api/suppliers/{id} - Update supplier
    public function update(Request $request, $id)
    {
        $supplier = Supplier::findOrFail($id);

        if (! $supplier) {
            return response()->json(['message' => 'Supplier tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'nama' => 'sometimes|string|max:255',
            'kontak' => 'sometimes|string|max:255',
            'alamat' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|max:255',
        ]);

        $supplier->update($validated);

        return response()->json($supplier, 200);
    }

    // DELETE /api/suppliers/{id} - Hapus supplier
    public function destroy($id)
    {
        $supplier = Supplier::findOrFail($id);

        if (! $supplier) {
            return response()->json(['message' => 'Supplier tidak ditemukan'], 404);
        }

        $supplier->delete();

        return response()->json(['message' => 'Supplier berhasil dihapus'], 200);
    }
}
