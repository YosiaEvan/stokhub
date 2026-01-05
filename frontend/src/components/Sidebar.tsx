import { Link, NavLink } from "react-router-dom";

export default function Sidebar({ isSidebarOpen }) {
    return (
        <div>
            <div className="p-5 w-full border-b border-[#f7f7f9]">
                <Link to="/admin-dashboard" className="flex items-center gap-3">
                    <div className="p-2 bg-[#0f8a71] w-10 h-10 flex justify-center items-center rounded-xl text-white">
                        <i className="fa-solid fa-boxes-stacked"></i>
                    </div>
                    <h1 className={`text-2xl font-bold ${isSidebarOpen ? 'hidden md:block' : 'block md:hidden'}`}>Stok<span className="text-[#0f8a71]">Hub</span></h1>
                    <h1 className="text-2xl font-bold md:hidden">Stok<span className="text-[#0f8a71]">Hub</span></h1>
                </Link>
            </div>
            <ul className="p-5">
                <li className="mb-2">
                    <NavLink to="/admin-dashboard" className={({ isActive }) => `flex items-center w-full rounded-xl ${isActive ? "bg-[#f4f4f5] text-[#0f8a71] border border-[#c6dfdb]" : "text-black"}`}>
                        <div className="p-2 w-10 h-10 flex justify-center items-center">
                            <i className="fa-regular fa-house"></i>
                        </div>
                        <p className={`text-sm text-black font-medium text-nowrap pr-2 ${isSidebarOpen ? 'hidden md:block' : 'block md:hidden'}`}>Dashboard</p>
                        <p className={`text-sm text-black md:hidden text-nowrap pr-2 ${!isSidebarOpen ? 'hidden' : ''}`}>Dashboard</p>
                    </NavLink>
                </li>
                <li className="mb-2">
                    <NavLink to="/user-management" className={({ isActive }) => `flex items-center w-full rounded-xl ${isActive ? "bg-[#f4f4f5] text-[#0f8a71] border border-[#c6dfdb]" : "text-black"}`}>
                        <div className="p-2 w-10 h-10 flex justify-center items-center">
                            <i className="fa-regular fa-user"></i>
                        </div>
                        <p className={`text-sm text-black font-medium text-nowrap pr-2 ${isSidebarOpen ? 'hidden md:block' : 'block md:hidden'}`}>User Management</p>
                        <p className={`text-sm text-black md:hidden text-nowrap pr-2 ${!isSidebarOpen ? 'hidden' : ''}`}>User Management</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/item-management" className={({ isActive }) => `flex items-center w-full rounded-xl ${isActive ? "bg-[#f4f4f5] text-[#0f8a71] border border-[#c6dfdb]" : "text-black"}`}>
                        <div className="p-2 w-10 h-10 flex justify-center items-center">
                            <i className="fa-solid fa-box-open"></i>
                        </div>
                        <p className={`text-sm text-black font-medium text-nowrap pr-2 ${isSidebarOpen ? 'hidden md:block' : 'block md:hidden'}`}>Item Management</p>
                        <p className={`text-sm text-black md:hidden text-nowrap pr-2 ${!isSidebarOpen ? 'hidden' : ''}`}>Item Management</p>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}