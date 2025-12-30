import { useEffect, useState } from "react";
import api from '../api/axios';

export default function LatestActivitiesTable() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await api.get("/aktivitas-terbaru");
                setData(response.data.aktivitas_terbaru);
            } catch (error) {
                console.error("Gagal mengambil data aktivitas", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <table className="min-w-max w-full border-2 borders-solid border-[#f7f7f9] rounded-xl">
            <thead>
                <tr className="bg-[#f7f8f9]">
                    <th className="p-4 text-left">ID</th>
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-left">Item</th>
                    <th className="p-4 text-left">Qty</th>
                    <th className="p-4 text-left">Type</th>
                    <th className="p-4 text-left">Status</th>
                </tr>
            </thead>
            <tbody>
                {isLoading && (
                    [...Array(5)].map((_, i) => (
                        <tr key={i} className="animate-pulse border-b border-[#f7f7f9]">
                            <td className="p-2">
                                <div className="h-4 bg-gray-200 rounded w-16"></div>
                            </td>
                            <td className="p-2">
                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                            </td>
                            <td className="p-2">
                                <div className="h-4 bg-gray-200 rounded w-32"></div>
                            </td>
                            <td className="p-2">
                                <div className="h-4 bg-gray-200 rounded w-10"></div>
                            </td>
                            <td className="p-2">
                                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                            </td>
                            <td className="p-2">
                                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                            </td>
                        </tr>
                    ))
                )}
                {!isLoading && data.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="text-center p-5">
                            No data available
                        </td>
                    </tr>
                ) : (
                    data.map((item, index) => (
                        <tr key={index} className="border-b border-[#f7f7f9]">
                            <td className="p-4">{item.kode_barang}</td>
                            <td className="p-4">{item.tanggal}</td>
                            <td className="p-4">{item.nama_barang}</td>
                            <td className="p-4">{item.jumlah}</td>
                            <td className="p-4">
                                <span className={`px-4 py-1 rounded-full text-xs font-semibold ${item.tipe == "masuk" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}>{item.tipe === "masuk" ? "In" : "Out"}</span>
                            </td>
                            {/* <td className="p-2">
                                <span
                                    className={`px-2 py-1 rounded text-xs ${
                                        item.tipe === "masuk"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {item.tipe}
                                </span>
                            </td> */}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )
}