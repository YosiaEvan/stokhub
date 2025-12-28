<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table = 'customer';

    protected $fillable = [
        'nama',
        'kontak',
        'alamat',
        'email',
    ];

    public $timestamps = false;

    public function transaksiKeluar()
    {
        return $this->hasMany(TransaksiKeluar::class);
    }
}
