import { useEffect, useState } from "react"
import api from "../api/axios";
import StockMovementChart from "../components/StockMovementChart";
import TransactionsInOut from "../components/TransactionsInOut";
import LatestActivitiesTable from "../components/LatestActivitiesTable";
import ItemCategoriesChart from "../components/ItemCategoriesChart";

export default function DashboardAdmin() {
    const [totalBarang, setTotalBarang] = useState(0);
    const [isGrowing, setIsGrowing] = useState(true);
    const [persenGrowth, setPersenGrowth] = useState(0);
    const [stokMeninipis, setStokMenipis] = useState(0);
    const [totalSupplier, setTotalSupplier] = useState(0);
    const [totalCustomer, setTotalCustomer] = useState(0);
    const [transactionToday, setTransactionToday] = useState(0);
    const [isTransactionGrowing, setIsTransactionGrowing] = useState(true);
    const [persenTransactionGrowth, setPersenTransactionGrowth] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTotalBarang = async () => {
            try {
                const response = await api.get('/total-items');
                setTotalBarang(response.data.bulan_ini);
                if (response.data.status == 'naik') {
                    setIsGrowing(true);
                } else {
                    setIsGrowing(false);
                }
                setPersenGrowth(response.data.persentase);
                setStokMenipis(response.data.stok_menipis);
            } catch (err) {
                setError("Failed to fetch total barang");
            } finally {
                setLoading(false);
            }
        }

        const fetchTotalSupplier = async () => {
            try {
                const response = await api.get('/total-suppliers');
                setTotalSupplier(response.data.total_supplier);
            } catch (err) {
                setError("Failed to fetch total supplier");
            } finally {
                setLoading(false);
            }
        }

        const fetchTotalCustomer = async () => {
            try {
                const response = await api.get('/total-customers');
                setTotalCustomer(response.data.total_customer);
            } catch (err) {
                setError("Failed to fetch total customer");
            } finally {
                setLoading(false);
            }
        }

        const fetchTransactionToday = async () => {
            try {
                const response = await api.get('/transaksi-hari-ini');
                setTransactionToday(response.data.transaksi_hari_ini);
                if (response.data.status == 'naik') {
                    setIsTransactionGrowing(true);
                } else {
                    setIsTransactionGrowing(false);
                }
                setPersenTransactionGrowth(response.data.persentase);
            } catch (err) {
                setError("Failed to fetch transaction today");
            } finally {
                setLoading(false);
            }
        }

        fetchTotalBarang();
        fetchTotalSupplier();
        fetchTotalCustomer();
        fetchTransactionToday();
    });

    return (
        <div className="flex flex-col gap-5 p-6">
            <div>
                <h2 className="text-2xl font-semibold mb-2">Dashboard Admin</h2>
                <p className="text-[#878e9d]">Welcome back! Here is a summary of your inventory.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="p-5 bg-white rounded-xl flex justify-between shadow-md hover:shadow-lg">
                    <div>
                        <h3 className="text-sm text-[#737B8C] mb-2">Total Items</h3>
                        <p className="text-2xl font-semibold mb-2">{totalBarang}</p>
                        <p className={`${isGrowing ? 'text-green-500' : 'text-red-500'} text-xs`}>{isGrowing ? '+' : ''} {persenGrowth}% from last month</p>
                    </div>
                    <div className="p-2 bg-[#e7f3f0] w-10 h-10 flex justify-center items-center rounded-xl text-green-700">
                        <i className="fa-solid fa-boxes-stacked"></i>
                    </div>
                </div>
                <div className="p-5 bg-white rounded-xl flex justify-between shadow-md hover:shadow-lg">
                    <div>
                        <h3 className="text-sm text-[#737B8C] mb-2">Stock is Running Low</h3>
                        <p className="text-2xl font-semibold mb-2">{stokMeninipis}</p>
                        <p className="text-xs">Items need to be restocked</p>
                    </div>
                    <div className="p-2 bg-[#fdf5e6] w-10 h-10 flex justify-center items-center rounded-xl text-[#f7b239]">
                        <i className="fa-solid fa-triangle-exclamation"></i>
                    </div>
                </div>
                <div className="p-5 bg-white rounded-xl flex justify-between shadow-md hover:shadow-lg">
                    <div>
                        <h3 className="text-sm text-[#737B8C] mb-2">Total Supplier</h3>
                        <p className="text-2xl font-semibold mb-2">{totalSupplier}</p>
                    </div>
                    <div className="p-2 bg-[#e6f5fc] w-10 h-10 flex justify-center items-center rounded-xl text-[#29adea]">
                        <i className="fa-regular fa-truck"></i>
                    </div>
                </div>
                <div className="p-5 bg-white rounded-xl flex justify-between shadow-md hover:shadow-lg">
                    <div>
                        <h3 className="text-sm text-[#737B8C] mb-2">Total Customer</h3>
                        <p className="text-2xl font-semibold mb-2">{totalCustomer}</p>
                    </div>
                    <div className="p-2 bg-[#e8f6ed] w-10 h-10 flex justify-center items-center rounded-xl text-[#1fad53]">
                        <i className="fa-solid fa-user-check"></i>
                    </div>
                </div>
                <div className="p-5 bg-white rounded-xl flex justify-between shadow-md hover:shadow-lg">
                    <div>
                        <h3 className="text-sm text-[#737B8C] mb-2">Transaction Today</h3>
                        <p className="text-2xl font-semibold mb-2">{transactionToday}</p>
                        <p className={`${isTransactionGrowing ? 'text-green-500' : 'text-red-500'} text-xs`}>{isTransactionGrowing ? '+' : ''} {persenTransactionGrowth}% from yesterday</p>
                    </div>
                    <div className="p-2 bg-[#f0f2f4] w-10 h-10 flex justify-center items-center rounded-xl text-[#29303d]">
                        <i className="fa-solid fa-up-down"></i>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 max-w-full">
                <div className="p-5 bg-white rounded-xl shadow-md max-w-full lg:basis-1/2">
                    <h3 className="font-semibold">Stock Movement</h3>
                    <p className="text-sm mb-4">Total stock per month</p>
                    <div className="w-full">
                        <StockMovementChart />
                    </div>
                </div>
                <div className="p-5 bg-white rounded-xl shadow-md max-w-full lg:basis-1/2">
                    <h3 className="font-semibold">Incoming vs Outgoing Transactions</h3>
                    <p className="text-sm mb-4">Comparison of the last 12 months</p>
                    <div className="w-full">
                        <TransactionsInOut />
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 w-full items-start">
                <div className="p-5 bg-white rounded-xl shadow-md basis-1 lg:basis-2/3">
                    <h3 className="font-semibold">Latest Activities</h3>
                    <p className="text-sm mb-4">Last transaction in the system</p>
                    <div className="flex items-center justify-center overflow-auto w-75 md:w-full rounded-xl">
                        <div className="w-full">
                            <LatestActivitiesTable />
                        </div>
                    </div>
                </div>
                <div className="p-5 bg-white rounded-xl shadow-md basis-1 lg:basis-1/3">
                    <h3 className="font-semibold">Item Categories</h3>
                    <p className="text-sm mb-4">Distribution by category</p>
                    <div className="w-full">
                        <ItemCategoriesChart />
                    </div>
                </div>
            </div>
        </div>
    )
}