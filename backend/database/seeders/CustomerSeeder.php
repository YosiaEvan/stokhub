<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customers = [
            [
                'nama' => 'PT Maju Jaya Abadi',
                'kontak' => '021-5551234',
                'alamat' => 'Jl. Sudirman Kav. 52-53, Jakarta Pusat 10250',
                'email' => 'info@majujaya.co.id',
            ],
            [
                'nama' => 'CV Karya Mandiri',
                'kontak' => '022-4567890',
                'alamat' => 'Jl. Asia Afrika No. 123, Bandung 40261',
                'email' => 'contact@karyamandiri.com',
            ],
            [
                'nama' => 'PT Sejahtera Bersama',
                'kontak' => '031-7778899',
                'alamat' => 'Jl. Raya Darmo No. 89, Surabaya 60264',
                'email' => 'admin@sejahterabersama.co.id',
            ],
            [
                'nama' => 'PT Teknologi Digital Indonesia',
                'kontak' => '021-8889900',
                'alamat' => 'Jl. HR Rasuna Said Kav. 1-2, Jakarta Selatan 12940',
                'email' => 'sales@teknodigital.id',
            ],
            [
                'nama' => 'CV Sukses Makmur',
                'kontak' => '0274-556677',
                'alamat' => 'Jl. Malioboro No. 45, Yogyakarta 55271',
                'email' => 'info@suksesmakmur.com',
            ],
            [
                'nama' => 'PT Cahaya Sentosa',
                'kontak' => '024-3334455',
                'alamat' => 'Jl. Pemuda No. 100, Semarang 50132',
                'email' => 'contact@cahayasentosa.co.id',
            ],
            [
                'nama' => 'PT Berkah Jaya Utama',
                'kontak' => '061-4445566',
                'alamat' => 'Jl. Gatot Subroto No. 234, Medan 20235',
                'email' => 'info@berkahjaya.com',
            ],
            [
                'nama' => 'CV Indo Prima Sejahtera',
                'kontak' => '0411-8887766',
                'alamat' => 'Jl. AP Pettarani No. 67, Makassar 90222',
                'email' => 'admin@indoprima.co.id',
            ],
            [
                'nama' => 'PT Nusantara Raya',
                'kontak' => '0361-7778888',
                'alamat' => 'Jl. Sunset Road No. 88, Denpasar 80361',
                'email' => 'sales@nusantararaya.com',
            ],
            [
                'nama' => 'PT Anugrah Perdana',
                'kontak' => '0711-5556677',
                'alamat' => 'Jl. Jenderal Sudirman No. 456, Palembang 30126',
                'email' => 'contact@anugrahperdana.co.id',
            ],
            [
                'nama' => 'CV Bintang Terang',
                'kontak' => '0721-3334455',
                'alamat' => 'Jl. Kartini No. 78, Bandar Lampung 35214',
                'email' => 'info@bintangterang.com',
            ],
            [
                'nama' => 'PT Global Wijaya Mandiri',
                'kontak' => '021-6667788',
                'alamat' => 'Jl. MT Haryono Kav. 23, Jakarta Timur 13630',
                'email' => 'admin@globalwijaya.co.id',
            ],
            [
                'nama' => 'PT Mitra Usaha Bersama',
                'kontak' => '022-9998877',
                'alamat' => 'Jl. Dago No. 234, Bandung 40135',
                'email' => 'sales@mitrausaha.com',
            ],
            [
                'nama' => 'CV Sejati Karya',
                'kontak' => '031-4443322',
                'alamat' => 'Jl. Diponegoro No. 123, Surabaya 60241',
                'email' => 'info@sejatikarya.co.id',
            ],
            [
                'nama' => 'PT Harapan Bangsa',
                'kontak' => '0274-7776655',
                'alamat' => 'Jl. Solo No. 56, Yogyakarta 55284',
                'email' => 'contact@harapanbangsa.com',
            ],
        ];

        DB::table('customer')->insert($customers);
    }
}
