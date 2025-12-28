<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $suppliers = [
            [
                'nama' => 'PT Teknologi Maju',
                'kontak' => '021-5551234',
                'alamat' => 'Jl. Sudirman No. 123',
                'email' => 'info@teknologimaju.com',
            ],
            [
                'nama' => 'CV Sumber Elektronik',
                'kontak' => '021-5555678',
                'alamat' => 'Jl. Thamrin No. 45',
                'email' => 'info@sumberelektronik.com',
            ],
            [
                'nama' => 'PT Perkasa Abadi',
                'kontak' => '021-5559101',
                'alamat' => 'Jl. Gatot Subroto No. 78',
                'email' => 'info@perkasabadi.com',
            ],
        ];

        DB::table('supplier')->insert($suppliers);
    }
}
