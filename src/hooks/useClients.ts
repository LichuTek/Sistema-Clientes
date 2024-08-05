// hooks/useClients.ts
import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

interface Client {
    _id: string;
    fullname: string;
    email: string;
    phone: string;
}

const useClients = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [filteredData, setFilteredData] = useState<Client[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [axiosError, setAxiosError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get<Client[]>('/api/auth/clients');
                setClients(response.data);
                setFilteredData(response.data);
            } catch (error) {
                console.log(error);
                if (axios.isAxiosError(error)) {
                    setAxiosError(error.response?.data.message || 'Error desconocido');
                }
            }
        };
        fetchClients();
    }, []);

    const handleSearchChange = (value: string) => {
        setSearchText(value);
        const filtered = clients.filter(client =>
            client.fullname.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return {
        clients,
        filteredData,
        searchText,
        axiosError,
        handleSearchChange,
    };
};

export default useClients;
