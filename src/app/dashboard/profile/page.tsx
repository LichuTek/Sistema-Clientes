"use client"
import React, { useState, ChangeEvent } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import axios from 'axios';
import { AxiosError } from 'axios';
import { FormEvent } from 'react';

const ProfilePage = () => {
    const { data: session, status } = useSession(); // DATA DE LA SESION
    console.log(session, status);

    //======== DATA
    const originalData = [
        {
            name: "Apple MacBook Pro 17\"",
            color: "Silver",
            category: "Laptop",
            price: 2999
        },
        {
            name: "Microsoft Surface Pro",
            color: "White",
            category: "Laptop PC",
            price: 1999
        },
    ];
    //====================
    
    //=====LOGICA PARA LA BUSQUEDA DE LA LISTA==//
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(originalData);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchText(value);
        const filtered = originalData.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase()) || // Filtra según el nombre del producto
            item.color.toLowerCase().includes(value.toLowerCase()) || // Filtra según el color
            item.category.toLowerCase().includes(value.toLowerCase()) || // Filtra según la categoría
            item.price.toString().includes(value) // Filtra según el precio
        );
        setFilteredData(filtered);
    };

    //====LÓGICA PARA AGREGAR NUEVO CLIENTE FRONTEND
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    //========Lógica para agregar cliente==============
    const [axiosError, setAxiosError] = useState("")
    const formSumbit = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        try {
            const saveResponse = await axios.post('/api/auth/addclient',{
                fullname: formData.get('name'),
                email: formData.get('email'),
                phone:formData.get('phone')
            })
            handleCloseModal()
            console.log(saveResponse)
        } catch (error) {
            console.log(error)
            if (error instanceof AxiosError){
                setAxiosError(error.response?.data.message)
            }
        }


    } 
    //==============

    return (
        <div className="bg-neutral-300 min-h-screen">
            <div className="relative overflow-x-auto shadow-md sm:rounded-md max-h-[450px]">
                <button 
                    className="bg-blue-600 font-bold text-white py-2 px-4 mt-2"
                    onClick={handleButtonClick}
                >
                    Agregar Cliente
                </button>
                <div className="pb-4 bg-white dark:bg-gray-900">
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative mt-1">
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
                            onChange={handleSearchChange}
                        />
                    </div>
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
                            <th scope="col" className="px-6 py-3">TURNO</th>
                            <th scope="col" className="px-6 py-3">ACCION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id={`checkbox-table-search-${index}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.name}
                                </th>
                                <td className="px-6 py-4">
                                    {item.color}
                                </td>
                                <td className="px-6 py-4">
                                    {item.category}
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50" onClick={handleCloseModal}></div>

                        <div className="bg-white p-8 rounded shadow-lg z-10">
                            <h2 className="text-xl font-bold mb-4">Agregar Cliente</h2>
                            <form onSubmit={formSumbit}>
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
            )}
        </div>
    );
}

export default ProfilePage;
