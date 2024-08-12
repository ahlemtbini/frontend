import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import "./RemiseDeCleTable.css";



Modal.setAppElement('#root');

function RemiseDeCleTable() {
    const [remises, setRemises] = useState([]);
    const [immeuble, setImmeuble] = useState([]);
    const [selectedRemise, setSelectedRemise] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/read_remises.php')
            .then(response => {
                const data = response.data;
                if (data.message) {
                    console.error('API Error:', data.message);
                    return;
                }
                if (data.records) {
                    setRemises(data.records);
                }
            })
            .catch(error => console.error('Fetch Error:', error));
    }, []);

    const handleRowClick = (id) => {
        axios.get(`http://localhost:8000/api/read_remise.php?id=${id}`)
            .then(response => {
                setSelectedRemise(response.data);
                setModalIsOpen(true);
                getImeuble(response.data.lot_id)
            })
            .catch(error => console.error('Fetch Error:', error));
    };

    const getImeuble = (id) => {
        return axios.get(`http://localhost:8000/api/read_one_immeuble.php?id=${id}`)
            .then(response =>
                setImmeuble(response.data)
            )
            .catch(error => {
                console.error('Fetch Error:', error);
                return null; // Return null in case of error
            });
    };
    

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setConfirmDelete(true);
    };

    const confirmDeleteAction = () => {
        console.log("delete ",deleteId)
        axios.delete(`http://localhost:8000/api/delete_remise.php?id=${deleteId}`)
            .then(response => {
                const data = response.data;
                if (data.message === "Remise de clé deleted successfully.") {
                    setRemises(remises.filter(remise => remise.id !== deleteId));
                } else {
                    console.error('Delete Error:', data.message);
                }
                setConfirmDelete(false);
            })
            .catch(error => {
                console.error('Delete Error:', error);
                setConfirmDelete(false);
            });
    };

    const cancelDelete = () => {
        setConfirmDelete(false);
    };

    const renderMedia = (url) => {
        const isImage = url.match(/\.(jpeg|jpg|gif|png)$/);
        const isVideo = url.match(/\.(mp4|webm)$/);

        if (isImage) {
            return <img src={url} alt="Remise Media" className="w-full h-auto rounded-md" />;
        }

        if (isVideo) {
            return <video controls src={url} className="w-full h-auto rounded-md" />;
        }

        return <p className="text-gray-500">No media available</p>;
    };

    return (
        <div className="p-4">
            <div className="text-center my-8">
                <h2 className="text-3xl font-bold text-black">GESTION DE REMISE DES CLES 🔑</h2>
                <center className='mt-2'>
                    <svg width="400" height="10" viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 10L15 0L25 10L35 0L45 10L55 0L65 10L75 0L85 10L95 0L105 10L115 0L125 10" stroke="#E31B23" strokeWidth="4" />
                    </svg>
                </center>
            </div>
            <div className="text-center ml-60 pl-48 flex items-center justify-start whitespace-nowrap">
                <button
                    onClick={() => navigate('/create')}
                    className="text-[#E31B23] hover:text-red-900 font-semibold bg-co_grey_light p-1 border rounded-xl text-sm"
                >
                    Créer un nouveau
                </button>
            </div>
            <div className="overflow-x-auto flex items-center justify-center mt-5">
                <table className="min-w-1/2 bg-white border border-co_grey rounded-lg">
                    <thead className="bg-co_grey_light">
                        <tr>
                            <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donneur</th>
                            <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receveur</th>
                            <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Remise</th>
                            <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-border-co_grey">
                        {remises.map(remise => (
                            <tr key={remise.id} className="hover:bg-gray-100 cursor-pointer">
                                <td className="px-8 py-4 whitespace-nowrap">{remise.id}</td>
                                <td className="px-8 py-4 whitespace-nowrap">{remise.donneur}</td>
                                <td className="px-8 py-4 whitespace-nowrap">{remise.receveur}</td>
                                <td className="px-8 py-4 whitespace-nowrap">{remise.date_remise}</td>
                                <td className="px-8 py-4 whitespace-nowrap">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleRowClick(remise.id); }}
                                        className="text-[#E31B23] hover:text-red-900 font-semibold bg-co_grey_light p-1 border rounded-xl text-sm mt-0"
                                    >
                                        View Details
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleEdit(remise.id); }}
                                        className="mx-2 text-[#E31B23] hover:text-red-900 font-semibold text-2xl mt-4"
                                    >
                                        <AiFillEdit />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDelete(remise.id); }}
                                        className="mx-2 text-[#E31B23] hover:text-red-900 font-semibold text-2xl mt-4"
                                    >
                                        <MdDeleteForever />

                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Remise Details"
                className="modal bg-white p-6 rounded-lg shadow-lg"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <button onClick={closeModal} className="close-button text-red-500 hover:text-red-700 text-xl font-bold">X</button>
                {selectedRemise && (
                    <div className="mt-6">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">
                                Details for Remise ID: {selectedRemise.id}
                            </h3>
                            <p className="mb-2">
                                <strong>Immeuble :</strong> 
                                <div className='ml-20'>
                                {immeuble ? `address : ${immeuble.address}` : ''}<br/>
                                {immeuble ? `Ville : ${immeuble.city}` : ''}<br/>
                                {immeuble ? `Pays : ${immeuble.country}` : ''}<br/>
                                {immeuble ? `postal_code : ${immeuble.postal_code}` : ''}<br/>
                                </div>

                            </p>
                        </div>
                        <p className="mb-2"><strong>Donneur:</strong> {selectedRemise.donneur}</p>
                        <p className="mb-2"><strong>Receveur:</strong> {selectedRemise.receveur}</p>
                        <div className="mb-2">
                            <strong>Photo/Video:</strong>
                            {selectedRemise.photo_video && renderMedia("http://localhost:8000/uploads/"+selectedRemise.photo_video)}
                        </div>
                        <p className="mb-2"><strong>Date Remise:</strong> {selectedRemise.date_remise}</p>
                        <p className="mb-2"><strong>Commentaire:</strong> {selectedRemise.commentaire}</p>
                        <p className="mb-2"><strong>Signature:</strong> {selectedRemise.signature}</p>
                    </div>
                )}
            </Modal>

            {/* Confirmation Modal for Deletion */}
            {confirmDelete && (
                <Modal
                    isOpen={confirmDelete}
                    onRequestClose={cancelDelete}
                    contentLabel="Confirm Delete"
                    className="modal bg-white p-6 rounded-lg shadow-lg"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                >
                    <h2 className="text-lg font-bold mb-4">Êtes-vous sûr de vouloir supprimer cet élément ?</h2>
                    <button
                        onClick={confirmDeleteAction}
                        className="text-white bg-red-600 hover:bg-red-800 p-2 rounded mr-4"
                    >
                        Oui, Supprimer
                    </button>
                    <button
                        onClick={cancelDelete}
                        className="text-white bg-gray-600 hover:bg-gray-800 p-2 rounded"
                    >
                        Annuler
                    </button>
                </Modal>
            )}
        </div>
    );
}

export default RemiseDeCleTable;
