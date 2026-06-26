import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Clock, ChevronLeft, Heart } from 'lucide-react';
import { PlayerContext } from '../context/PlayerContext';

const DisplayAlbum = () => {
    const { id } = useParams();
    const { albumsData, songsData, playWithId, playStatus, play, pause, track, likedSongs, toggleLikeSong } = useContext(PlayerContext);

    // Find the current album
    const album = albumsData.find((item) => item._id === id);

    if (!album) {
        return (
            <div className='p-6 text-center text-spotifyGray'>
                <p>Album not found.</p>
                <Link to="/" className='text-white underline mt-4 inline-block'>Back to Home</Link>
            </div>
        );
    }

    // Filter songs belonging to this album
    const albumSongs = songsData.filter((item) => item.album === album.name);

    const handlePlayAlbum = () => {
        if (albumSongs.length > 0) {
            playWithId(albumSongs[0]);
        }
    };

    return (
        <div className='relative min-h-full pb-20'>
            {/* Top Navigation */}
            <div className='flex items-center justify-between mb-6'>
                <Link to="/" className='flex items-center gap-1 text-spotifyGray hover:text-white transition-all bg-black/40 p-2 rounded-full'>
                    <ChevronLeft className='w-6 h-6' />
                </Link>
            </div>

            {/* Album Header Banner */}
            <div className='flex flex-col md:flex-row md:items-end gap-6 mb-8'>
                <img className='w-48 h-48 md:w-56 md:h-56 rounded object-cover shadow-2xl shadow-black/80' src={album.image} alt={album.name} />
                <div className='flex flex-col gap-2'>
                    <p className='text-xs font-bold uppercase tracking-wider text-spotifyGray'>Playlist & Album</p>
                    <h2 className='text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-2'>{album.name}</h2>
                    <p className='text-spotifyGray text-sm md:text-base font-medium'>{album.desc}</p>
                    <div className='flex items-center gap-2 text-xs font-semibold text-white mt-2'>
                        <span className='text-spotifyGreen font-bold'>Sound Wave</span>
                        <span className='w-1 h-1 bg-white rounded-full'></span>
                        <span className='text-spotifyGray'>{albumSongs.length} songs</span>
                    </div>
                </div>
            </div>

            {/* Controls Bar */}
            <div className='flex items-center gap-4 mb-6'>
                <button 
                    onClick={handlePlayAlbum} 
                    className='w-14 h-14 bg-spotifyGreen rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-all text-black shadow-lg shadow-black/35 hover:bg-[#3be477]'
                >
                    <Play className='w-6 h-6 fill-black text-black ml-1' />
                </button>
            </div>

            {/* Song List Header */}
            <div className='grid grid-cols-[auto_2fr_auto_auto] md:grid-cols-[auto_2fr_1fr_auto_auto] gap-4 p-2 text-xs text-spotifyGray font-bold border-b border-zinc-800/80 uppercase tracking-wider pb-3 mb-4 px-4'>
                <span className='w-8 text-center'>#</span>
                <span>Title</span>
                <span className='hidden md:block'>Album</span>
                <span className='w-8 text-center'>Like</span>
                <span className='w-12 text-center'><Clock className='w-4 h-4 mx-auto' /></span>
            </div>

            {/* Song Entries */}
            <div className='flex flex-col gap-0.5 px-2'>
                {albumSongs.length > 0 ? (
                    albumSongs.map((item, index) => {
                        const isCurrentTrack = track?._id === item._id;
                        const isLiked = likedSongs.includes(item._id);
                        return (
                            <div 
                                key={item._id} 
                                onClick={() => playWithId(item)}
                                className={`grid grid-cols-[auto_2fr_auto_auto] md:grid-cols-[auto_2fr_1fr_auto_auto] gap-4 p-3 items-center rounded cursor-pointer transition-colors group ${
                                    isCurrentTrack ? 'bg-zinc-800/50 text-spotifyGreen' : 'hover:bg-zinc-800/40 text-white'
                                }`}
                            >
                                <span className={`w-8 text-center text-sm font-medium ${isCurrentTrack ? 'text-spotifyGreen' : 'text-spotifyGray group-hover:hidden'}`}>
                                    {index + 1}
                                </span>
                                <span className={`w-8 text-center hidden group-hover:inline-block ${isCurrentTrack ? 'text-spotifyGreen' : 'text-spotifyGray'}`}>
                                    <Play className='w-4 h-4 fill-current mx-auto' />
                                </span>
                                <div className='flex items-center gap-3 min-w-0'>
                                    <img className='w-10 h-10 object-cover rounded shadow' src={item.image} alt={item.name} />
                                    <div className='min-w-0'>
                                        <p className={`text-sm font-semibold truncate ${isCurrentTrack ? 'text-spotifyGreen' : 'text-white'}`}>{item.name}</p>
                                        <p className='text-xs text-spotifyGray truncate mt-0.5'>{item.desc}</p>
                                    </div>
                                </div>
                                <span className={`text-sm text-spotifyGray truncate hidden md:block ${isCurrentTrack ? 'text-spotifyGreen/80' : ''}`}>{item.album}</span>
                                
                                {/* Like Icon in the row */}
                                <div className='w-8 flex items-center justify-center'>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); toggleLikeSong(item._id); }}
                                        className='p-1.5 hover:bg-zinc-700/50 rounded-full transition-colors text-spotifyGray hover:text-white'
                                    >
                                        <Heart className={`w-4 h-4 ${isLiked ? 'text-spotifyGreen fill-spotifyGreen' : ''}`} />
                                    </button>
                                </div>

                                <span className='w-12 text-center text-xs text-spotifyGray font-mono'>{item.duration}</span>
                            </div>
                        );
                    })
                ) : (
                    <p className='text-sm text-spotifyGray italic p-6 text-center'>No songs found inside this album.</p>
                )}
            </div>
        </div>
    );
};

export default DisplayAlbum;
