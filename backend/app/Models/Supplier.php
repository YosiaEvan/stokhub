<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    protected $fillable = [
        'nama',
        'kontak',
        'alamat',
        'email',
    ];

    public function transaksiMasuk()
    {
        return $this->hasMany(TransaksiMasuk::class);
    }
}
