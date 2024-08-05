"use client"
// components/ProfilePage.tsx
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import useClients from '@/hooks/useClients';
import ClientTable from '@/components/ClientTable';
import AddClientModal from '@/components/AddClientModal';

const ProfilePage: React.FC = () => {
    const { data: session, status } = useSession();
    console.log(session, status);

    const { clients, filteredData, searchText, handleSearchChange } = useClients();
    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="bg-neutral-300 min-h-screen">
            <ClientTable clients={filteredData} searchText={searchText} handleSearchChange={handleSearchChange} />
            <AddClientModal showModal={showModal} handleCloseModal={handleCloseModal} />
        </div>
    );
};

export default ProfilePage;
