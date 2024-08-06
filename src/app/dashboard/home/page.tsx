"use client"
// components/ProfilePage.tsx
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import useClients from '@/hooks/useClients';
import ClientTable from '@/components/ClientTable';

const ProfilePage: React.FC = () => {
    const { data: session, status } = useSession();
    console.log(session, status);
    const [refresh, setRefresh] = useState(false)

    const { clients, filteredData, searchText, handleSearchChange } = useClients();

    return (
        <div className="bg-neutral-300 min-h-screen">
            <ClientTable clients={filteredData} searchText={searchText} handleSearchChange={handleSearchChange} />
        </div>
    );
};

export default ProfilePage;
