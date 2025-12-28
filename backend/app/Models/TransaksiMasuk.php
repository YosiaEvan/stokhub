<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransaksiMasuk extends Model
{
    protected $fillable = [
        'tanggal',
        'supplier_id',
        'user_id',
        'keterangan',
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
