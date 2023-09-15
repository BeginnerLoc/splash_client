import React, { createContext, useEffect, useState } from 'react';
// Create a new context object
export const AudioContext = createContext();

// Create a provider component for the AudioContext
export const AudioProvider = ({ children }) => {
;
    const [audioUrl, setAudioUrl] = useState(null);
    const [username, setUsername] = useState('');


    const handleSetAudioUrl = (audioUrl) => {
        setAudioUrl(audioUrl)
    }

    const handleSetUsername = (username) => {
        setUsername(username)
    }

    return (
        <AudioContext.Provider value={{ audioUrl, handleSetAudioUrl, handleSetUsername, username}}>
            {children}
        </AudioContext.Provider>
    );
};