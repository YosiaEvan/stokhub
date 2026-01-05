import { useState } from "react";
import api from "../api/axios";

interface AddUserModalProps {
    isOpenModalAdd: boolean;
    setIsOpenModalAdd: React.Dispatch<React.SetStateAction<boolean>>;
    refreshKey: number;
    setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
}

export default function AddUserModal({ setIsOpenModalAdd, setRefreshKey }: AddUserModalProps) {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<"admin" | "pegawai">("pegawai");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const closeAddModal = () => {
        setIsOpenModalAdd(false);
    }

    const handleAddUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await api.post("/user", {
                username,
                name,
                email,
                password,
                role,
            });

            console.log(response);
            setUsername("");
            setName("");
            setEmail("");
            setPassword("");
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
                    <h3 className="text-xl font-semibold">Add User</h3>
                    <i onClick={closeAddModal} className="fa-regular fa-circle-xmark"></i>
                </div>
                {/* Form */}
                <div className="p-5 flex-1 overflow-y-auto">
                    <form onSubmit={handleAddUserSubmit}>
                        {/* Name */}
                        <div className="flex flex-col mb-2">
                            <label htmlFor="name" className="font-semibold mb-2">Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="Enter full name" className="bg-[#f9fafb] p-3 w-full border border-solid border-[#e2e4e9] rounded-xl focus:border-2 focus:border-[#0f8a71] focus:outline-none" required />
                        </div>
                        {/* Username */}
                        <div className="flex flex-col mb-2">
                            <label htmlFor="username" className="font-semibold mb-2">Username</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="name" id="name" placeholder="Enter username" className="bg-[#f9fafb] p-3 w-full border border-solid border-[#e2e4e9] rounded-xl focus:border-2 focus:border-[#0f8a71] focus:outline-none" required />
                        </div>
                        {/* Email */}
                        <div className="flex flex-col mb-2">
                            <label htmlFor="email" className="font-semibold mb-2">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="name" id="name" placeholder="Enter email address" className="bg-[#f9fafb] p-3 w-full border border-solid border-[#e2e4e9] rounded-xl focus:border-2 focus:border-[#0f8a71] focus:outline-none" required />
                        </div>
                        {/* Role */}
                        <div className="flex flex-col mb-2">
                            <label htmlFor="role" className="font-semibold mb-2">Role</label>
                            <div className="w-full relative">
                                <select name="role" id="role" value={role} onChange={(e) => setRole(e.target.value as "admin" | "pegawai")} className="bg-[#f9fafb] p-3 w-full border border-solid border-[#e2e4e9] rounded-xl focus:border-2 focus:border-[#0f8a71] focus:outline-none" required>
                                    <option value="" disabled>Select user role</option>
                                    <option value="admin">Admin</option>
                                    <option value="pegawai">Pegawai</option>
                                </select>
                                <i className="fa-solid fa-chevron-down absolute right-4 top-4"></i>
                            </div>
                        </div>
                        {/* Password */}
                        <div className="flex flex-col mb-5">
                            <label htmlFor="password" className="font-semibold mb-2">Password</label>
                            <div className="w-full relative">
                                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" id="password" className="bg-[#f9fafb] p-3 w-full border border-solid border-[#e2e4e9] rounded-xl focus:border-2 focus:border-[#0f8a71] focus:outline-none" required />
                                {!showPassword ? (
                                    <i className={`fa-regular fa-eye absolute right-4 top-4.5 text-[#737b8c] cursor-pointer ${showPassword ? 'hidden' : ''}`} onClick={() => setShowPassword(!showPassword)}></i>
                                ) : (
                                    <i className={`fa-regular fa-eye-slash absolute right-4 top-4.5 text-[#737b8c] cursor-pointer ${showPassword ? '' : 'hidden'}`} onClick={() => setShowPassword(!showPassword)}></i>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-end w-full">
                            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white px-3 py-2 border border-green-500 rounded transition-all duration-300 mr-2">Add User</button>
                            <button onClick={closeAddModal} className="bg-neutral-500 hover:bg-neutral-700 text-white px-3 py-2 border border-neutral-500 rounded transition-all duration-300">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}