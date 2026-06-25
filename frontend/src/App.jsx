import React, { useContext } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Player from './components/Player';
import Display from './components/Display';
import AddSong from './pages/AddSong';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddAlbum from './pages/AddAlbum';

import ListSong from './pages/ListSong';
import ListAlbum from './pages/ListAlbum';
import { PlayerContext } from './context/PlayerContext';
import { Home, Search, Library } from 'lucide-react';

const App = () => {
  const { track } = useContext(PlayerContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Determine if we are viewing an admin control path
  const isAdminPage = location.pathname === '/add-song' ||
    location.pathname === '/add-album' ||
    location.pathname === '/list-song' ||
    location.pathname === '/list-album';

  return (
    <div className="h-screen w-screen bg-spotifyBase text-white font-sans overflow-hidden flex flex-col">
      {/* Upper Section (Sidebar + Main Content) */}
      <div className="flex flex-1 overflow-hidden p-2 gap-2 pb-0">
        {/* Sidebar (hidden on mobile, flex on desktop) */}
        {!isAdminPage && <Sidebar />}
        
        {/* Main Content Area */}
        <div className="flex-1 bg-spotifyBlack rounded-lg flex flex-col overflow-hidden relative">
          <TopBar />
          
          <div className="flex-1 overflow-y-auto relative">
            <div className="absolute top-4 right-6 z-50 flex gap-3">
              {isAdminPage ? (
                <Link to="/" className="bg-white text-black font-bold px-4 py-1.5 rounded-full text-xs hover:scale-105 transition-all shadow-md">
                  Back to Music Player 🎵
                </Link>
              ) : (
                <Link to="/add-song" className="bg-white text-black font-bold px-4 py-1.5 rounded-full text-xs hover:scale-105 transition-all shadow-md">
                  Admin Console
                </Link>
              )}
            </div>
            <Routes>
              <Route path="*" element={<Display />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/add-song" element={<AddSong />} />
              <Route path="/add-album" element={<AddAlbum />} />
              <Route path="/list-song" element={<ListSong />} />
              <Route path="/list-album" element={<ListAlbum />} />
            </Routes>
          </div>
        </div>
      </div>
      
      {/* Bottom Player Bar */}
      <div className="h-[90px] w-full bg-spotifyBase z-30">
        <Player />
      </div>

      {/* Mobile Bottom Navigation (Visible only on mobile devices) */}
      {!isAdminPage && (
        <div className="md:hidden h-[65px] w-full bg-spotifyBase/95 backdrop-blur-md border-t border-zinc-800/60 flex items-center justify-around text-spotifyGray z-30 pb-1">
          <Link 
            to="/" 
            className={`flex flex-col items-center gap-1 cursor-pointer transition-all active:scale-95 ${isActive('/') ? 'text-spotifyGreen font-bold' : 'text-zinc-400 hover:text-white'}`}
          >
            <Home className="w-5.5 h-5.5" />
            <span className="text-[10px]">Home</span>
          </Link>
          <Link 
            to="/search" 
            className={`flex flex-col items-center gap-1 cursor-pointer transition-all active:scale-95 ${isActive('/search') ? 'text-spotifyGreen font-bold' : 'text-zinc-400 hover:text-white'}`}
          >
            <Search className="w-5.5 h-5.5" />
            <span className="text-[10px]">Search</span>
          </Link>
          <Link 
            to="/library" 
            className={`flex flex-col items-center gap-1 cursor-pointer transition-all active:scale-95 ${isActive('/library') ? 'text-spotifyGreen font-bold' : 'text-zinc-400 hover:text-white'}`}
          >
            <Library className="w-5.5 h-5.5" />
            <span className="text-[10px]">Your Library</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default App;