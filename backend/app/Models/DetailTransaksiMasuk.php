<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailTransaksiMasuk extends Model
{
    protected $table = 'detail_transaksi_masuk';

    protected $fillable = [
        'transaksi_masuk_id',
        'barang_id',
        'jumlah',
        'harga_beli',
    ];

    public function transaksiMasuk()
    {
        return $this->belongsTo(TransaksiMasuk::class);
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
