import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const AdminNav = () => {
    return (
        <div className='flex flex-wrap items-center justify-between gap-4 border-b border-zinc-700 pb-4 mb-6 text-sm font-semibold'>
            <div className='flex gap-4 flex-wrap'>
                <NavLink to="/add-song" className={({ isActive }) => isActive ? 'text-spotifyGreen border-b-2 border-spotifyGreen pb-1' : 'text-zinc-400 hover:text-white'}>
                    Add Song
                </NavLink>
                <NavLink to="/add-album" className={({ isActive }) => isActive ? 'text-spotifyGreen border-b-2 border-spotifyGreen pb-1' : 'text-zinc-400 hover:text-white'}>
                    Add Album
                </NavLink>
                <NavLink to="/list-song" className={({ isActive }) => isActive ? 'text-spotifyGreen border-b-2 border-spotifyGreen pb-1' : 'text-zinc-400 hover:text-white'}>
                    Songs List
                </NavLink>
                <NavLink to="/list-album" className={({ isActive }) => isActive ? 'text-spotifyGreen border-b-2 border-spotifyGreen pb-1' : 'text-zinc-400 hover:text-white'}>
                    Albums List
                </NavLink>
            </div>
            <Link to="/" className="bg-white text-black font-bold px-4 py-1.5 rounded-full text-xs hover:scale-105 transition-all shadow-md shrink-0">
                Back to Music Player 🎵
            </Link>
        </div>
    );
};

export default AdminNav;