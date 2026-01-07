import { useState } from "react";
import SuppliersTable from "../components/SuppliersTable";
import AddSupplierModal from "../components/AddSupplierModal";
import UpdateSupplierModal from "../components/UpdateSupplierModal";

interface Supplier {
    id: number;
    nama: string;
    kontak: string;
    alamat: string;
    email: string;
}

export default function SupplierManagement() {
    const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

    return (
        <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="p-6 pb-0">
                <h2 className="text-2xl font-semibold mb-2">Supplier Management</h2>
            </div>

            {/* User Table */}
            <div className="px-6 pb-6">
                <SuppliersTable refreshKey={refreshKey} setRefreshKey={setRefreshKey} isOpenModalAdd={isOpenModalAdd} setIsOpenModalAdd={setIsOpenModalAdd} isOpenModalUpdate={isOpenModalUpdate} setIsOpenModalUpdate={setIsOpenModalUpdate} setSelectedSupplier={setSelectedSupplier} />
            </div>

            {/* Add Modal */}
            {isOpenModalAdd && (
                <AddSupplierModal refreshKey={refreshKey} setRefreshKey={setRefreshKey} isOpenModalAdd={isOpenModalAdd} setIsOpenModalAdd={setIsOpenModalAdd} />
            )}

            {/* Update Modal */}
            {isOpenModalUpdate && (
                <UpdateSupplierModal isOpen={isOpenModalUpdate} setIsOpen={setIsOpenModalUpdate} supplier={selectedSupplier} setRefreshKey={setRefreshKey} />
            )}
        </div>
    );
}