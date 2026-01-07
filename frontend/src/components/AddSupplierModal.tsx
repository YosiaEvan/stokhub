import { useState } from "react";
import api from "../api/axios";

interface AddSupplierModalProps {
    isOpenModalAdd: boolean;
    setIsOpenModalAdd: React.Dispatch<React.SetStateAction<boolean>>;
    refreshKey: number;
    setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
}

export default function AddSupplierModal({ setIsOpenModalAdd, setRefreshKey }: AddSupplierModalProps) {
    const [nama, setNama] = useState("");
    const [kontak, setKontak] = useState("");
    const [alamat, setAlamat] = useState("");
    const [email, setEmail] = useState("");

    const closeAddModal = () => {
        setIsOpenModalAdd(false);
    }

    const handleAddSupplierSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await api.post("/supplier", {
                nama,
                kontak,
                alamat,
                email,
            });

            console.log(response);
            setNama("");
            setKontak("");
            setAlamat("");
            setEmail("");
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
                    <h3 className="text-xl font-semibold">Add Supplier</h3>
                    <i onClick={closeAddModal} className="fa-regular fa-circle-xmark"></i>
                </div>
                {/* Form */}
                <div className="p-5 flex-1 overflow-y-auto">
                    <form onSubmit={handleAddSupplierSubmit}>
                        {/* Nama */}
                        <div className="flex flex-col mb-2">
                            <label htmlFor="nama" className="font-semibold mb-2">Name</label>
                            <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} name="nama" id="nama" placeholder="Enter supplier name" className="bg-[#f9fafb] p-3 w-full border border-solid border-[#e2e4e9] rounded-xl focus:border-2 focus:border-[#0f8a71] focus:outline-none" required />
                        </div>
                        {/* Kontak */}
                        <div className="flex flex-col mb-2">
                            <label htmlFor="kontak" className="font-semibold mb-2">Contact Number</label>
                            <input type="text" value={kontak} onChange={(e) => setKontak(e.target.value)} name="kontak" id="kontak" placeholder="Enter supplier contact number" className="bg-[#f9fafb] p-3 w-full border border-solid border-[#e2e4e9] rounded-xl focus:border-2 focus:border-[#0f8a71] focus:outline-none" required />
                        </div>
                        {/* Alamat */}
                        <div className="flex flex-col mb-2">
                            <label htmlFor="alamat" className="font-semibold mb-2">Address</label>
                            <input type="text" value={alamat} onChange={(e) => setAlamat(e.target.value)} name="alamat" id="alamat" placeholder="Enter supplier address" className="bg-[#f9fafb] p-3 w-full border border-solid border-[#e2e4e9] rounded-xl focus:border-2 focus:border-[#0f8a71] focus:outline-none" required />
                        </div>
                        {/* Email */}
                        <div className="flex flex-col mb-2">
                            <label htmlFor="email" className="font-semibold mb-2">Email</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" placeholder="Enter supplier email" className="bg-[#f9fafb] p-3 w-full border border-solid border-[#e2e4e9] rounded-xl focus:border-2 focus:border-[#0f8a71] focus:outline-none" required />
                        </div>
                        <div className="flex items-center justify-end w-full">
                            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white px-3 py-2 border border-green-500 rounded transition-all duration-300 mr-2">Add Supplier</button>
                            <button onClick={closeAddModal} className="bg-neutral-500 hover:bg-neutral-700 text-white px-3 py-2 border border-neutral-500 rounded transition-all duration-300">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}