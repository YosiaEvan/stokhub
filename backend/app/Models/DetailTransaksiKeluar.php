<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailTransaksiKeluar extends Model
{
    protected $fillable = [
        'transaksi_keluar_id',
        'barang_id',
        'jumlah',
        'harga_beli',
    ];

    public function transaksiKeluar()
    {
        return $this->belongsTo(TransaksiKeluar::class);
    }

    public function barang()
    {
        return $this->belongsTo(Barang::class);
    }
}
