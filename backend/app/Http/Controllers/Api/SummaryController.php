<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Barang;
use App\Models\Customer;
use App\Models\Supplier;
use App\Models\TransaksiMasuk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SummaryController extends Controller
{
    // GET /api/total-items - Ringkasan statistik barang
    public function totalItems()
    {
        $totalBarang = Barang::count();
        
        $bulanIni = Barang::whereBetween('created_at', [now()->startOfMonth(), now()->endOfMonth()])->count();
        $bulanLalu = Barang::whereBetween('created_at', [now()->subMonth()->startOfMonth(), now()->subMonth()->endOfMonth()])->count();

        $selisih = $bulanIni - $bulanLalu;
        $persentase = $bulanLalu > 0 ? round(($selisih / $bulanLalu) * 100, 2) : 100;

        $stokMenipis = Barang::whereColumn('stok', '<=', 'stok_minimum')->count();


        $summary = [
            'total_barang' => $totalBarang,
            'bulan_ini' => $bulanIni,
            'bulan_lalu' => $bulanLalu,
            'selisih' => $selisih,
            'persentase' => $persentase,
            'status' => $persentase >= 0 ? 'naik' : 'turun',
            'stok_menipis' => $stokMenipis,
        ];

        return response()->json($summary, 200);
    }

    // GET /api/total-supplier - Total supplier
    public function totalSuppliers()
    {
        $totalSupplier = Supplier::count();

        $summary = [
            'total_supplier' => $totalSupplier,
        ];

        return response()->json($summary, 200);
    }

    // GET /api/total-customers - Total pelanggan
    public function totalCustomers()
    {
        $totalCustomer = Customer::count();

        $summary = [
            'total_customer' => $totalCustomer,
        ];

        return response()->json($summary, 200);
    }

    // GET /api/transaksi-hari-ini - Total transaksi hari ini
    public function transactionsToday()
    {
        $transactionsToday = TransaksiMasuk::whereDate('created_at', now()->toDateString())->count();
        $yesterdayTransactions = TransaksiMasuk::whereDate('created_at', now()->subDay()->toDateString())->count();
        $selisih = $transactionsToday - $yesterdayTransactions;
        $persentase = $yesterdayTransactions > 0 ? round(($selisih / $yesterdayTransactions) * 100, 2) : 100;

        $summary = [
            'transaksi_hari_ini' => $transactionsToday,
            'transaksi_kemarin' => $yesterdayTransactions,
            'selisih' => $selisih,
            'persentase' => $persentase,
            'status' => $persentase >= 0 ? 'naik' : 'turun',
        ];

        return response()->json($summary, 200);
    }

    // GET /api/pergerakan-stok - Pergerakan stok barang
    public function stockMovement()
    {
        $year = now()->year;

        $masuk = DB::table('transaksi_masuk as tm')
            ->join('detail_transaksi_masuk as dt', 'dt.transaksi_masuk_id', '=', 'tm.id')
            ->selectRaw('MONTH(tm.tanggal) as bulan, SUM(dt.jumlah) as total_masuk')
            ->whereYear('tm.tanggal', $year)
            ->groupBy('bulan')
            ->get();

        $keluar = DB::table('transaksi_keluar as tk')
            ->join('detail_transaksi_keluar as dt', 'dt.transaksi_keluar_id', '=', 'tk.id')
            ->selectRaw('MONTH(tk.tanggal) as bulan, SUM(dt.jumlah) as total_keluar')
            ->whereYear('tk.tanggal', $year)
            ->groupBy('bulan')
            ->get();

        $result = [];

        for ($i = 1; $i <= 12; $i++) {
            $in = $masuk->firstWhere('bulan', $i)?->total_masuk ?? 0;
            $out = $keluar->firstWhere('bulan', $i)?->total_keluar ?? 0;

            $result[] = [
                'month' => $i,
                'stok_masuk' => (int) $in,
                'stok_keluar' => (int) $out,
                'pergerakan' => (int) ($in - $out),
            ];
        }

        return response()->json([
            'year' => $year,
            'data' => $result
        ]);
    }

    // GET /api/transaksi-masuk-keluar - Ringkasan transaksi masuk dan keluar
    public function transactionsInOut()
    {
        $year = now()->year;

        // Jumlah transaksi masuk per bulan
        $masuk = DB::table('transaksi_masuk')
            ->selectRaw('MONTH(tanggal) as bulan, COUNT(id) as total_masuk')
            ->whereYear('tanggal', $year)
            ->groupBy('bulan')
            ->get();

        // Jumlah transaksi keluar per bulan
        $keluar = DB::table('transaksi_keluar')
            ->selectRaw('MONTH(tanggal) as bulan, COUNT(id) as total_keluar')
            ->whereYear('tanggal', $year)
            ->groupBy('bulan')
            ->get();

        $result = [];

        for ($i = 1; $i <= 12; $i++) {
            $totalMasuk = $masuk->firstWhere('bulan', $i)?->total_masuk ?? 0;
            $totalKeluar = $keluar->firstWhere('bulan', $i)?->total_keluar ?? 0;

            $result[] = [
                'month' => $i,
                'transaksi_masuk' => (int) $totalMasuk,
                'transaksi_keluar' => (int) $totalKeluar,
            ];
        }

        return response()->json([
            'year' => $year,
            'data' => $result
        ]);
    }

    // GET /api/aktivitas-terbaru - Transaksi terakhir dalam sistem
    public function latestActivities()
    {
        $transaksiMasuk = DB::table('transaksi_masuk')
            ->join('detail_transaksi_masuk', 'detail_transaksi_masuk.transaksi_masuk_id', '=', 'transaksi_masuk.id')
            ->join('barang', 'barang.id', '=', 'detail_transaksi_masuk.barang_id')
            ->select('barang.kode_barang', 'transaksi_masuk.tanggal', 'barang.nama_barang', 'detail_transaksi_masuk.jumlah', DB::raw("'masuk' as tipe"))
            ->orderBy('transaksi_masuk.tanggal', 'desc')
            ->limit(5)
            ->get();

        $transaksiKeluar = DB::table('transaksi_keluar')
            ->join('detail_transaksi_keluar', 'detail_transaksi_keluar.transaksi_keluar_id', '=', 'transaksi_keluar.id')
            ->join('barang', 'barang.id', '=', 'detail_transaksi_keluar.barang_id')
            ->select('barang.kode_barang', 'transaksi_keluar.tanggal', 'barang.nama_barang', 'detail_transaksi_keluar.jumlah', DB::raw("'keluar' as tipe"))
            ->orderBy('transaksi_keluar.tanggal', 'desc')
            ->limit(5)
            ->get();

        $riwayat = $transaksiMasuk
            ->merge($transaksiKeluar)
            ->sortByDesc('tanggal')
            ->take(5)
            ->values();

        return response()->json([
            'aktivitas_terbaru' => $riwayat,
        ]);
    }

    // GET /api/kategori - Total barang per kategori
    public function category()
    {
        $data = Barang::select('kategori', DB::raw('COUNT(*) as total_barang'))
            ->groupBy('kategori')
            ->orderBy('kategori')
            ->get();

        return response()->json([
            'message' => 'Total barang per kategori',
            'data' => $data,
        ], 200);
    }
}
