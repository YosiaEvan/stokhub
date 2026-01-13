<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('transaksi_masuk', function (Blueprint $table) {
            $table->smallInteger('status')->default(0)->after('keterangan');
            $table->string('disetujui_oleh')->after('status');
            $table->timestamp('disetujui_pada')->after('disetujui_oleh');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transaksi_masuk', function (Blueprint $table) {
            $table->dropColumn('status');
            $table->dropColumn('disetujui_oleh');
            $table->dropColumn('disetujui_pada');
        });
    }
};
