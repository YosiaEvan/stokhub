import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../api/axios';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    BarElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    BarElement
);

export default function TransactionsInOut() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        api.get('/transaksi-masuk-keluar').then((res) => {
            const labels = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            
            const transaksiMasuk = res.data.data.map(item => item.transaksi_masuk);
            const transaksiKeluar = res.data.data.map(item => item.transaksi_keluar);

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Transactions In',
                        data: transaksiMasuk,
                        borderColor: "#0f8a71",
                        backgroundColor: "#1fad53",
                        tension: 0.5,
                        fill: true,
                        borderRadius: 4,
                        barThickness: 20,
                    },
                    {
                        label: 'Transactions Out',
                        data: transaksiKeluar,
                        borderColor: "#e74c3c",
                        backgroundColor: "#0da2e7",
                        tension: 0.5,
                        fill: true,
                        borderRadius: 4,
                        barThickness: 20,
                    },
                ],
            });
        });
    }, []);

    if (!chartData) return <p>Loading chart...</p>;

    return (
        <Bar
            data={chartData}
            options={{ 
                responsive: true,
                maintainAspectRatio: false,
                resizeDelay: 200,
                plugins: {
                    legend: { position: 'bottom' },
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0,
                        }
                    }
                }
             }}
        />
    );
}