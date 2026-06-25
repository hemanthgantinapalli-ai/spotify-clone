import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';
import { PlayerContext } from '../context/PlayerContext';

const AddSong = () => {
    const url = 'http://localhost:5000';
    const { refreshSongs } = useContext(PlayerContext);

    const [songFile, setSongFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [album, setAlbum] = useState("none");
    const [loading, setLoading] = useState(false);
    const [albumList, setAlbumList] = useState([]);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const res = await axios.get(`${url}/api/album/list`);
                if (res.data.success) setAlbumList(res.data.albums);
            } catch (err) {
                console.error("Failed to load album listings:", err);
            }
        };
        fetchAlbums();
    }, []);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setSuccessMsg("");
        setErrorMsg("");
        if (!songFile) { setErrorMsg("Please select an audio file (.mp3)"); return; }
        if (!imageFile) { setErrorMsg("Please select an album artwork image"); return; }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('desc', desc);
            formData.append('album', album);
            formData.append('audioFile', songFile);
            formData.append('imageFile', imageFile);

            // Get JWT token from localStorage and attach to request
            const token = localStorage.getItem('token');
            const response = await axios.post(`${url}/api/song/add`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setSuccessMsg("✅ Song Added Successfully! 🎧");
                setName("");
                setDesc("");
                setAlbum("none");
                setSongFile(null);
                setImageFile(null);
                
                // Dynamically update the track list
                if (refreshSongs) {
                    await refreshSongs();
                }
            } else {
                setErrorMsg("Something went wrong on the server.");
            }
        } catch (error) {
            console.error(error);
            if (error.response?.status === 401) {
                setErrorMsg("❌ You must be logged in as an Admin to add songs. Please log in first.");
            } else if (error.response?.status === 403) {
                setErrorMsg("❌ Access denied. Only Admin accounts can add songs.");
            } else {
                setErrorMsg("❌ Error uploading: " + (error.response?.data?.message || error.message));
            }
        }
        setLoading(false);
    };

    return (
        <div className='p-6 max-w-4xl mx-auto'>
            <AdminNav />
            <div className='p-6 text-white bg-spotifyLightBlack rounded shadow-md max-w-lg mx-auto'>
            {successMsg && <p className='text-green-500 mb-4'>{successMsg}</p>}
            {errorMsg && <p className='text-red-500 mb-4'>{errorMsg}</p>}
            {loading ? (
                <div className='grid place-items-center h-40'>
                    <div className='w-10 h-10 border-4 border-t-spotifyGreen border-gray-600 rounded-full animate-spin'></div>
                    <p className='mt-4 text-sm text-spotifyGray'>Uploading music tracks to Cloudinary cloud pipelines...</p>
                </div>
            ) : (
                <form onSubmit={onSubmitHandler} className='flex flex-col gap-4 text-sm'>
                    <h2 className='text-xl font-bold text-spotifyGreen mb-2'>Upload New Track</h2>

                    <div className='flex gap-4'>
                        <div className='flex flex-col gap-1 w-1/2'>
                            <p className='font-semibold mb-1'>Upload Song File (.mp3)</p>
                            <label className={`p-3 rounded cursor-pointer text-center truncate block hover:bg-zinc-700 border border-dashed transition-colors ${songFile ? 'bg-green-900/30 border-green-500 text-green-300' : 'bg-spotifyDarkGray border-gray-500'}`}>
                                {songFile ? `🎵 ${songFile.name}` : "Click to Select Audio (.mp3)"}
                                <input onChange={(e) => setSongFile(e.target.files[0])} type="file" accept="audio/*" hidden />
                            </label>
                        </div>

                        <div className='flex flex-col gap-1 w-1/2'>
                            <p className='font-semibold mb-1'>Upload Album Art</p>
                            <label className={`p-3 rounded cursor-pointer text-center truncate block hover:bg-zinc-700 border border-dashed transition-colors ${imageFile ? 'bg-green-900/30 border-green-500 text-green-300' : 'bg-spotifyDarkGray border-gray-500'}`}>
                                {imageFile ? `🖼️ ${imageFile.name}` : "Click to Select Image"}
                                <input onChange={(e) => setImageFile(e.target.files[0])} type="file" accept="image/*" hidden />
                            </label>
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p className='font-semibold'>Song Name</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} className='bg-transparent border border-spotifyDarkGray p-2.5 rounded focus:outline-none focus:border-spotifyGreen' type="text" placeholder="Type here..." required />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p className='font-semibold'>Song Description</p>
                        <input onChange={(e) => setDesc(e.target.value)} value={desc} className='bg-transparent border border-spotifyDarkGray p-2.5 rounded focus:outline-none focus:border-spotifyGreen' type="text" placeholder="Type description..." required />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p className='font-semibold'>Assign to Album</p>
                        <select onChange={(e) => setAlbum(e.target.value)} value={album} className='bg-spotifyDarkGray border border-spotifyDarkGray p-2.5 rounded text-white outline-none cursor-pointer'>
                            <option value="none">None (Single Track)</option>
                            {albumList.map((item) => (
                                <option key={item._id} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    <button type='submit' className='text-black font-bold bg-spotifyGreen py-2.5 rounded-full mt-4 hover:scale-102 transition-all cursor-pointer'>
                        ADD SONG
                    </button>
                </form>
            )}
            </div>
        </div>
    );
};

export default AddSong;