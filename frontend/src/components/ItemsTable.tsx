import React, { useEffect, useState } from "react";
import api from '../api/axios';
import Swal from "sweetalert2";

interface Item {
    id: number;
    kode_barang: string;
    nama_barang: string;
    kategori: string;
    satuan: string;
    stok: number;
    stok_minimum: number;
}

interface UsersTableProps {
    isOpenModalAdd: boolean;
    setIsOpenModalAdd: React.Dispatch<React.SetStateAction<boolean>>;
    refreshKey: number;
    setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
    isOpenModalUpdate: boolean;
    setIsOpenModalUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedItem: React.Dispatch<React.SetStateAction<Item | null>>;
}

export default function ItemsTable({ setIsOpenModalAdd, refreshKey, setRefreshKey, setIsOpenModalUpdate, setSelectedItem }: UsersTableProps) {
    const [data, setData] = useState<Item[]>([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async (page = 1, keyword = search) => {
        try {
            setIsLoading(true);
            const response = await api.get("/barang", {
                params: {
                    page: page,
                    search: keyword,
                    per_page: 10,
                },
            });
            setData(response.data.data);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error("Gagal mengambil data aktivitas", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    useEffect(() => {
        const delay = setTimeout(() => {
            setCurrentPage(1);
            fetchData(1, search);
        }, 400);

        return () => clearTimeout(delay);
    }, [search]);

    useEffect(() => {
        fetchData(1);
        setRefreshKey(0);
    }, [refreshKey]);

    const openAddModal = () => {
        setIsOpenModalAdd(true);
    }

    const openUpdateModal = (item: Item) => {
        setSelectedItem(item);
        setIsOpenModalUpdate(true);
    }

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: "Are you sure want to delete?",
            text: "This item data cannot be recovered!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        })

        if (!result.isConfirmed) return;

        try {
            await api.delete(`/barang/${id}`);

            Swal.fire({
                icon: "success",
                title: "Successful",
                text: "Item successfully deleted",
                timer: 1500,
                showConfirmButton: false,
            })

            fetchData(currentPage);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed",
                text: "Failed to delete user",
            });
            console.error(error);
        }
    }

    return (
        <div className="p-5 bg-white rounded-xl shadow-md w-full">
            <div className="flex flex-col md:flex-row gap-5 md:items-center justify-between mb-5">
                <h3 className="text-lg font-semibold">Items Table</h3>
                <div className="flex items-center gap-2">
                    <input type="text" placeholder="Search item..." value={search} onChange={(e) => setSearch(e.target.value)} className="border px-3 py-2 rounded basis-1/2 w-40" />
                    <button onClick={openAddModal} className="bg-green-500 hover:bg-green-700 text-white px-3 py-2 border border-green-500 rounded basis-1/2 transition-all duration-300"><i className="fa-solid fa-plus mr-2"></i> Add Item</button>
                </div>
            </div>
            <div className="overflow-auto w-full rounded-xl">
                <div className="max-w-75 md:max-w-100 lg:max-w-full rounded-xl">
                    <table className="min-w-max w-full border-2 borders-solid border-[#f7f7f9] rounded-xl">
                        <thead>
                            <tr className="bg-[#f7f8f9]">
                                <th className="p-4 text-left">No</th>
                                <th className="p-4 text-left">ID</th>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">Category</th>
                                <th className="p-4 text-left">Unit</th>
                                <th className="p-4 text-left">Stock</th>
                                <th className="p-4 text-left">Minimum Stock</th>
                                <th className="p-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse border-b border-[#f7f7f9]">
                                        <td className="p-2">
                                            <div className="h-4 bg-gray-200 rounded w-40"></div>
                                        </td>
                                        <td className="p-2">
                                            <div className="h-4 bg-gray-200 rounded w-40"></div>
                                        </td>
                                        <td className="p-2">
                                            <div className="h-4 bg-gray-200 rounded w-40"></div>
                                        </td>
                                        <td className="p-2">
                                            <div className="h-4 bg-gray-200 rounded w-40"></div>
                                        </td>
                                        <td className="p-2">
                                            <div className="h-4 bg-gray-200 rounded-full w-40"></div>
                                        </td>
                                        <td className="p-2">
                                            <div className="h-4 bg-gray-200 rounded-full w-40"></div>
                                        </td>
                                        <td className="p-2">
                                            <div className="h-4 bg-gray-200 rounded-full w-40"></div>
                                        </td>
                                        <td className="p-2">
                                            <div className="h-4 bg-gray-200 rounded-full w-40"></div>
                                        </td>
                                    </tr>
                                ))
                            ) : data.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center p-5 min-w-max w-240">
                                        No data available
                                    </td>
                                </tr>
                            ) : (
                                data.map((item, index) => (
                                    <tr key={index} className="border-b border-[#f7f7f9]">
                                        <td className="p-4">{index+1}</td>
                                        <td className="p-4">{item.kode_barang}</td>
                                        <td className="p-4">{item.nama_barang}</td>
                                        <td className="p-4">{item.kategori}</td>
                                        <td className="p-4">{item.satuan}</td>
                                        <td className="p-4">{item.stok}</td>
                                        <td className="p-4">{item.stok_minimum}</td>
                                        <td className="p-2">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => openUpdateModal(item)} className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 border border-blue-500 rounded transition-all duration-300"><i className="fa-regular fa-pen-to-square mr-2"></i>Update</button>
                                                <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 border border-red-500 rounded transition-all duration-300"><i className="fa-regular fa-trash-can mr-2"></i>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="w-full flex items-center justify-end gap-2 mt-5">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
                <span>Page {currentPage} of {lastPage}</span>
                <button disabled={currentPage === lastPage} onClick={() => setCurrentPage(prev => prev + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
            </div>
        </div>
    )
}