import React, { createContext, useRef, useState, useEffect } from 'react';
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
    const audioRef = useRef(new Audio());
    const seekBg = useRef(null);
    const seekBar = useRef(null);

    const url = 'http://localhost:5000';

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [track, setTrack] = useState(null);
    const [user, setUser] = useState(null);
    const [playStatus, setPlayStatus] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [volume, setVolume] = useState(0.6);
    const [likedSongs, setLikedSongs] = useState([]); // Liked Songs array (IDs)
    const [activeFilter, setActiveFilter] = useState('all'); // Filter category state ('all', 'music', 'podcasts', 'audiobooks')
    const [time, setTime] = useState({
        currentTime: { second: '00', minute: '0' },
        totalTime: { second: '00', minute: '0' }
    });

    const play = () => {
        if (audioRef.current.src) {
            audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };

    const playWithId = async (item) => {
        setTrack(item);
        audioRef.current.src = item.file;
        audioRef.current.volume = volume;
        await audioRef.current.play();
        setPlayStatus(true);
    };

    const skipForward = async () => {
        if (songsData.length === 0) return;
        if (isShuffle) {
            const randomIndex = Math.floor(Math.random() * songsData.length);
            await playWithId(songsData[randomIndex]);
        } else {
            const currentIndex = songsData.findIndex((item) => item._id === track?._id);
            if (currentIndex !== -1 && currentIndex < songsData.length - 1) {
                await playWithId(songsData[currentIndex + 1]);
            }
        }
    };

    const skipPrevious = async () => {
        const currentIndex = songsData.findIndex((item) => item._id === track?._id);
        if (currentIndex > 0) {
            await playWithId(songsData[currentIndex - 1]);
        }
    };

    const changeVolume = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const toggleShuffle = () => {
        setIsShuffle(prev => !prev);
    };

    const seekSong = (e) => {
        if (audioRef.current.src && audioRef.current.duration) {
            const totalWidth = seekBg.current.offsetWidth;
            const clickPosition = e.nativeEvent.offsetX;
            audioRef.current.currentTime = (clickPosition / totalWidth) * audioRef.current.duration;
        }
    };

    // Liked Songs persistence
    useEffect(() => {
        const key = user?._id ? `likedSongs_${user._id}` : 'likedSongs_guest';
        const stored = localStorage.getItem(key);
        if (stored) {
            try {
                setLikedSongs(JSON.parse(stored));
            } catch (e) {
                setLikedSongs([]);
            }
        } else {
            setLikedSongs([]);
        }
    }, [user]);

    const toggleLikeSong = (songId) => {
        if (!songId) return;
        const key = user?._id ? `likedSongs_${user._id}` : 'likedSongs_guest';
        setLikedSongs(prev => {
            const updated = prev.includes(songId)
                ? prev.filter(id => id !== songId)
                : [...prev, songId];
            localStorage.setItem(key, JSON.stringify(updated));
            return updated;
        });
    };

    // Fetch songs from backend
    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            const songs = response.data.songs;
            setSongsData(songs);
            // Only set default track if none is currently playing
            setTrack(prev => {
                if (!prev && songs.length > 0) return songs[0];
                return prev;
            });
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };

    // Fetch albums from backend
    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            setAlbumsData(response.data.albums);
        } catch (error) {
            console.error('Error fetching albums:', error);
        }
    };

    // Expose these so AddSong/AddAlbum pages can refresh the list after upload
    const refreshSongs = getSongsData;
    const refreshAlbums = getAlbumsData;

    // Load data on mount
    useEffect(() => {
        getSongsData();
        getAlbumsData();
    }, []);

    // Audio time tracking
    useEffect(() => {
        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            if (!isNaN(audio.duration)) {
                if (seekBar.current) {
                    seekBar.current.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
                }
                setTime({
                    currentTime: {
                        second: String(Math.floor(audio.currentTime % 60)).padStart(2, '0'),
                        minute: String(Math.floor(audio.currentTime / 60))
                    },
                    totalTime: {
                        second: String(Math.floor(audio.duration % 60)).padStart(2, '0'),
                        minute: String(Math.floor(audio.duration / 60))
                    }
                });
            }
        };

        const handleAudioEnded = () => { skipForward(); };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleAudioEnded);
        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleAudioEnded);
        };
    }, [track, songsData, isShuffle]);

    // Restore logged-in user from localStorage on app start
    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser && storedUser !== 'undefined') {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
    }, []);

    const isAuthenticated = !!user;
    const isAdmin = user?.role === 'admin';

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const contextValue = {
        audioRef, seekBg, seekBar,
        user, setUser, isAuthenticated, isAdmin, logout,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause, playWithId, seekSong,
        skipForward, skipPrevious,
        songsData, albumsData,
        refreshSongs, refreshAlbums,
        volume, changeVolume,
        isShuffle, toggleShuffle,
        likedSongs, toggleLikeSong,
        activeFilter, setActiveFilter,
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;