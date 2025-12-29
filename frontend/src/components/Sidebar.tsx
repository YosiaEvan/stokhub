export default function Sidebar({ isSidebarOpen }) {
    return (
        <div className="p-5">
            <div className="flex items-center gap-3 mb-10 w-full">
                <div className="p-2 bg-[#0f8a71] w-10 h-10 flex justify-center items-center rounded-xl text-white">
                    <i className="fa-solid fa-boxes-stacked"></i>
                </div>
                <h1 className={`text-2xl font-bold ${isSidebarOpen ? 'hidden md:block' : 'block md:hidden'}`}>Stok<span className="text-[#0f8a71]">Hub</span></h1>
            </div>
        </div>
    );
}