<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    protected $table = 'supplier';

    protected $fillable = [
        'nama',
        'kontak',
        'alamat',
        'email',
    ];

    public $timestamps = false;

    public function transaksiMasuk()
    {
        return $this->hasMany(TransaksiMasuk::class);
    }
}
