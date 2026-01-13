import React, { useState } from "react";
import AdminSidebar from "../../../components/adminsidebar/AdminSidebarComponent";
import "./AdminSidebar.css";

export default function AdminLayout({ children }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="admin-layout">

            <AdminSidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />

            <main className={`admin-main-content ${isCollapsed ? "collapsed-content" : ""}`}>
                {children}
            </main>

        </div>
    );
}
