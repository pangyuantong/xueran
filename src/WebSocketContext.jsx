import React, { createContext, useContext, useEffect, useState } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;

import axios from 'axios';
 
// Create a context
const WebSocketContext = createContext(null);

// Define a provider for the WebSocket context
export const WebSocketProvider = ({ children }) => {
    const [echo, setEcho] = useState(null);

    useEffect(() => {
        const setupWebSocket = async () => {
            // Setting up axios defaults
            axios.defaults.baseURL = 'http://portal.test'; // your Laravel backend URL
            axios.defaults.withCredentials = true;

            // Retrieve CSRF token
            await axios.get('/sanctum/csrf-cookie').then(response => {
                console.log('CSRF token retrieved and set');
            }).catch(error => {
                console.error('Error fetching CSRF token:', error);
            });

            // Setting up Pusher and Echo
            const echoInstance = new Echo({
                broadcaster: 'reverb',
                key: import.meta.env.VITE_REVERB_KEY ?? 'k7y03ptdfmrrpcdblzli',
                wsHost: import.meta.env.VITE_REVERB_HOST ?? 'localhost',
                wsPort: parseInt(import.meta.env.VITE_REVERB_PORT ?? '8080'),
                wssPort: parseInt(import.meta.env.VITE_REVERB_PORT ?? '8080'),
                forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
                enabledTransports: ['ws', 'wss'],
                withCredentials: true,
                authorizer: (channel, options) => {
                    return {
                        authorize: (socketId, callback) => {
                            const token = getToken();
                            axios.post(`/api/broadcasting/auth`, {
                                socket_id: socketId,
                                channel_name: channel.name,
                            }, {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') // Fetching the CSRF token from cookies
                                }
                            })
                            .then(response => {
                                callback(null, response.data);
                            })
                            .catch(error => {
                                callback(true, error);
                            });
                        }
                    };
                },
            });

            setEcho(echoInstance);
        };

        setupWebSocket();

        // Cleanup on unmount
        return () => {
            if (echo) echo.disconnect();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={echo}>
            {children}
        </WebSocketContext.Provider>
    );
};

// Hook to use the WebSocket context
export const useWebSocket = () => useContext(WebSocketContext);

// Helper function to get the token
function getToken() {
    // This should ideally fetch a dynamic token from your authentication mechanism
    return '322|Vfyb1z9wqueyKyOFIZMAxa6y4fmBIh3qlTv7wruR3aa2f7d6';
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}