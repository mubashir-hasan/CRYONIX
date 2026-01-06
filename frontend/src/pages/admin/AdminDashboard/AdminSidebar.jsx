import React from 'react';
import AdminSidebar from '../../../components/adminsidebar/AdminSidebarComponent';
import './AdminSidebar.css';

function AdminLayout({ children }) {
    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-main-content">
                {children}
            </main>
        </div>
    );
}

export default AdminLayout;