import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useState } from "react";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/login", {
                email,
                password,
            });

            setErrorMessage("");
            console.log("Login success:", response.data);
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            // contoh: redirect
            navigate("/dashboard-admin");
        } catch (error) {
            if (error.response?.status === 401) {
                setErrorMessage("Incorrect email or password");
            } else {
                setErrorMessage("Terjadi kesalahan server");
            }
        }
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-md w-full md:max-w-xl">
            <div className="flex items-center gap-3 mb-10">
                <div className="p-2 bg-[#0f8a71] w-10 h-10 flex justify-center items-center rounded-xl text-white">
                    <i className="fa-solid fa-boxes-stacked"></i>
                </div>
                <h1 className="text-2xl font-bold">Stok<span className="text-[#0f8a71]">Hub</span></h1>
            </div>
            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">Welcome back</h2>
                <p className="text-[#737b8c]">Enter your credentials to access your account</p>
            </div>
            {errorMessage && <p className="mb-4 w-full text-center bg-red-500 text-white p-3 rounded-xl">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="email" className="text-sm font-semibold">Email</label>
                    <div className="w-full relative">
                        <i className="fa-regular fa-envelope absolute left-4 top-4 text-[#737b8c] text-lg"></i>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" id="email" className="bg-[#f9fafb] p-3 pl-13 w-full border border-solid border-[#e2e4e9] rounded-xl focus:border-2 focus:border-[#0f8a71] focus:outline-none" />
                    </div>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="password" className="text-sm font-semibold">Password</label>
                    <div className="w-full relative">
                        <i className="fa-solid fa-lock absolute left-4 top-4 text-[#737b8c] text-lg"></i>
                        <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" id="password" className="bg-[#f9fafb] p-3 pl-13 w-full border border-solid border-[#e2e4e9] rounded-xl focus:border-2 focus:border-[#0f8a71] focus:outline-none" />
                        {!showPassword ? (
                            <i className={`fa-regular fa-eye absolute right-4 top-4.5 text-[#737b8c] cursor-pointer ${showPassword ? 'hidden' : ''}`} onClick={() => setShowPassword(!showPassword)}></i>
                        ) : (
                            <i className={`fa-regular fa-eye-slash absolute right-4 top-4.5 text-[#737b8c] cursor-pointer ${showPassword ? '' : 'hidden'}`} onClick={() => setShowPassword(!showPassword)}></i>
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-end mb-4">
                    <p className="text-sm text-[#0f8a71] font-semibold">Forgot password?</p>
                </div>
                <button type="submit" className="bg-[#0f8a71] w-full text-white py-3 rounded-xl">Sign In</button>
            </form>
        </div>
    )
}