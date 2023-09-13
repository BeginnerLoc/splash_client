import React, { createContext, useEffect, useState } from 'react';
// Create a new context object
export const AudioContext = createContext();

// Create a provider component for the AudioContext
export const AudioProvider = ({ children }) => {
;
    const [audioUrl, setAudioUrl] = useState(null);

    const handleSetAudioUrl = (audioUrl) => {
        setAudioUrl(audioUrl)
    }

    return (
        <AudioContext.Provider value={{ audioUrl, handleSetAudioUrl}}>
            {children}
        </AudioContext.Provider>
    );
};