import React, { useEffect, useRef, useContext, useState } from 'react';
import { Routes, Route, useLocation, Link, useNavigate } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';
import DisplayAlbum from './DisplayAlbum';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
import { Heart, Search, Library, Play, Trash2, Folder, Disc, Mic, Volume2 } from 'lucide-react';

const Display = () => {
    const displayRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();
    const { songsData, albumsData, likedSongs, toggleLikeSong, playWithId, activeFilter } = useContext(PlayerContext);

    const isAlbum = location.pathname.includes("album");
    const albumId = isAlbum ? location.pathname.split('/').pop() : "";
    const album = isAlbum ? albumsData.find((x) => x._id === albumId) : null;
    const bgColor = isAlbum && album ? album.bgColor : "transparent";

    // Library Tab State
    const queryParams = new URLSearchParams(location.search);
    const activeTab = queryParams.get('tab') || 'liked';

    // Search Query State
    const [searchQuery, setSearchQuery] = useState("");

    // Mock Data for Podcasts & Audiobooks
    const mockPodcasts = [
        { name: "Science & Technology", desc: "Latest in AI & Tech innovations", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=300&auto=format&fit=crop" },
        { name: "Daily Motivation", desc: "Start your day with positive energy", image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=300&auto=format&fit=crop" },
        { name: "True Crime Stories", desc: "Mysterious cases investigated", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop" },
        { name: "Philosophy 101", desc: "Deep questions about existence", image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=300&auto=format&fit=crop" }
    ];

    const mockAudiobooks = [
        { name: "Atomic Habits", desc: "By James Clear • Self-Improvement", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300&auto=format&fit=crop" },
        { name: "The Creative Act", desc: "By Rick Rubin • Creativity & Art", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300&auto=format&fit=crop" },
        { name: "Dune", desc: "By Frank Herbert • Sci-Fi Epic", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=300&auto=format&fit=crop" }
    ];

    useEffect(() => {
        if (isAlbum && album) {
            displayRef.current.style.background = `linear-gradient(to bottom, ${bgColor}80, transparent)`;
        } else {
            displayRef.current.style.background = `transparent`;
        }
    }, [isAlbum, album, bgColor]);

    // Find actual song objects that are liked
    const likedSongsList = songsData.filter(song => likedSongs.includes(song._id));

    return (
        <div ref={displayRef} className='w-full px-3 sm:px-6 pt-4 sm:pt-5 pb-20 sm:pb-24 text-white min-h-[calc(100vh-140px)] animate-fade-in'>
            <Routes>
                {/* Main Home Grid */}
                <Route path='/' element={
                    <div className='mb-8'>
                        {/* Render all categories or specific filter */}
                        {activeFilter === 'all' && (
                            <>
                                <h2 className='mb-6 font-bold text-xl sm:text-3xl hover:underline cursor-pointer drop-shadow-lg tracking-tight'>Featured Charts</h2>
                                <div className='flex overflow-auto gap-6 scrollbar-hide pb-6 -mx-3 sm:-mx-6 px-3 sm:px-6'>
                                    {albumsData && albumsData.length > 0 ? (
                                        albumsData.map((item, index) => (
                                            <Link to={`/album/${item._id}`} key={index} style={{ animationDelay: `${index * 50}ms` }} className='animate-fade-in opacity-0'>
                                                <AlbumItem image={item.image} name={item.name} desc={item.desc} id={item._id} />
                                            </Link>
                                        ))
                                    ) : (
                                        <p className='text-sm text-spotifyGray pl-6 italic'>No albums created yet. Use Admin Console to add collections!</p>
                                    )}
                                </div>

                                <h2 className='my-6 sm:my-8 font-bold text-xl sm:text-3xl hover:underline cursor-pointer drop-shadow-lg tracking-tight'>Today's Biggest Hits</h2>
                                <div className='flex overflow-auto gap-6 scrollbar-hide pb-6 -mx-3 sm:-mx-6 px-3 sm:px-6'>
                                    {songsData && songsData.length > 0 ? (
                                        songsData.map((item, index) => (
                                            <div key={index} style={{ animationDelay: `${index * 50}ms` }} className='animate-fade-in opacity-0'>
                                                <SongItem image={item.image} name={item.name} desc={item.desc} id={item._id} file={item.file} />
                                            </div>
                                        ))
                                    ) : (
                                        <p className='text-sm text-spotifyGray pl-6 italic'>No songs uploaded yet. Use Admin Console to upload music tracks!</p>
                                    )}
                                </div>
                            </>
                        )}

                        {activeFilter === 'music' && (
                            <>
                                <h2 className='mb-6 font-bold text-3xl tracking-tight'>Music Hits</h2>
                                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
                                    {songsData && songsData.length > 0 ? (
                                        songsData.map((item, index) => (
                                            <div key={index} style={{ animationDelay: `${index * 50}ms` }} className='animate-fade-in opacity-0'>
                                                <SongItem image={item.image} name={item.name} desc={item.desc} id={item._id} file={item.file} />
                                            </div>
                                        ))
                                    ) : (
                                        <p className='text-sm text-spotifyGray italic col-span-full py-8 text-center'>No songs found. Use Admin Console to upload music!</p>
                                    )}
                                </div>
                            </>
                        )}

                        {activeFilter === 'podcasts' && (
                            <>
                                <h2 className='mb-6 font-bold text-3xl tracking-tight'>Popular Podcasts</h2>
                                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
                                    {mockPodcasts.map((item, index) => (
                                        <div key={index} className='p-4 rounded-xl cursor-pointer glass-panel hover:bg-[rgba(255,255,255,0.1)] hover:-translate-y-2 transition-all duration-300 shadow-lg group'>
                                            <div className='relative mb-4 overflow-hidden rounded-lg shadow-md'>
                                                <img className='w-full object-cover aspect-square rounded-lg group-hover:scale-105 transition-transform duration-500' src={item.image} alt={item.name} />
                                                <div className="absolute bottom-2 right-2 w-10 h-10 bg-spotifyGreen rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl">
                                                    <Mic className="w-5 h-5 text-black" />
                                                </div>
                                            </div>
                                            <p className='font-bold mt-2 truncate text-white'>{item.name}</p>
                                            <p className='text-spotifyGray text-xs line-clamp-2 mt-1'>{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {activeFilter === 'audiobooks' && (
                            <>
                                <h2 className='mb-6 font-bold text-3xl tracking-tight'>Bestselling Audiobooks</h2>
                                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
                                    {mockAudiobooks.map((item, index) => (
                                        <div key={index} className='p-4 rounded-xl cursor-pointer glass-panel hover:bg-[rgba(255,255,255,0.1)] hover:-translate-y-2 transition-all duration-300 shadow-lg group'>
                                            <div className='relative mb-4 overflow-hidden rounded-lg shadow-md'>
                                                <img className='w-full object-cover aspect-square rounded-lg group-hover:scale-105 transition-transform duration-500' src={item.image} alt={item.name} />
                                                <div className="absolute bottom-2 right-2 w-10 h-10 bg-spotifyGreen rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl">
                                                    <Disc className="w-5 h-5 text-black" />
                                                </div>
                                            </div>
                                            <p className='font-bold mt-2 truncate text-white'>{item.name}</p>
                                            <p className='text-spotifyGray text-xs line-clamp-2 mt-1'>{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                } />

                {/* Album Details View */}
                <Route path='/album/:id' element={<DisplayAlbum />} />

                {/* Premium Search Page View */}
                <Route path='/search' element={
                    <div className='mb-8'>
                        <h2 className='font-bold text-3xl mb-6 tracking-tight'>Search</h2>
                        
                        {/* Search Input Control */}
                        <div className='relative max-w-md mb-8 group'>
                            <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-spotifyGray group-focus-within:text-spotifyGreen transition-colors w-5 h-5' />
                            <input 
                                type="text" 
                                placeholder="What do you want to listen to?" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='w-full bg-[#242424] hover:bg-[#2a2a2a] focus:bg-[#2a2a2a] border border-transparent focus:border-[rgba(255,255,255,0.2)] pl-12 pr-4 py-3 rounded-full text-white text-[15px] outline-none transition-all placeholder:text-spotifyGray font-medium'
                            />
                        </div>

                        {/* Search Query Results */}
                        {searchQuery ? (
                            <div>
                                <h3 className='font-bold text-xl mb-4 text-spotifyGreen'>Matched Songs</h3>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                    {songsData.filter(s => 
                                        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                        s.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        (s.album && s.album.toLowerCase().includes(searchQuery.toLowerCase()))
                                    ).length > 0 ? (
                                        songsData.filter(s => 
                                            s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                            s.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            (s.album && s.album.toLowerCase().includes(searchQuery.toLowerCase()))
                                        ).map((song) => (
                                            <div 
                                                key={song._id}
                                                onClick={() => playWithId(song)}
                                                className='flex items-center justify-between p-3 bg-black/40 hover:bg-zinc-800/40 border border-zinc-800/60 rounded-lg cursor-pointer transition-all group'
                                            >
                                                <div className='flex items-center gap-3 min-w-0'>
                                                    <img src={song.image} alt={song.name} className='w-12 h-12 rounded object-cover shadow' />
                                                    <div className='min-w-0'>
                                                        <p className='text-sm font-bold text-white group-hover:text-spotifyGreen truncate'>{song.name}</p>
                                                        <p className='text-xs text-spotifyGray truncate mt-0.5'>{song.desc}</p>
                                                    </div>
                                                </div>
                                                <div className='flex items-center gap-3'>
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); toggleLikeSong(song._id); }}
                                                        className='p-2 hover:bg-zinc-800 rounded-full text-spotifyGray hover:text-white transition-all'
                                                    >
                                                        <Heart className={`w-4 h-4 ${likedSongs.includes(song._id) ? 'text-spotifyGreen fill-spotifyGreen' : ''}`} />
                                                    </button>
                                                    <Play className='w-5 h-5 text-spotifyGreen opacity-0 group-hover:opacity-100 transition-opacity fill-current mr-2' />
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className='text-sm text-spotifyGray italic pl-2'>No matching songs found.</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            /* Spotify-style Genre Category Cards */
                            <div>
                                <h3 className='font-bold text-xl mb-4'>Browse All</h3>
                                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                                    {[
                                        { title: "Podcasts", color: "from-purple-600 to-indigo-800" },
                                        { title: "Made For You", color: "from-blue-600 to-blue-800" },
                                        { title: "New Releases", color: "from-pink-600 to-rose-800" },
                                        { title: "Pop", color: "from-emerald-500 to-teal-700" },
                                        { title: "Hip-Hop", color: "from-orange-500 to-amber-700" },
                                        { title: "Rock", color: "from-red-600 to-orange-800" },
                                        { title: "Latin", color: "from-yellow-500 to-amber-600" },
                                        { title: "Dance & Electronica", color: "from-sky-500 to-cyan-700" },
                                        { title: "Charts", color: "from-violet-600 to-purple-800" },
                                        { title: "Discover", color: "from-fuchsia-600 to-pink-800" }
                                    ].map((cat, idx) => (
                                        <div 
                                            key={idx} 
                                            className={`h-36 rounded-xl bg-gradient-to-br ${cat.color} p-4 relative overflow-hidden cursor-pointer hover:scale-103 transition-transform duration-300 shadow-md group`}
                                        >
                                            <span className='font-bold text-lg text-white drop-shadow-md'>{cat.title}</span>
                                            <div className='absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full rotate-12 group-hover:scale-110 transition-transform duration-500'></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                } />

                {/* Comprehensive Your Library Page */}
                <Route path='/library' element={
                    <div className='mb-8'>
                        <div className='flex items-center gap-3 mb-6'>
                            <Library className='w-8 h-8 text-spotifyGreen' />
                            <h2 className='font-bold text-3xl tracking-tight'>Your Library</h2>
                        </div>

                        {/* Sub Tabs Selection Navigation */}
                        <div className='flex items-center gap-2 border-b border-zinc-800/80 pb-3 mb-6'>
                            <button 
                                onClick={() => navigate('/library?tab=liked')}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${activeTab === 'liked' ? 'bg-white text-black' : 'bg-transparent text-spotifyLightGray hover:text-white'}`}
                            >
                                Liked Songs ({likedSongsList.length})
                            </button>
                            <button 
                                onClick={() => navigate('/library?tab=albums')}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${activeTab === 'albums' ? 'bg-white text-black' : 'bg-transparent text-spotifyLightGray hover:text-white'}`}
                            >
                                Albums ({albumsData.length})
                            </button>
                            <button 
                                onClick={() => navigate('/library?tab=local')}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${activeTab === 'local' ? 'bg-white text-black' : 'bg-transparent text-spotifyLightGray hover:text-white'}`}
                            >
                                Local Files ({songsData.length})
                            </button>
                            <button 
                                onClick={() => navigate('/library?tab=podcasts')}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${activeTab === 'podcasts' ? 'bg-white text-black' : 'bg-transparent text-spotifyLightGray hover:text-white'}`}
                            >
                                Podcasts & Episodes
                            </button>
                        </div>

                        {/* Liked Songs List View */}
                        {activeTab === 'liked' && (
                            <div>
                                {likedSongsList.length > 0 ? (
                                    <div className='flex flex-col gap-1.5'>
                                        <div className='grid grid-cols-[auto_2fr_1fr_auto] gap-4 p-3 text-xs text-spotifyGray font-bold uppercase tracking-wider border-b border-zinc-800/60 px-4'>
                                            <span className='w-8 text-center'>#</span>
                                            <span>Title</span>
                                            <span>Album</span>
                                            <span className='w-12 text-center'>Action</span>
                                        </div>
                                        {likedSongsList.map((song, index) => (
                                            <div 
                                                key={song._id}
                                                onClick={() => playWithId(song)}
                                                className='grid grid-cols-[auto_2fr_1fr_auto] gap-4 p-3 items-center rounded-lg cursor-pointer bg-black/40 hover:bg-zinc-800/40 border border-zinc-800/60 transition-colors group px-4 text-sm'
                                            >
                                                <span className='w-8 text-center text-spotifyGray font-medium group-hover:hidden'>{index + 1}</span>
                                                <span className='w-8 text-center hidden group-hover:inline-block text-spotifyGreen'>
                                                    <Play className='w-4 h-4 fill-current mx-auto' />
                                                </span>
                                                
                                                <div className='flex items-center gap-3 min-w-0'>
                                                    <img src={song.image} alt={song.name} className='w-10 h-10 rounded object-cover shadow' />
                                                    <div className='min-w-0'>
                                                        <p className='font-bold text-white group-hover:text-spotifyGreen truncate'>{song.name}</p>
                                                        <p className='text-xs text-spotifyGray truncate mt-0.5'>{song.desc}</p>
                                                    </div>
                                                </div>

                                                <span className='text-spotifyGray truncate'>{song.album}</span>
                                                
                                                <div className='flex justify-center'>
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); toggleLikeSong(song._id); }}
                                                        className='p-2 text-spotifyGreen hover:scale-110 transition-transform'
                                                        title="Remove from Liked Songs"
                                                    >
                                                        <Heart className='w-5 h-5 fill-current' />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='text-center py-16 bg-[#181818]/60 border border-zinc-800/50 rounded-xl max-w-lg mx-auto p-8'>
                                        <Heart className='w-12 h-12 text-spotifyGray/60 mx-auto mb-4 stroke-1' />
                                        <p className='text-white font-bold text-lg mb-2'>Songs you like will appear here</p>
                                        <p className='text-spotifyGray text-xs mb-6 max-w-xs mx-auto'>Save tracks by clicking the heart button in your music player or lists.</p>
                                        <button 
                                            onClick={() => navigate('/')} 
                                            className='bg-white text-black font-bold text-sm px-6 py-2.5 rounded-full hover:scale-105 transition-transform'
                                        >
                                            Find Music
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Albums List View */}
                        {activeTab === 'albums' && (
                            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
                                {albumsData && albumsData.length > 0 ? (
                                    albumsData.map((item, index) => (
                                        <Link to={`/album/${item._id}`} key={index}>
                                            <AlbumItem image={item.image} name={item.name} desc={item.desc} id={item._id} />
                                        </Link>
                                    ))
                                ) : (
                                    <p className='text-sm text-spotifyGray italic col-span-full py-8 text-center'>No albums configured yet.</p>
                                )}
                            </div>
                        )}

                        {/* Local Files View */}
                        {activeTab === 'local' && (
                            <div>
                                {songsData.length > 0 ? (
                                    <div className='flex flex-col gap-1.5'>
                                        <div className='grid grid-cols-[auto_2fr_1fr_auto] gap-4 p-3 text-xs text-spotifyGray font-bold uppercase tracking-wider border-b border-zinc-800/60 px-4'>
                                            <span className='w-8 text-center'>#</span>
                                            <span>Title</span>
                                            <span>Album</span>
                                            <span className='w-12 text-center'>Like</span>
                                        </div>
                                        {songsData.map((song, index) => (
                                            <div 
                                                key={song._id}
                                                onClick={() => playWithId(song)}
                                                className='grid grid-cols-[auto_2fr_1fr_auto] gap-4 p-3 items-center rounded-lg cursor-pointer bg-black/40 hover:bg-zinc-800/40 border border-zinc-800/60 transition-colors group px-4 text-sm'
                                            >
                                                <span className='w-8 text-center text-spotifyGray font-medium group-hover:hidden'>{index + 1}</span>
                                                <span className='w-8 text-center hidden group-hover:inline-block text-spotifyGreen'>
                                                    <Play className='w-4 h-4 fill-current mx-auto' />
                                                </span>
                                                
                                                <div className='flex items-center gap-3 min-w-0'>
                                                    <img src={song.image} alt={song.name} className='w-10 h-10 rounded object-cover shadow' />
                                                    <div className='min-w-0'>
                                                        <p className='font-bold text-white group-hover:text-spotifyGreen truncate'>{song.name}</p>
                                                        <p className='text-xs text-spotifyGray truncate mt-0.5'>{song.desc}</p>
                                                    </div>
                                                </div>

                                                <span className='text-spotifyGray truncate'>{song.album}</span>
                                                
                                                <div className='flex justify-center'>
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); toggleLikeSong(song._id); }}
                                                        className='p-2 text-spotifyGray hover:text-white transition-colors'
                                                    >
                                                        <Heart className={`w-5 h-5 ${likedSongs.includes(song._id) ? 'text-spotifyGreen fill-spotifyGreen' : ''}`} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className='text-sm text-spotifyGray italic py-8 text-center'>No tracks imported inside local repository yet.</p>
                                )}
                            </div>
                        )}

                        {/* Podcasts & Episodes View */}
                        {activeTab === 'podcasts' && (
                            <div className='text-center py-16 bg-[#181818]/60 border border-zinc-800/50 rounded-xl max-w-lg mx-auto p-8'>
                                <Mic className='w-12 h-12 text-spotifyGray/60 mx-auto mb-4 stroke-1' />
                                <p className='text-white font-bold text-lg mb-2'>Looking for podcasts?</p>
                                <p className='text-spotifyGray text-xs mb-6 max-w-xs mx-auto'>We're connecting external podcasts channels to your Cloud pipeline.</p>
                                <button className='bg-white text-black font-bold text-sm px-6 py-2.5 rounded-full hover:scale-105 transition-transform'>
                                    Explore Podcasts
                                </button>
                            </div>
                        )}
                    </div>
                } />
            </Routes>
        </div>
    );
};

export default Display;