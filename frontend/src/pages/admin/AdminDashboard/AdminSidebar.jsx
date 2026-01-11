import React, { useState } from "react";
import AdminSidebar from "../../../components/adminsidebar/AdminSidebarComponent";
import "./AdminSidebar.css";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="admin-container">

            {/* Sidebar */}
            <AdminSidebar
                isOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Main Content */}
            <main className={`admin-content ${sidebarOpen ? "sidebar-open" : ""}`}>
                {children}
            </main>
        </div>
    );
}
