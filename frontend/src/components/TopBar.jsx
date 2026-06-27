import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Bell, ArrowDownCircle } from 'lucide-react';
import { PlayerContext } from '../context/PlayerContext';

const TopBar = () => {
    const { isAuthenticated, user, logout, activeFilter, setActiveFilter } = useContext(PlayerContext);
    const navigate = useNavigate();
    const location = useLocation();

    const isAdminPage = location.pathname === '/add-song' ||
        location.pathname === '/add-album' ||
        location.pathname === '/list-song' ||
        location.pathname === '/list-album';

    return (
        <div className="h-[64px] sm:h-[80px] md:h-[120px] flex flex-col justify-end px-4 md:px-6 sticky top-0 z-20 glass pb-2 sm:pb-3 md:pb-4 gap-2 sm:gap-3 md:gap-4">
            <div className="flex items-center justify-between">
                {/* Navigation Arrows */}
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => navigate(-1)}
                        className="w-8 h-8 bg-[rgba(0,0,0,0.5)] rounded-full flex items-center justify-center hover:bg-[rgba(0,0,0,0.8)] transition-colors cursor-pointer"
                    >
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button 
                        onClick={() => navigate(1)}
                        className="w-8 h-8 bg-[rgba(0,0,0,0.5)] rounded-full flex items-center justify-center hover:bg-[rgba(0,0,0,0.8)] transition-colors cursor-pointer"
                    >
                        <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3 sm:gap-4">
                    {!isAdminPage && (
                        <Link to="/add-song" className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold px-3.5 py-1.5 rounded-full text-xs hover:scale-105 transition-all shadow-md shrink-0">
                            Admin Console
                        </Link>
                    )}

                    {!isAuthenticated ? (
                        <>
                            <Link to="/signup" className="text-spotifyLightGray font-bold text-xs sm:text-[15px] hover:text-white transition-colors hover:scale-105 shrink-0">
                                Sign up
                            </Link>
                            <Link to="/login" className="bg-spotifyGreen text-black font-bold px-4 sm:px-8 py-2 sm:py-[14px] rounded-full text-xs sm:text-[15px] hover:scale-105 hover:bg-[#3be477] transition-all shadow-[0_0_15px_rgba(30,215,96,0.4)] shrink-0">
                                Log in
                            </Link>
                        </>
                    ) : (
                        <>
                            <button className="hidden md:flex items-center gap-1 bg-spotifyGreen text-black text-sm font-bold px-4 py-1.5 rounded-full hover:scale-105 transition-transform hover:bg-[#3be477] shadow-[0_0_15px_rgba(30,215,96,0.3)]">
                                Explore Premium
                            </button>
                            <button className="hidden md:flex items-center gap-1 bg-[rgba(0,0,0,0.5)] text-white text-sm font-bold px-4 py-1.5 rounded-full hover:scale-105 transition-transform">
                                <ArrowDownCircle className="w-4 h-4" /> Install App
                            </button>
                            <div className="w-8 h-8 bg-[rgba(0,0,0,0.5)] flex items-center justify-center rounded-full hover:scale-105 transition-transform cursor-pointer">
                                <Bell className="w-4 h-4 text-white" />
                            </div>
                            <div className="w-8 h-8 bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center rounded-full hover:scale-105 transition-transform cursor-pointer border-[2px] border-[rgba(255,255,255,0.2)] p-4 shadow-lg group relative">
                                <span className="text-white text-sm font-bold drop-shadow-md">{user?.name ? user.name[0].toUpperCase() : 'U'}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
            
            {/* Feature Filter Pills - hidden on mobile */}
            <div className="hidden sm:flex items-center gap-2 mt-1">
                <button 
                    onClick={() => { setActiveFilter('all'); navigate('/'); }}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${activeFilter === 'all' ? 'bg-white text-black hover:bg-gray-200' : 'bg-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.05)]'}`}
                >
                    All
                </button>
                <button 
                    onClick={() => { setActiveFilter('music'); navigate('/'); }}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${activeFilter === 'music' ? 'bg-white text-black hover:bg-gray-200' : 'bg-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.05)]'}`}
                >
                    Music
                </button>
                <button 
                    onClick={() => { setActiveFilter('podcasts'); navigate('/'); }}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${activeFilter === 'podcasts' ? 'bg-white text-black hover:bg-gray-200' : 'bg-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.05)]'}`}
                >
                    Podcasts
                </button>
                <button 
                    onClick={() => { setActiveFilter('audiobooks'); navigate('/'); }}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${activeFilter === 'audiobooks' ? 'bg-white text-black hover:bg-gray-200' : 'bg-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.05)]'}`}
                >
                    Audiobooks
                </button>
            </div>
    </div>
  );
};

export default TopBar;
