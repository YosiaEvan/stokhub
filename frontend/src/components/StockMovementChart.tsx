import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../api/axios';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

export default function StockMovementChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        api.get('/pergerakan-stok').then((res) => {
            const labels = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            
            const data = res.data.data.map(item => item.pergerakan);

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Stock Movement',
                        data,
                        borderColor: "#0f8a71",
                        backgroundColor: "rgba(15, 138, 113, 0.2)",
                        tension: 0.5,
                        fill: true,
                        pointRadius: 0,
                        pointHoverRadius: 0,
                    },
                ],
            });
        });
    }, []);

    if (!chartData) return <p>Loading chart...</p>;

    return (
        <Line
            data={chartData}
            options={{ 
                responsive: true,
                maintainAspectRatio: false,
                resizeDelay: 200,
                plugins: {
                    legend: { display: false },
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        beginAtZero: true,
                    }
                }
             }}
        />
    );
}