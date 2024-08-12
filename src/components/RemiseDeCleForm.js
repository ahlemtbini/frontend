import axios from 'axios';
import { useEffect, useState } from 'react';
import { BsBuildingFillAdd } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Popup from './PopUp';
import "./RemiseDeCleForm.css";

function RemiseDeCleForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        lot_id: '',
        immeubles_id: '',
        donneur: '',
        receveur: '',
        photo_video: '',
        date_remise: '',
        commentaire: '',
        signature: ''
    });
    const [photoVideo, setPhotoVideo] = useState(null);

    const [immeubles, setImmeubles] = useState([]);
    const [selectedImmeuble, setSelectedImmeuble] = useState(null);
    const [popup, setPopup] = useState({ message: '', state: '', show: false });
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupImmeuble, setPopupImmeuble] = useState({ message: '', state: '', show: false });
    const [newImmeuble, setNewImmeuble] = useState({
        name: '',
        address: '',
        city: '',
        postal_code: '',
        country: ''
    });
    const [showImmeublePopup, setShowImmeublePopup] = useState(false);


    useEffect(() => {
        axios.get('http://localhost:8000/api/read_immeubles.php')
            .then(response => {
                if (response.data.records) {
                    setImmeubles(response.data.records);
                }
            })
            .catch(error => {
                console.error('Error fetching immeubles:', error);
            });
    }, []);


    const handleImmeubleChange = (e) => {
        setNewImmeuble({ ...newImmeuble, [e.target.name]: e.target.value });
    };


    useEffect(() => {
        axios.get('http://localhost:8000/api/immeubles.php')
            .then(response => setImmeubles(response.data))
            .catch(error => console.error('Error fetching immeubles:', error));
    }, []);

    const handleChange = (e) => {
        if (e.target.name === 'photo_video') {
            setPhotoVideo(e.target.files[0]);
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('lot_id', formData.lot_id);
        formDataToSend.append('donneur', formData.donneur);
        formDataToSend.append('receveur', formData.receveur);
        formDataToSend.append('date_remise', formData.date_remise);
        formDataToSend.append('commentaire', formData.commentaire);
        formDataToSend.append('signature', formData.signature);
        if (photoVideo) {
            formDataToSend.append('photo_video', photoVideo);
        }

        axios.post('http://localhost:8000/api/remise_de_cle.php', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log("res",response)
            //alert('Remise de clé was created successfully.');
            navigate(`/`);
        })
        .catch(error => {
            alert('Failed to create remise de clé.');
        });
    };


    const handleAddImmeuble = () => {
        setPopupVisible(true);
    };

    const handleNewImmeubleChange = (e) => {
        setNewImmeuble({ ...newImmeuble, [e.target.name]: e.target.value });
    };
    const closeImmeublePopup = () => {
        setPopupImmeuble({ ...popupImmeuble, show: false });
    };

    const handleCreateImmeuble = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/create_immeuble.php', newImmeuble)
            .then(response => {
                setPopupImmeuble({ message: 'Immeuble created successfully.', state: 'success', show: true });
                setShowImmeublePopup(false);
                setNewImmeuble({
                    name: '',
                    address: '',
                    city: '',
                    postal_code: '',
                    country: ''
                });
                // Refresh the immeubles list
                axios.get('http://localhost:8000/api/read_immeubles.php')
                    .then(response => {
                        if (response.data.records) {
                            setImmeubles(response.data.records);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching immeubles:', error);
                    });
            })
            .catch(error => {
                setPopupImmeuble({ message: 'Failed to create immeuble.', state: 'error', show: true });
            });
    };

    const handleImmeubleSelect = (id) => {
        setFormData({ ...formData, lot_id: id });
    };


    const closePopup = () => {
        setPopup({ ...popup, show: false });
    };

    return (
        <>
            <div 
                className="min-h-screen bg-cover bg-center flex items-center justify-center h-1/2"
                style={{ backgroundImage: `url('/v1.jpg')` }}
            ></div>
            <div className="text-center my-8">
                <h2 className="text-3xl font-bold text-black">REMISE DES CLES 🔑</h2>
                <center className='mt-2'>
                    <svg width="400" height="10" viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 10L15 0L25 10L35 0L45 10L55 0L65 10L75 0L85 10L95 0L105 10L115 0L125 10" stroke="#E31B23" strokeWidth="4" />
                    </svg>
                </center>
            </div>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 rounded-lg">
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2 whitespace-nowrap" htmlFor="lot_id">
                        Immeuble
                    </label>
                    <div className="flex items-center w-full">
                        <select
                            name="lot_id"
                            value={formData.lot_id}
                            onChange={(e) => handleImmeubleSelect(e.target.value)}
                            className="border-b-2 border-co_grey_light w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                        >
                            <option value="">Select Immeuble</option>
                            {immeubles.map((immeuble) => (
                                <option key={immeuble.id} value={immeuble.id}>
                                    <div>{immeuble.name}</div>
                                    <br/>{immeuble.address}
                                </option>
                            ))}
                        </select>
                        <BsBuildingFillAdd className="ml-2 cursor-pointer"                             
                        onClick={() => setShowImmeublePopup(true)}
 />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="donneur">
                        Donneur
                    </label>
                    <input
                        type="text"
                        name="donneur"
                        placeholder="Donneur"
                        value={formData.donneur}
                        onChange={handleChange}
                        className="border-b-2 border-co_grey_light w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="receveur">
                        Receveur
                    </label>
                    <input
                        type="text"
                        name="receveur"
                        placeholder="Receveur"
                        value={formData.receveur}
                        onChange={handleChange}
                        className="border-b-2 border-co_grey_light w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo_video">
                        Photo/Video
                    </label>
                    <input
                        type="file"
                        name="photo_video"
                        accept="image/*,video/*"
                        onChange={handleChange}
                        className="border-b-2 border-co_grey_light w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date_remise">
                        Date Remise
                    </label>
                    <input
                        type="date"
                        name="date_remise"
                        value={formData.date_remise}
                        onChange={handleChange}
                        className="border-b-2 border-co_grey_light w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="commentaire">
                        Commentaire
                    </label>
                    <textarea
                        name="commentaire"
                        placeholder="Commentaire"
                        value={formData.commentaire}
                        onChange={handleChange}
                        className="border-b-2 border-co_grey_light w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                    ></textarea>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signature">
                        Signature
                    </label>
                    <input
                        type="file"
                        name="signature"
                        onChange={handleChange}
                        accept="image/*,video/*"
                        className="border-b-2 border-co_grey_light w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                    />
                </div>
                <div className="flex justify-items-end">
                    <button
                        type="submit"
                        className="bg-[#E31B23] hover:bg-[#e31b2296] text-co_white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Envoyer
                    </button>
                </div>
            </form>
            {popup.show && (
                <div className="popup-overlay">
                    <Popup 
                        message={popup.message} 
                        state={popup.state} 
                        onClose={closePopup} 
                    />
                </div>
            )}
            {showImmeublePopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3 className="text-xl font-bold mb-4">Add New Immeuble</h3>
                        <form onSubmit={handleCreateImmeuble} className="space-y-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Immeuble Name"
                                    value={newImmeuble.name}
                                    onChange={handleImmeubleChange}
                                    className="border-b-2 border-co_grey_light w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Immeuble Address"
                                    value={newImmeuble.address}
                                    onChange={handleImmeubleChange}
                                    className="border-b-2 border-co_grey_light w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={newImmeuble.city}
                                    onChange={handleImmeubleChange}
                                    className="border-b-2 border-co_grey_light w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postal_code">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    name="postal_code"
                                    placeholder="Postal Code"
                                    value={newImmeuble.postal_code}
                                    onChange={handleImmeubleChange}
                                    className="border-b-2 border-co_grey_light w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Country"
                                    value={newImmeuble.country}
                                    onChange={handleImmeubleChange}
                                    className="border-b-2 border-co_grey_light w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowImmeublePopup(false)}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#E31B23] hover:bg-[#e31b2296] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                        {popupImmeuble.show && (
                            <Popup
                                message={popupImmeuble.message}
                                state={popupImmeuble.state}
                                onClose={closeImmeublePopup}
                            />
                        )}
                    </div>
                </div>
            )}

        </>
    );
}

export default RemiseDeCleForm;
