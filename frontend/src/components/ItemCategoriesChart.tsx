import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import api from '../api/axios';

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
);

export default function ItemCategoriesChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        api.get('/kategori').then((res) => {
            const labels = res.data.data.map(item => item.kategori);
            const data = res.data.data.map(item => item.total_barang);

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Transactions In',
                        data: data,
                        backgroundColor: [
                            '#0f8a71',
                            '#1fad53',
                            '#f59f0a',
                        ],
                        borderWidth: 0,
                        cutout: '65%',
                    },
                ],
            });
        });
    }, []);

    if (!chartData) return <p>Loading chart...</p>;

    return (
        <Doughnut
            data={chartData}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `${context.label}: ${context.raw}`;
                            },
                        },
                    },
                },
            }}
        />
    );
}