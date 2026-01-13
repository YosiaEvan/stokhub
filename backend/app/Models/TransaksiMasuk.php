<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransaksiMasuk extends Model
{
    protected $table = 'transaksi_masuk';

    protected $fillable = [
        'tanggal',
        'supplier_id',
        'user_id',
        'keterangan',
        'status',
        'disetujui_oleh',
        'disetujui_pada',
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function details()
    {
        return $this->hasMany(DetailTransaksiMasuk::class);
    }

    public function getTotalAttribute()
    {
        return $this->details->sum(function ($detail) {
            return $detail->jumlah * $detail->harga_beli;
        });
    }
}
