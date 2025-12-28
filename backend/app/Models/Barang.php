<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Barang extends Model
{
    protected $fillable = [
        'kode_barang',
        'nama_barang',
        'kategori',
        'satuan',
        'stok',
        'stok_minimum',
    ];

    public function transaksiMasukDetails()
    {
        return $this->hasMany(DetailTransaksiMasuk::class);
    }
}
