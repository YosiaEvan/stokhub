<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailTransaksiKeluar extends Model
{
    protected $table = 'detail_transaksi_keluar';

    protected $fillable = [
        'transaksi_keluar_id',
        'barang_id',
        'jumlah',
        'harga_jual',
    ];

    public function transaksiKeluar()
    {
        return $this->belongsTo(TransaksiKeluar::class);
    }

    public function barang()
    {
        return $this->belongsTo(Barang::class);
    }

    public function getSubtotalAttribute()
    {
        return $this->jumlah * $this->harga_beli;
    }
}
