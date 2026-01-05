import { useState } from "react";
import api from "../api/axios";

interface AddItemModalProps {
    isOpenModalAdd: boolean;
    setIsOpenModalAdd: React.Dispatch<React.SetStateAction<boolean>>;
    refreshKey: number;
    setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
}

export default function AddItemModal({ setIsOpenModalAdd, setRefreshKey }: AddItemModalProps) {
    const [kodeBarang, setKodeBarang] = useState("");
    const [namaBarang, setNamaBarang] = useState("");
    const [kategori, setKategori] = useState("");
    const [satuan, setSatuan] = useState("");
    const [stok, setStok] = useState(0);
    const [stokMinimum, setStokMinimum] = useState(0);

    const closeAddModal = () => {
        setIsOpenModalAdd(false);
    }

    const handleAddItemSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await api.post("/barang", {
                "kode_barang": kodeBarang,
                "nama_barang": namaBarang,
                "kategori": kategori,
                "satuan": satuan,
                "stok": stok,
                "stok_minimum": stokMinimum,
            });

            console.log(response);
            setKodeBarang("");
            setNamaBarang("");
            setKategori("");
            setSatuan("");
            setStokMinimum(0);
            setIsOpenModalAdd(false);
            setRefreshKey(1);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="absolute inset-0 z-50 bg-black/40 w-full flex items-center justify-center p-6">
            <div className="bg-white rounded-xl w-full max-h-full max-w-2xl flex flex-col overflow-hidden">
                <div className="flex items-center justify-between border-b-2 border-[#f4f4f5] p-5 shrink-0">
                    <h3 className="text-xl font-semibold">Add Item</h3>
                    <i onClick={closeAddModal} className="fa-regular fa-circle-xmark"></i>
                </div>
                {/* Form */}
                <div className="p-5 flex-1 overflow-y-auto">
                    <form onSubmit={handleAddItemSubmit}>
                        {/* Kode Barang */}
                        <div className="flex flex-col mb-2">
                            <label htmlFor="kode_barang" className="font-semibold mb-2">Item Code</label>
                            <input type="text" value={kodeBarang} onChange={(e) => setKodeBarang(e.target.value)} name="kode_barang" id="kode_barang" placeholder="Enter item code" className="bg-[#f9fafb] p-3 w-full border border-solid border-[#e2e4e9] rounded-xl focus:border-2 focus:border-[#0f8a71] focus:outline-none" required />
                        </div>
                        {/* Nama Barang */}
                        <div className="flex flex-col mb-2">
                            <label htmlFor="nama_barang" className="font-semibold mb-2">Item Name</label>
                            <input type="text" value={namaBarang} onChange={(e) => setNamaBarang(e.target.value)} name="nama_barang" id="nama_barang" placeholder="Enter item name" className="bg-[#f9fafb] p-3 w-full border border-solid border-[#e2e4e9] rounded-xl focus:border-2 focus:border-[#0f8a71] focus:outline-none" required />
                        </div>
                        {/* Kategori */}
                        <div className="flex flex-col mb-2">
                            <label htmlFor="kategori" className="font-semibold mb-2">Kategori</label>
                            <div className="w-full relative">
                                <select name="kategori" id="kategori" value={kategori} onChange={(e) => setKategori(e.target.value)} className="bg-[#f9fafb] p-3 w-full border border-solid border-[#e2e4e9] rounded-xl focus:border-2 focus:border-[#0f8a71] focus:outline-none" required>
                                    <option value="" disabled>Select category</option>
                                    <option value="Aksesoris">Aksesoris</option>
                                    <option value="ATK">ATK</option>
                                    <option value="Elektronik">Elektronik</option>
                                </select>
                                <i className="fa-solid fa-chevron-down absolute right-4 top-4"></i>
                            </div>
                        </div>
                        {/* Satuan */}
                        <div className="flex flex-col mb-2">
                            <label htmlFor="satuan" className="font-semibold mb-2">Unit</label>
                            <div className="w-full relative">
                                <select name="satuan" id="satuan" value={satuan} onChange={(e) => setSatuan(e.target.value)} className="bg-[#f9fafb] p-3 w-full border border-solid border-[#e2e4e9] rounded-xl focus:border-2 focus:border-[#0f8a71] focus:outline-none" required>
                                    <option value="" disabled>Select unit</option>
                                    <option value="pcs">Pcs</option>
                                    <option value="rim">Rim</option>
                                    <option value="unit">Unit</option>
                                </select>
                                <i className="fa-solid fa-chevron-down absolute right-4 top-4"></i>
                            </div>
                        </div>
                        {/* Stok */}
                        <div className="flex flex-col mb-5">
                            <label htmlFor="stok" className="font-semibold mb-2">Stock</label>
                            <input type="number" value={stok} onChange={(e) => setStok(e.target.value)} name="stok" id="stok" placeholder="Enter item code" className="bg-[#f9fafb] p-3 w-full border border-solid border-[#e2e4e9] rounded-xl focus:border-2 focus:border-[#0f8a71] focus:outline-none" required disabled />
                        </div>
                        {/* Stok Minimum */}
                        <div className="flex flex-col mb-5">
                            <label htmlFor="stok_minimum" className="font-semibold mb-2">Stock Minimum</label>
                            <input type="number" value={stokMinimum} onChange={(e) => setStokMinimum(e.target.value)} name="stok" id="stok" placeholder="Enter item code" className="bg-[#f9fafb] p-3 w-full border border-solid border-[#e2e4e9] rounded-xl focus:border-2 focus:border-[#0f8a71] focus:outline-none" required />
                        </div>
                        <div className="flex items-center justify-end w-full">
                            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white px-3 py-2 border border-green-500 rounded transition-all duration-300 mr-2">Add Item</button>
                            <button onClick={closeAddModal} className="bg-neutral-500 hover:bg-neutral-700 text-white px-3 py-2 border border-neutral-500 rounded transition-all duration-300">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}