// components/InfoClientModal.tsx
"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';


interface InfoClientModal {
    showModalInfo: boolean;
    handleCloseModalInfo: () => void;
}

const InfoClientModal: React.FC<InfoClientModal> = ({ showModalInfo, handleCloseModalInfo }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [axiosError, setAxiosError] = useState("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    /*const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const saveResponse = await axios.post('/api/auth/clients', {
                fullname: formData.name,
                email: formData.email,
                phone: formData.phone
            });
            handleCloseModalInfo();
            console.log(saveResponse);
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                setAxiosError(error.response?.data.message);
            }
        }
    };*/

    if (!showModalInfo) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-100">
            <div className="absolute inset-0 bg-black opacity-20" onClick={handleCloseModalInfo}></div>
            <div className="bg-white p-52 flex flex-col rounded shadow-lg z-10">
                <h1 className='text-2xl font-bold text-black flex flex-row'>Nombre:&nbsp;<p className='text-gray-500'>Lisandro</p></h1>
                <h1 className='text-2xl font-bold text-black mt-4 flex flex-row'>Telefono:&nbsp;<p className='text-gray-500'>221944484</p></h1>
                <h1 className='text-2xl font-bold text-black mt-4 flex flex-row'>Email:&nbsp;<p className='text-gray-500'>lujanlisandro.11@gmail.com</p></h1>
                <h1 className='text-2xl font-bold text-black mt-4 flex flex-row'>Ultimo turno:&nbsp;<p className='text-gray-500'>21-09-24</p></h1>
            </div>
        </div>
    );
};

export default InfoClientModal;
