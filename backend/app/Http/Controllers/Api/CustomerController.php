<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    // GET /api/customer - Ambil semua customer
    public function index(Request $request)
    {
        $query = Customer::query();

        if ($request->has('search')) {
            $search = $request->query('search');
            $query->where(function($q) use ($search) {
                $q->where('nama', 'like', "%$search%");
            });
        }

        // Pagination
        $perPage = $request->query('per_page', 10);
        $customers = $query->paginate($perPage);

        return response()->json($customers, 200);
    }

    // POST /api/customer - Tambah customer baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'kontak' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'email' => 'required|string|max:255',
        ]);

        $customer = Customer::create($validated);

        return response()->json($customer, 201);
    }

    // PUT /api/customers/{id} - Update customer
    public function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);

        if (!$customer) {
            return response()->json(['message' => 'Customer tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'nama' => 'sometimes|string|max:255',
            'kontak' => 'sometimes|string|max:255',
            'alamat' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|max:255',
        ]);

        $customer->update($validated);

        return response()->json($customer, 200);
    }

    // DELETE /api/customer/{id} - Hapus customer
    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);

        if (!$customer) {
            return response()->json(['message' => 'Customer tidak ditemukan'], 404);
        }

        $customer->delete();

        return response()->json(['message' => 'Customer berhasil dihapus'], 200);
    }
}
