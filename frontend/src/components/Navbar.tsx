import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Navbar({ isSidebarOpen, onToggleSidebar }) {
    const [userName, setUserName] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        try {
            const user = localStorage.getItem("user");
            if (user) {
                const parsedUser = JSON.parse(user);
                setUserName(parsedUser?.name || "");
            }
        } catch (error) {
            console.error("Invalid user data in localStorage");
        }
    }, []);

    const handleLogout = async (e) => {
        try {
            await api.post("/logout");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setIsDropdownOpen(false);
            navigate("/");
        }
    }

    return (
        <nav className="p-5 flex items-center justify-between">
            <div onClick={() => onToggleSidebar(!isSidebarOpen)} className="p-2 border border-solid border-[#e2e4e9] rounded-md cursor-pointer w-10 h-10 flex items-center justify-center">
                <i className="fa-light fa-table-rows"></i>
            </div>
            <div className="relative">
                <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="bg-[#d5efe9] p-2 rounded-full w-10 h-10 flex items-center justify-center text-[#118b72] cursor-pointer">{userName ? userName.charAt(0).toUpperCase() : "?"}</div>
                <div className={`${isDropdownOpen ? 'block' : 'hidden'} absolute w-50 right-0 bg-white rounded-xl shadow-lg mt-2 border border-solid border-[#e8ebee] z-10`}>
                    <p className="p-3 border-b border-[#e8ebee] font-semibold">My Account</p>
                    <p className="p-3 border-b border-[#e8ebee]">Profile</p>
                    <p className="p-3 text-red-500 w-full cursor-pointer" onClick={handleLogout}>Logout</p>
                </div>
            </div>
        </nav>
    );
}