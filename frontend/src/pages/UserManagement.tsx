import { useState } from "react";
import UsersTable from "../components/UsersTable";
import AddUserModal from "../components/AddUserModal";
import UpdateUserModal from "../components/UpdateUserModal";

interface User {
    id: number;
    username: string;
    name: string;
    email: string;
    role: "admin" | "pegawai";
}

export default function UserManagement() {
    const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    return (
        <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="p-6 pb-0">
                <h2 className="text-2xl font-semibold mb-2">User Management</h2>
            </div>

            {/* User Table */}
            <div className="px-6 pb-6">
                <UsersTable refreshKey={refreshKey} setRefreshKey={setRefreshKey} isOpenModalAdd={isOpenModalAdd} setIsOpenModalAdd={setIsOpenModalAdd} isOpenModalUpdate={isOpenModalUpdate} setIsOpenModalUpdate={setIsOpenModalUpdate} setSelectedUser={setSelectedUser} />
            </div>

            {/* Add Modal */}
            {isOpenModalAdd && (
                <AddUserModal refreshKey={refreshKey} setRefreshKey={setRefreshKey} isOpenModalAdd={isOpenModalAdd} setIsOpenModalAdd={setIsOpenModalAdd} />
            )}

            {/* Update Modal */}
            {isOpenModalUpdate && (
                <UpdateUserModal isOpen={isOpenModalUpdate} setIsOpen={setIsOpenModalUpdate} user={selectedUser} setRefreshKey={setRefreshKey} />
            )}
        </div>
    );
}