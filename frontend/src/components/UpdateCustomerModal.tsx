import { useEffect, useState } from "react";
import api from "../api/axios";

interface Customer {
    id: number;
    nama: string;
    kontak: string;
    alamat: string;
    email: string;
}

interface UpdateCustomerModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    customer: Customer;
    setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
}

export default function UpdateCustomerModal({ setIsOpen, customer, setRefreshKey }: UpdateCustomerModalProps) {
    const [nama, setNama] = useState("");
    const [kontak, setKontak] = useState("");
    const [alamat, setAlamat] = useState("");
    const [email, setEmail] = useState("");

    const closeUpdateModal = () => {
        setIsOpen(false);
    }

    const handleUpdateCustomerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const payload: any = {
                nama,
                kontak,
                alamat,
                email,
            }

            const response = await api.put(`/customer/${customer.id}`, payload);

            console.log(response);
            setNama("");
            setKontak("");
            setAlamat("");
            setEmail("");
            setIsOpen(false);
            setRefreshKey(1);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (customer) {
            setNama(customer.nama);
            setKontak(customer.kontak);
            setAlamat(customer.alamat);
            setEmail(customer.email);
        }
    }, [customer]);

    return (
        <div className="absolute inset-0 z-50 bg-black/40 w-full flex items-center justify-center p-6">
            <div className="bg-white rounded-xl w-full max-h-full max-w-2xl flex flex-col overflow-hidden">
                <div className="flex items-center justify-between border-b-2 border-[#f4f4f5] p-5 shrink-0">
                    <h3 className="text-xl font-semibold">Update Customer</h3>
                    <i onClick={closeUpdateModal} className="fa-regular fa-circle-xmark"></i>
                </div>
                {/* Form */}
                <div className="p-5 flex-1 overflow-y-auto">
                    <form onSubmit={handleUpdateCustomerSubmit}>
                        {/* Nama */}
                        <div className="flex flex-col mb-2">
                            <label htmlFor="nama" className="font-semibold mb-2">Name</label>
                            <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} name="nama" id="nama" placeholder="Enter customer name" className="bg-[#f9fafb] p-3 w-full border border-solid border-[#e2e4e9] rounded-xl focus:border-2 focus:border-[#0f8a71] focus:outline-none" required />
                        </div>
                        {/* Kontak */}
                        <div className="flex flex-col mb-2">
                            <label htmlFor="kontak" className="font-semibold mb-2">Contact Number</label>
                            <input type="text" value={kontak} onChange={(e) => setKontak(e.target.value)} name="kontak" id="kontak" placeholder="Enter customer contact number" className="bg-[#f9fafb] p-3 w-full border border-solid border-[#e2e4e9] rounded-xl focus:border-2 focus:border-[#0f8a71] focus:outline-none" required />
                        </div>
                        {/* Alamat */}
                        <div className="flex flex-col mb-2">
                            <label htmlFor="alamat" className="font-semibold mb-2">Address</label>
                            <input type="text" value={alamat} onChange={(e) => setAlamat(e.target.value)} name="alamat" id="alamat" placeholder="Enter customer address" className="bg-[#f9fafb] p-3 w-full border border-solid border-[#e2e4e9] rounded-xl focus:border-2 focus:border-[#0f8a71] focus:outline-none" required />
                        </div>
                        {/* Email */}
                        <div className="flex flex-col mb-2">
                            <label htmlFor="email" className="font-semibold mb-2">Email</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" placeholder="Enter customer email" className="bg-[#f9fafb] p-3 w-full border border-solid border-[#e2e4e9] rounded-xl focus:border-2 focus:border-[#0f8a71] focus:outline-none" required />
                        </div>
                        <div className="flex items-center justify-end w-full">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 border border-blue-500 rounded transition-all duration-300 mr-2">Save Changes</button>
                            <button onClick={closeUpdateModal} className="bg-neutral-500 hover:bg-neutral-700 text-white px-3 py-2 border border-neutral-500 rounded transition-all duration-300">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}