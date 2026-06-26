import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import AdminNav from './AdminNav';
import { PlayerContext } from '../context/PlayerContext';

const ListAlbum = () => {
    const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    const { refreshAlbums } = useContext(PlayerContext);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAlbums = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${url}/api/album/list`);
            if (response.data.success) {
                setAlbums(response.data.albums);
            }
        } catch (error) {
            console.error("Error pulling album data profiles:", error);
        }
        setLoading(false);
    };

    const removeAlbum = async (id) => {
        if (!window.confirm("Deleting this collection will unassign its track entries. Proceed?")) return;
        try {
            const response = await axios.post(`${url}/api/album/remove`, { id });
            if (response.data.success) {
                alert("Album collection deleted successfully!");
                await fetchAlbums();
                if (refreshAlbums) {
                    await refreshAlbums();
                }
            }
        } catch (error) {
            alert("Error dropping album document data record.");
        }
    };

    useEffect(() => {
        fetchAlbums();
    }, []);

    return (
        <div className='p-6 max-w-4xl mx-auto'>
            <AdminNav />
            <div className='p-6 text-white bg-spotifyLightBlack rounded shadow mt-4'>
                <h2 className='text-xl font-bold text-spotifyGreen mb-4'>All Active Album Collections</h2>

                {loading ? (
                    <p className='text-sm text-spotifyGray animate-pulse'>Syncing collection listings...</p>
                ) : (
                    <div className='flex flex-col gap-2'>
                        <div className='hidden sm:grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center p-3 bg-spotifyDarkGray rounded text-xs font-bold uppercase tracking-wider text-spotifyGray'>
                            <span>Cover</span>
                            <span>Title</span>
                            <span>Tagline Description</span>
                            <span>Accent Theme</span>
                            <span className='text-center'>Action</span>
                        </div>

                        {albums.length > 0 ? (
                            albums.map((item) => (
                                <div key={item._id} className='grid grid-cols-2 sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2 p-3 bg-black/40 border border-zinc-800/60 rounded hover:bg-zinc-800/40 transition-colors text-sm'>
                                    <img className='w-12 h-12 object-cover rounded' src={item.image} alt="" />
                                    <p className='font-semibold truncate pr-2'>{item.name}</p>
                                    <p className='text-spotifyGray truncate pr-2 hidden sm:block'>{item.desc}</p>
                                    <div className='flex items-center gap-2 hidden sm:flex'>
                                        <div className='w-4 h-4 rounded-full border border-white/20 shadow-sm' style={{ backgroundColor: item.bgColor }}></div>
                                        <span className='text-xs font-mono text-spotifyGray'>{item.bgColor}</span>
                                    </div>
                                <div className='flex justify-end sm:justify-center'>
                                    <Trash2 onClick={() => removeAlbum(item._id)} className='w-5 h-5 text-red-500 cursor-pointer hover:text-red-400 transition-colors' />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-xs text-spotifyGray italic p-4 text-center'>No albums configured in the repository.</p>
                    )}
                </div>
            )}
            </div>
        </div>
    );
};

export default ListAlbum;