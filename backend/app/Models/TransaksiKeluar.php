<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransaksiKeluar extends Model
{
    protected $table = 'transaksi_keluar';

    protected $fillable = [
        'tanggal',
        'customer_id',
        'user_id',
        'keterangan',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function details()
    {
        return $this->hasMany(DetailTransaksiKeluar::class);
    }

    public function getTotalAttribute()
    {
        return $this->details->sum(function ($detail) {
            return $detail->jumlah * $detail->harga_beli;
        });
    }
}
