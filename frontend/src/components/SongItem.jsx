import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { Play } from 'lucide-react';

const SongItem = ({ image, name, desc, id, file }) => {
    const { playWithId } = useContext(PlayerContext);

    return (
        <div onClick={() => playWithId({ name, image, desc, id, file })} className='min-w-[180px] p-4 rounded-xl cursor-pointer glass-panel hover:bg-[rgba(255,255,255,0.1)] hover:-translate-y-2 transition-all duration-300 group shadow-lg hover:shadow-2xl'>
            <div className='relative mb-4 shadow-[0_8px_24px_rgba(0,0,0,0.5)] overflow-hidden rounded-lg'>
                <img className='w-full object-cover aspect-square rounded-lg group-hover:scale-105 transition-transform duration-500' src={image} alt={name} />
                <div className="absolute bottom-2 right-2 w-12 h-12 bg-spotifyGreen rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:scale-105 hover:bg-[#3be477]">
                    <Play className="w-6 h-6 text-black fill-black ml-1" />
                </div>
            </div>
            <p className='font-bold mt-2 truncate text-[16px] text-white drop-shadow-sm'>{name}</p>
            <p className='text-[rgba(255,255,255,0.7)] text-sm line-clamp-2 mt-1 font-medium'>{desc}</p>
        </div>
    );
};

export default SongItem;