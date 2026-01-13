<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CatatanPersetujuan extends Model
{
    protected $table = 'catatan_persetujuan';

    protected $fillable = [
        'tipe_transaksi',
        'transaksi_id',
        'aksi',
        'user_id',
        'catatan',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
