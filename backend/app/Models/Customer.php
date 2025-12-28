<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'nama',
        'kontak',
        'alamat',
        'email',
    ];

    public function transaksiKeluar()
    {
        return $this->hasMany(TransaksiKeluar::class);
    }
}
