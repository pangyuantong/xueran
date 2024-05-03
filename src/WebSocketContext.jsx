import React, { createContext, useContext, useEffect, useState } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;

import axios from 'axios';
import { fetchData, DOMAIN } from "./helpers";

// Create a context
const WebSocketContext = createContext(null);

// Define a provider for the WebSocket context
export const WebSocketProvider = ({ children }) => {
    const [echo, setEcho] = useState(null);

    useEffect(() => {
        const setupWebSocket = async () => {
            // Setting up axios defaults
            axios.defaults.baseURL = DOMAIN; // your Laravel backend URL

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
                encrypted: false,
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

            // Handle Pusher connection events
            echoInstance.connector.pusher.connection.bind('connected', () => {
                console.log('WebSocket connected!');
            });

            echoInstance.connector.pusher.connection.bind('disconnected', () => {
                console.log('WebSocket disconnected.');
            });

            setEcho(echoInstance);
        };

        setupWebSocket();

        // Cleanup on unmount
        return () => {
            echo.connector.pusher.connection.unbind('connected');
            echo.connector.pusher.connection.unbind('disconnected');
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
    return fetchData('_token');
}