<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BarangController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\SummaryController;
use App\Http\Controllers\Api\SupplierController;
use App\Http\Controllers\Api\TransaksiMasukController;
use App\Http\Controllers\Api\TransaksiKeluarController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum', 'role:admin'])->group(function() {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('barang', BarangController::class);
    Route::get('total-items', [SummaryController::class, 'totalItems']);
    Route::get('total-suppliers', [SummaryController::class, 'totalSuppliers']);
    Route::get('total-customers', [SummaryController::class, 'totalCustomers']);
    Route::get('transaksi-hari-ini', [SummaryController::class, 'transactionsToday']);
    Route::get('pergerakan-stok', [SummaryController::class, 'stockMovement']);
    Route::get('transaksi-masuk-keluar', [SummaryController::class, 'transactionsInOut']);
    Route::get('aktivitas-terbaru', [SummaryController::class, 'latestActivities']);
    Route::get('kategori', [SummaryController::class, 'category']);
    Route::apiResource('supplier', SupplierController::class);
    Route::apiResource('customer', CustomerController::class);
    Route::apiResource('user', UserController::class);
    Route::apiResource('transaksi-masuk', TransaksiMasukController::class);
    Route::apiResource('transaksi-keluar', TransaksiKeluarController::class);
});
