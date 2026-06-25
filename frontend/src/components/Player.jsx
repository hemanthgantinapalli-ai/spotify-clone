import React, { useContext } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Maximize2, PlusCircle, Mic2, ListMusic, MonitorSpeaker, Heart } from 'lucide-react';
import { PlayerContext } from '../context/PlayerContext';

const Player = () => {
    const {
        track, playStatus, play, pause, time, seekBg, seekBar, seekSong,
        skipForward, skipPrevious, volume, changeVolume, isShuffle, toggleShuffle,
        likedSongs, toggleLikeSong
    } = useContext(PlayerContext);

    const isLiked = track ? likedSongs.includes(track._id) : false;

    return (
        <div className='glass-panel text-spotifyLightGray flex items-center justify-between px-4 z-50 select-none h-full w-full rounded-tl-xl rounded-tr-xl border-t border-[rgba(255,255,255,0.05)] shadow-[0_-10px_30px_rgba(0,0,0,0.3)]'>

            {/* Left Area - Dynamic Song Metadata (Scales down on mobile) */}
            <div className='flex items-center gap-3 w-[50%] md:w-[30%] min-w-0'>
                {track ? (
                    <>
                        <img className='w-10 h-10 md:w-14 md:h-14 object-cover rounded shadow-lg animate-pulse-slow shrink-0' src={track.image} alt={track.name} />
                        <div className="flex flex-col justify-center min-w-0">
                            <div className="flex items-center gap-1.5">
                                <p className='text-xs md:text-[15px] font-bold text-white hover:underline cursor-pointer truncate drop-shadow-md'>{track.name}</p>
                                {playStatus && (
                                    <div className="hidden sm:flex items-end gap-0.5 h-3.5 w-3.5 shrink-0">
                                        <div className="eq-bar"></div>
                                        <div className="eq-bar"></div>
                                        <div className="eq-bar"></div>
                                        <div className="eq-bar"></div>
                                    </div>
                                )}
                            </div>
                            <p className='text-[10px] md:text-xs text-[rgba(255,255,255,0.7)] hover:text-white hover:underline cursor-pointer truncate mt-0.5'>{track.desc}</p>
                        </div>
                        {/* Interactive Like/Heart Button */}
                        <Heart 
                            onClick={() => toggleLikeSong(track._id)}
                            className={`w-4 h-4 md:w-5 md:h-5 ml-2 cursor-pointer hover:scale-115 transition-all drop-shadow-md shrink-0 ${isLiked ? 'text-spotifyGreen fill-spotifyGreen' : 'hover:text-white'}`} 
                        />
                    </>
                ) : (
                    <div className='text-xs text-[rgba(255,255,255,0.5)] italic pl-2'>No track selected</div>
                )}
            </div>

            {/* Center Area - Playback Engine Controls */}
            <div className='flex flex-col items-center justify-center gap-1.5 w-[50%] md:w-[40%] max-w-[722px]'>
                <div className='flex gap-4 md:gap-5 items-center'>
                    <Shuffle
                        onClick={toggleShuffle}
                        className={`w-4 h-4 md:w-5 md:h-5 cursor-pointer transition-all hover:scale-110 ${isShuffle ? 'text-spotifyGreen drop-shadow-[0_0_8px_rgba(30,215,96,0.6)]' : 'text-spotifyLightGray hover:text-white'}`}
                    />

                    <SkipBack onClick={skipPrevious} className='w-4.5 h-4.5 md:w-6 md:h-6 cursor-pointer text-spotifyLightGray hover:text-white transition-all hover:scale-110 fill-current drop-shadow-md' />

                    {playStatus ? (
                        <div onClick={pause} className='w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.3)] text-black'>
                            <Pause className='w-4 h-4 md:w-5 md:h-5 text-black fill-black' />
                        </div>
                    ) : (
                        <div onClick={play} className='w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.3)] text-black'>
                            <Play className='w-4 h-4 md:w-5 md:h-5 text-black fill-black ml-0.5' />
                        </div>
                    )}

                    <SkipForward onClick={skipForward} className='w-4.5 h-4.5 md:w-6 md:h-6 cursor-pointer text-spotifyLightGray hover:text-white transition-all hover:scale-110 fill-current drop-shadow-md' />
                    
                    <Repeat className='w-4 h-4 md:w-5 md:h-5 cursor-pointer text-spotifyLightGray hover:text-white transition-all hover:scale-110' />
                </div>

                {/* Dynamic Connected Progress Slider (Hidden on extra small devices) */}
                <div className='hidden sm:flex items-center gap-2 w-full max-w-[600px] text-xs text-[rgba(255,255,255,0.7)] font-medium'>
                    <p className="min-w-[40px] text-right">{time.currentTime.minute}:{time.currentTime.second}</p>
                    <div ref={seekBg} onClick={seekSong} className='w-full bg-[rgba(255,255,255,0.1)] rounded-full cursor-pointer h-[5px] group relative flex items-center'>
                        <div ref={seekBar} className='bg-white h-full rounded-full w-0 group-hover:bg-spotifyGreen transition-colors relative'>
                            <div className="absolute right-[-6px] top-[-3.5px] w-3 h-3 bg-white rounded-full hidden group-hover:block shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                        </div>
                    </div>
                    <p className="min-w-[40px]">{time.totalTime.minute}:{time.totalTime.second}</p>
                </div>
            </div>

            {/* Right Area - Responsive Sound Level (Hidden on mobile) */}
            <div className='hidden md:flex items-center gap-4 w-[30%] justify-end text-spotifyLightGray pr-4'>
                <Mic2 className="w-[18px] h-[18px] cursor-pointer hover:text-white hover:scale-110 transition-all drop-shadow-sm" />
                <ListMusic className="w-[18px] h-[18px] cursor-pointer hover:text-white hover:scale-110 transition-all drop-shadow-sm" />
                <MonitorSpeaker className="w-[18px] h-[18px] cursor-pointer hover:text-white hover:scale-110 transition-all drop-shadow-sm" />
                <div className="flex items-center gap-2 ml-1">
                    <Volume2 className='w-5 h-5 cursor-pointer hover:text-white transition-colors drop-shadow-sm' />
                    {/* Interactive Volume Range Slider */}
                    <div className="w-[100px] flex items-center">
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={changeVolume}
                            className='w-full h-[5px] bg-[rgba(255,255,255,0.1)] rounded-lg appearance-none cursor-pointer volume-slider group'
                        />
                    </div>
                </div>
                <Maximize2 className='w-[18px] h-[18px] cursor-pointer hover:text-white hover:scale-110 transition-all ml-1 drop-shadow-sm' />
            </div>
        </div>
    );
};

export default Player;