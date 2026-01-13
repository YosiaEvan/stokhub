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
        $barangs = [
            [
                'kode_barang' => 'BRG001',
                'nama_barang' => 'Laptop Asus ROG',
                'kategori' => 'Elektronik',
                'satuan' => 'unit',
                'stok' => 0,
                'stok_minimum' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_barang' => 'BRG002',
                'nama_barang' => 'Mouse Logitech',
                'kategori' => 'Aksesoris',
                'satuan' => 'pcs',
                'stok' => 0,
                'stok_minimum' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_barang' => 'BRG003',
                'nama_barang' => 'Keyboard Mechanical',
                'kategori' => 'Aksesoris',
                'satuan' => 'pcs',
                'stok' => 0,
                'stok_minimum' => 8,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_barang' => 'BRG004',
                'nama_barang' => 'Monitor LG 24 inch',
                'kategori' => 'Elektronik',
                'satuan' => 'unit',
                'stok' => 0,
                'stok_minimum' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_barang' => 'BRG005',
                'nama_barang' => 'Printer Canon',
                'kategori' => 'Elektronik',
                'satuan' => 'unit',
                'stok' => 0,
                'stok_minimum' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_barang' => 'BRG006',
                'nama_barang' => 'Kertas A4',
                'kategori' => 'ATK',
                'satuan' => 'rim',
                'stok' => 0,
                'stok_minimum' => 20,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_barang' => 'BRG007',
                'nama_barang' => 'Pulpen Pilot',
                'kategori' => 'ATK',
                'satuan' => 'pcs',
                'stok' => 0,
                'stok_minimum' => 50,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_barang' => 'BRG008',
                'nama_barang' => 'Flashdisk 32GB',
                'kategori' => 'Elektronik',
                'satuan' => 'pcs',
                'stok' => 0,
                'stok_minimum' => 15,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_barang' => 'BRG009',
                'nama_barang' => 'Headset Gaming',
                'kategori' => 'Aksesoris',
                'satuan' => 'pcs',
                'stok' => 0,
                'stok_minimum' => 8,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_barang' => 'BRG010',
                'nama_barang' => 'Webcam Logitech',
                'kategori' => 'Aksesoris',
                'satuan' => 'pcs',
                'stok' => 0,
                'stok_minimum' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_barang' => 'BRG011',
                'nama_barang' => 'Kabel HDMI',
                'kategori' => 'Aksesoris',
                'satuan' => 'pcs',
                'stok' => 0,
                'stok_minimum' => 20,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_barang' => 'BRG012',
                'nama_barang' => 'SSD 500GB',
                'kategori' => 'Elektronik',
                'satuan' => 'unit',
                'stok' => 0,
                'stok_minimum' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_barang' => 'BRG013',
                'nama_barang' => 'RAM 8GB DDR4',
                'kategori' => 'Elektronik',
                'satuan' => 'unit',
                'stok' => 0,
                'stok_minimum' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_barang' => 'BRG014',
                'nama_barang' => 'Stapler Besar',
                'kategori' => 'ATK',
                'satuan' => 'pcs',
                'stok' => 0,
                'stok_minimum' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_barang' => 'BRG015',
                'nama_barang' => 'Mousepad Gaming',
                'kategori' => 'Aksesoris',
                'satuan' => 'pcs',
                'stok' => 0,
                'stok_minimum' => 20,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        DB::table('barang')->insert($barangs);
    }
}
