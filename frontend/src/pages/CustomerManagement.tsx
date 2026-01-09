import { useState } from "react";
import CustomersTable from "../components/CustomersTable";
import AddCustomerModal from "../components/AddCustomerModal";
import UpdateCustomerModal from "../components/UpdateCustomerModal";

interface Customer {
    id: number;
    nama: string;
    kontak: string;
    alamat: string;
    email: string;
}

export default function CustomerManagement() {
    const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    return (
        <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="p-6 pb-0">
                <h2 className="text-2xl font-semibold mb-2">Customer Management</h2>
            </div>

            {/* User Table */}
            <div className="px-6 pb-6">
                <CustomersTable refreshKey={refreshKey} setRefreshKey={setRefreshKey} isOpenModalAdd={isOpenModalAdd} setIsOpenModalAdd={setIsOpenModalAdd} isOpenModalUpdate={isOpenModalUpdate} setIsOpenModalUpdate={setIsOpenModalUpdate} setSelectedCustomer={setSelectedCustomer} />
            </div>

            {/* Add Modal */}
            {isOpenModalAdd && (
                <AddCustomerModal refreshKey={refreshKey} setRefreshKey={setRefreshKey} isOpenModalAdd={isOpenModalAdd} setIsOpenModalAdd={setIsOpenModalAdd} />
            )}

            {/* Update Modal */}
            {isOpenModalUpdate && (
                <UpdateCustomerModal isOpen={isOpenModalUpdate} setIsOpen={setIsOpenModalUpdate} customer={selectedCustomer} setRefreshKey={setRefreshKey} />
            )}
        </div>
    );
}