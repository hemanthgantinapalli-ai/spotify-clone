import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNav = () => {
    return (
        <div className='flex gap-4 border-b border-zinc-700 pb-4 mb-6 text-sm font-semibold'>
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
    );
};

export default AdminNav;