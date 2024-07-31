// components/AddClientModal.tsx
"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';

interface AddClientModalProps {
    showModal: boolean;
    handleCloseModal: () => void;
}

const AddClientModal: React.FC<AddClientModalProps> = ({ showModal, handleCloseModal }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [axiosError, setAxiosError] = useState("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const saveResponse = await axios.post('/api/auth/addclient', {
                fullname: formData.name,
                email: formData.email,
                phone: formData.phone
            });
            handleCloseModal();
            console.log(saveResponse);
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                setAxiosError(error.response?.data.message);
            }
        }
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={handleCloseModal}></div>
            <div className="bg-white p-8 rounded shadow-lg z-10">
                <h2 className="text-xl font-bold mb-4">Agregar Cliente</h2>
                <form onSubmit={formSubmit}>
                    <div className="mb-2">
                        <label className="block text-gray-700">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded text-neutral-900"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded text-neutral-900"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700">Teléfono</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded text-neutral-900"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="bg-gray-600 font-bold text-white py-2 px-4 mr-2"
                            onClick={handleCloseModal}
                        >
                            Cancelar
                        </button>
                        <button type='submit' className="bg-green-600 font-bold text-white py-2 px-4">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClientModal;
