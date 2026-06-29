import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import AdminNav from './AdminNav';
import { PlayerContext } from '../context/PlayerContext';

const ListSong = () => {
    const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    const { refreshSongs } = useContext(PlayerContext);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSongs = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${url}/api/song/list`);
            if (response.data.success) {
                setSongs(response.data.songs);
            }
        } catch (error) {
            console.error("Error pulling song indices:", error);
        }
        setLoading(false);
    };

    const removeSong = async (id) => {
        if (!window.confirm("Are you sure you want to permanently delete this track?")) return;
        try {
            const response = await axios.post(`${url}/api/song/remove`, { id });
            if (response.data.success) {
                alert("Track removed successfully!");
                await fetchSongs(); // Refresh the list view
                if (refreshSongs) {
                    await refreshSongs(); // Refresh global context state
                }
            }
        } catch (error) {
            alert("Error executing drop request.");
        }
    };

    useEffect(() => {
        fetchSongs();
    }, []);

    return (
        <div className='p-6 max-w-4xl mx-auto'>
            <AdminNav />
            <div className='p-6 text-white bg-spotifyLightBlack rounded shadow mt-4'>
                <h2 className='text-xl font-bold text-spotifyGreen mb-4'>All Uploaded Songs</h2>

            {loading ? (
                <p className='text-sm text-spotifyGray animate-pulse'>Syncing track collection lines...</p>
            ) : (
                <div className='flex flex-col gap-2'>
                    {/* Table Header block layout */}
                    <div className='hidden sm:grid grid-cols-[0.5fr_1fr_2fr_2fr_0.5fr] items-center p-3 bg-spotifyDarkGray rounded text-xs font-bold uppercase tracking-wider text-spotifyGray'>
                        <span>Cover</span>
                        <span>Name</span>
                        <span>Description</span>
                        <span>Album</span>
                        <span className='text-center'>Action</span>
                    </div>

                    {/* List Entries */}
                    {songs.length > 0 ? (
                        songs.map((item) => {
                            const albumLabel = Array.isArray(item.albums) ? item.albums.join(', ') : item.album;
                            return (
                                <div key={item._id} className='grid grid-cols-[auto_1fr_auto] sm:grid-cols-[0.5fr_1fr_2fr_2fr_0.5fr] items-center gap-3 sm:gap-2 p-3 bg-black/40 border border-zinc-800/60 rounded hover:bg-zinc-800/40 transition-colors text-sm'>
                                    <img className='w-12 h-12 object-cover rounded' src={item.image} alt="" />
                                    <p className='font-semibold truncate pr-2'>{item.name}</p>
                                    <p className='text-spotifyGray truncate pr-2 hidden sm:block'>{item.desc}</p>
                                    <p className='text-spotifyGray truncate pr-2 hidden sm:block'>{albumLabel}</p>
                                    <div className='flex justify-end sm:justify-center'>
                                        <Trash2 onClick={() => removeSong(item._id)} className='w-5 h-5 text-red-500 cursor-pointer hover:text-red-400 transition-colors' />
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className='text-xs text-spotifyGray italic p-4 text-center'>No tracks exist inside the cloud cluster.</p>
                    )}
                </div>
            )}
            </div>
        </div>
    );
};

export default ListSong;