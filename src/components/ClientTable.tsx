// components/ClientTable.tsx
"use client"
import React from 'react';
import { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { AiFillInfoCircle } from 'react-icons/ai';


interface Client {
    _id: string;
    fullname: string;
    email: string;
    phone: string;
}

interface ClientTableProps {
    clients: Client[];
    searchText: string;
    handleSearchChange: (value: string) => void;
}


const ClientTable: React.FC<ClientTableProps> = ({ clients, searchText, handleSearchChange }) => {
    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-md max-h-[1200px] mx-auto max-w-[1200px]">
            <div className="pb-4 bg-white dark:bg-gray-900 mt-5">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative py-2 ml-1">

                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Buscar Cliente"
                        value={searchText}
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                </div>
                <button
                    className="bg-blue-600 font-bold text-white py-1 px-3 mt-2 ml-2 "
                    onClick={handleButtonClick}
                >
                    Agregar Cliente
                </button>

            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input
                                    id="checkbox-all-search"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">NOMBRE</th>
                        <th scope="col" className="px-6 py-3">EMAIL</th>
                        <th scope="col" className="px-6 py-3">TELEFONO</th>
                        <th scope="col" className="px-6 py-3">ACCION</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((item, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id={`checkbox-table-search-${index}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.fullname}
                            </th>
                            <td className="px-6 py-4">{item.email}</td>
                            <td className="px-6 py-4">{item.phone}</td>
                            <td className="px-6 py-4">
                                <button className='bg-blue-500 hover:bg-blue-700 text-white py-3 px-3 text-xl rounded-md'><AiFillEdit /></button>
                                <button className='bg-green-500 hover:bg-green-700 text-white py-3 px-3 text-xl rounded-md ml-2'><AiFillInfoCircle /></button>
                                <button className='bg-red-500 hover:bg-red-700 text-white py-3 px-3 text-xl rounded-md ml-2'><AiFillDelete /></button>





                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientTable;
