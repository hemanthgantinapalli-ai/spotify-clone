import React, { useState, useContext } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';
import { PlayerContext } from '../context/PlayerContext';

const AddAlbum = () => {
    const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    const { refreshAlbums } = useContext(PlayerContext);

    const [imageFile, setImageFile] = useState(null);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [bgColor, setBgColor] = useState("#121212");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setSuccessMsg("");
        setErrorMsg("");
        if (!imageFile) { setErrorMsg("Please select an album artwork image!"); return; }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('desc', desc);
            formData.append('bgColor', bgColor);
            formData.append('image', imageFile);

            const token = localStorage.getItem('token');
            const response = await axios.post(`${url}/api/album/add`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setSuccessMsg("✅ Album Created Successfully! 💿");
                setName("");
                setDesc("");
                setBgColor("#121212");
                setImageFile(null);
                
                // Dynamically update albums list
                if (refreshAlbums) {
                    await refreshAlbums();
                }
            } else {
                setErrorMsg("Something went wrong on the server.");
            }
        } catch (error) {
            console.error(error);
            if (error.response?.status === 401) {
                setErrorMsg("❌ You must be logged in as an Admin to create albums.");
            } else if (error.response?.status === 403) {
                setErrorMsg("❌ Access denied. Only Admin accounts can create albums.");
            } else {
                setErrorMsg("❌ Error: " + (error.response?.data?.message || error.message));
            }
        }
        setLoading(false);
    };

    return (
        <div className='p-6 max-w-4xl mx-auto'>
            <AdminNav />

            <div className='bg-spotifyLightBlack p-6 text-white rounded shadow-md max-w-lg mx-auto'>
                {successMsg && <p className='text-green-500 mb-3 font-medium'>{successMsg}</p>}
                {errorMsg && <p className='text-red-400 mb-3 font-medium'>{errorMsg}</p>}

                {loading ? (
                    <div className='grid place-items-center h-40'>
                        <div className='w-10 h-10 border-4 border-t-spotifyGreen border-gray-600 rounded-full animate-spin'></div>
                        <p className='mt-4 text-sm text-spotifyGray'>Creating album and uploading artwork to Cloudinary...</p>
                    </div>
                ) : (
                    <form onSubmit={onSubmitHandler} className='flex flex-col gap-4 text-sm'>
                        <h2 className='text-xl font-bold text-spotifyGreen mb-2'>Create New Album Collection</h2>

                        <div className='flex flex-col gap-1'>
                            <p className='font-semibold mb-1'>Upload Album Cover Artwork</p>
                            <label className={`p-3 rounded cursor-pointer text-center truncate block hover:bg-zinc-700 border border-dashed transition-colors ${imageFile ? 'bg-green-900/30 border-green-500 text-green-300' : 'bg-spotifyDarkGray border-gray-500'}`}>
                                {imageFile ? `🖼️ ${imageFile.name}` : "Click to Select Cover Image"}
                                <input onChange={(e) => setImageFile(e.target.files[0])} type="file" accept="image/*" hidden />
                            </label>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <p className='font-semibold'>Album Name</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} className='bg-transparent border border-spotifyDarkGray p-2.5 rounded focus:outline-none focus:border-spotifyGreen' type="text" placeholder="Type here..." required />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <p className='font-semibold'>Album Description</p>
                            <input onChange={(e) => setDesc(e.target.value)} value={desc} className='bg-transparent border border-spotifyDarkGray p-2.5 rounded focus:outline-none focus:border-spotifyGreen' type="text" placeholder="Type description..." required />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold'>Theme Accent Background Color</p>
                            <div className='flex items-center gap-3'>
                                <input onChange={(e) => setBgColor(e.target.value)} value={bgColor} className='w-10 h-10 border-0 bg-transparent rounded cursor-pointer' type="color" />
                                <span className='text-xs font-mono text-spotifyGray uppercase'>{bgColor}</span>
                            </div>
                        </div>

                        <button type='submit' className='text-black font-bold bg-spotifyGreen py-2.5 rounded-full mt-4 hover:scale-102 transition-all cursor-pointer'>
                            CREATE ALBUM
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AddAlbum;
