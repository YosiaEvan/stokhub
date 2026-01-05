import { useState } from "react";
import ItemsTable from "../components/ItemsTable";
import AddItemModal from "../components/AddItemModal";
import UpdateItemModal from "../components/UpdateItemModal";

interface Item {
    id: number;
    kode_barang: string;
    nama_barang: string;
    kategori: string;
    satuan: string;
    stok: number;
    stok_minimum: number;
}

export default function ItemManagement() {
    const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    return (
        <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="p-6 pb-0">
                <h2 className="text-2xl font-semibold mb-2">Item Management</h2>
            </div>

            {/* User Table */}
            <div className="px-6 pb-6">
                <ItemsTable refreshKey={refreshKey} setRefreshKey={setRefreshKey} isOpenModalAdd={isOpenModalAdd} setIsOpenModalAdd={setIsOpenModalAdd} isOpenModalUpdate={isOpenModalUpdate} setIsOpenModalUpdate={setIsOpenModalUpdate} setSelectedItem={setSelectedItem} />
            </div>

            {/* Add Modal */}
            {isOpenModalAdd && (
                <AddItemModal refreshKey={refreshKey} setRefreshKey={setRefreshKey} isOpenModalAdd={isOpenModalAdd} setIsOpenModalAdd={setIsOpenModalAdd} />
            )}

            {/* Update Modal */}
            {isOpenModalUpdate && (
                <UpdateItemModal isOpen={isOpenModalUpdate} setIsOpen={setIsOpenModalUpdate} item={selectedItem} setRefreshKey={setRefreshKey} />
            )}
        </div>
    );
}