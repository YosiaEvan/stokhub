import { Outlet } from "react-router-dom";

export default function GuestLayout() {
    return (
        <div className="font-jakarta min-h-screen flex flex-col justify-center items-center bg-[#f9fafb] p-5">
            <Outlet />
        </div>
    )
}