import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Library, Plus, ArrowRight, Heart, Mic, FolderHeart } from 'lucide-react';
import { PlayerContext } from '../context/PlayerContext';
import appLogo from '../assets/app-logo.png';

const Sidebar = () => {
  const { isAuthenticated, user, logout, likedSongs, songsData } = useContext(PlayerContext);
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="hidden md:flex w-[320px] h-full flex-col gap-3 text-spotifyLightGray font-medium text-[15px] z-10 relative">

      {/* App Logo Banner */}
      <Link to="/" className="glass rounded-xl px-4 py-3 flex items-center gap-3 hover:bg-[rgba(255,255,255,0.05)] transition-all group">
        <img
          src={appLogo}
          alt="App Logo"
          className="w-10 h-10 rounded-xl object-cover shadow-[0_0_15px_rgba(30,215,96,0.4)] group-hover:shadow-[0_0_20px_rgba(30,215,96,0.6)] transition-shadow"
        />
        <div className="flex flex-col leading-tight">
          <span className="text-white font-extrabold text-[18px] tracking-tight drop-shadow-md">SoundWave</span>
          <span className="text-[#1ed760] text-[11px] font-semibold tracking-widest uppercase">Music Player</span>
        </div>
      </Link>

      {/* Top navigation box */}
      <div className="glass rounded-xl px-4 py-5 flex flex-col gap-6">
        <Link
          to="/"
          className={`flex items-center gap-5 transition-all duration-300 hover:text-white hover:translate-x-1 ${isActive('/') ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''}`}
        >
          <Home className="w-6 h-6" />
          <span>Home</span>
        </Link>
        <Link
          to="/search"
          className={`flex items-center gap-5 transition-all duration-300 hover:text-white hover:translate-x-1 ${isActive('/search') ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''}`}
        >
          <Search className="w-6 h-6" />
          <span>Search</span>
        </Link>
      </div>

      {/* Bottom box: Library & Features */}
      <div className="glass rounded-xl flex-1 flex flex-col pt-3 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 hover:text-white transition-colors duration-200 shadow-sm border-b border-[rgba(255,255,255,0.05)]">
          <Link
            to="/library"
            className={`flex items-center gap-3 transition-colors duration-200 hover:text-white ${isActive('/library') ? 'text-white' : ''}`}
          >
            <Library className="w-6 h-6" />
            <span className="font-bold">Your Library</span>
          </Link>
          <div className="flex items-center gap-1">
            <div className="p-2 hover:bg-[rgba(255,255,255,0.1)] hover:text-white rounded-full cursor-pointer transition-all">
              <Plus className="w-5 h-5" />
            </div>
            <div className="p-2 hover:bg-[rgba(255,255,255,0.1)] hover:text-white rounded-full cursor-pointer transition-all">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Chips to select filter/tabs directly */}
        <div className="flex gap-2 px-5 py-3 overflow-x-auto scrollbar-hide">
          <span 
            onClick={() => navigate('/library?tab=playlists')}
            className="glass-panel px-4 py-1.5 rounded-full text-xs text-white cursor-pointer hover:bg-[rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all"
          >
            Playlists
          </span>
          <span 
            onClick={() => navigate('/library?tab=podcasts')}
            className="glass-panel px-4 py-1.5 rounded-full text-xs text-white cursor-pointer hover:bg-[rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all"
          >
            Podcasts
          </span>
          <span 
            onClick={() => navigate('/library?tab=albums')}
            className="glass-panel px-4 py-1.5 rounded-full text-xs text-white cursor-pointer hover:bg-[rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all"
          >
            Albums
          </span>
        </div>

        <div className="flex-1 overflow-y-auto mt-2 px-3 pb-4">
          {/* List items linking to library tabs */}
          <div className="flex flex-col gap-2">
            <Link 
              to="/library?tab=liked"
              className="flex items-center gap-4 px-2 py-3 hover:bg-[rgba(255,255,255,0.05)] rounded-md cursor-pointer transition-all group"
            >
              <div className="w-12 h-12 rounded bg-gradient-to-br from-indigo-500 to-purple-400 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold text-[15px]">Liked Songs</span>
                <span className="text-xs text-spotifyLightGray mt-0.5">Playlist • {likedSongs ? likedSongs.length : 0} songs</span>
              </div>
            </Link>

            <Link 
              to="/library?tab=podcasts"
              className="flex items-center gap-4 px-2 py-3 hover:bg-[rgba(255,255,255,0.05)] rounded-md cursor-pointer transition-all group"
            >
              <div className="w-12 h-12 rounded bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold text-[15px]">Your Episodes</span>
                <span className="text-xs text-spotifyLightGray mt-0.5">Saved & downloaded</span>
              </div>
            </Link>

            <Link 
              to="/library?tab=local"
              className="flex items-center gap-4 px-2 py-3 hover:bg-[rgba(255,255,255,0.05)] rounded-md cursor-pointer transition-all group"
            >
              <div className="w-12 h-12 rounded bg-gradient-to-br from-gray-600 to-gray-400 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <FolderHeart className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold text-[15px]">Local Files</span>
                <span className="text-xs text-spotifyLightGray mt-0.5">Folder • {songsData ? songsData.length : 0} songs</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Auth / Action Section */}
        <div className="p-4 border-t border-[rgba(255,255,255,0.05)]">
          {!isAuthenticated ? (
            <div className="glass-panel rounded-xl p-4 flex flex-col items-center gap-4 text-center">
              <div>
                <p className="text-white font-bold mb-1 shadow-sm">Save your favorites</p>
                <p className="font-normal text-xs text-gray-300">Log in to create your library.</p>
              </div>
              <Link to="/login" className="bg-white text-black font-bold py-2 px-6 rounded-full hover:scale-105 transition-transform text-sm shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                Log In Now
              </Link>
            </div>
          ) : (
            <div className="glass-panel rounded-xl p-3 flex flex-col items-start gap-3">
              <div className="flex items-center gap-2 w-full justify-between">
                <span className="text-white font-medium drop-shadow-sm">Hi, {user?.name || 'User'}!</span>
                <button
                  onClick={logout}
                  className="bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] text-white px-3 py-1 text-xs rounded-full hover:bg-[rgba(255,255,255,0.2)] transition-colors cursor-pointer"
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;