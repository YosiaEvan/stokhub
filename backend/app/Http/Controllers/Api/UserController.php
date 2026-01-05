<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // GET /api/user - Ambil semua user
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->has('search')) {
            $search = $request->query('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%$search%");
            });
        }

        // Pagination
        $perPage = $request->query('per_page', 10);
        $users = $query->paginate($perPage);

        return response()->json($users, 200);
    }

    // POST /api/user - Tambah user baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'required|string|unique:users,email|max:255',
            'password' => 'required|string|max:255',
            'role' => 'required|string|max:50',
        ]);

        $user = User::create($validated);

        return response()->json($user, 201);
    }

    // PUT /api/user/{id} - Update user
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if (!$user) {
            return response()->json(['message' => 'User tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'username' => 'sometimes|string|max:255',
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'sometimes|string|max:255',
            'role' => 'sometimes|string|max:50',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);
        return response()->json($user, 200);
    }

    // DELETE /api/user/{id} - Hapus user
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        if (!$user) {
            return response()->json(['message' => 'User tidak ditemukan'], 404);
        }

        $user->delete();
        return response()->json(['message' => 'User berhasil dihapus'], 200);
    }
}
