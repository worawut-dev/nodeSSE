import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ExchangeTable from './ExchangeTable';

const Demo = () => {
  const [exchangeData, setExchangeData] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const eventSourceRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const updateExchangeData = (newData) => {
    setExchangeData((prevData) => [newData, ...prevData]);
  };

  const connectToEventSource = () => {
    const source = new EventSource('http://localhost:8080/events');
    source.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      updateExchangeData(newData);
    };
    source.onerror = () => {
      console.error('Error with EventSource');
      source.close();
      setConnectionStatus('disconnected');
      reconnect();
    };
    return source;
  };

  const reconnect = () => {
    if (!reconnectTimeoutRef.current && connectionStatus !== 'stopping') {
      reconnectTimeoutRef.current = setTimeout(() => {
        setConnectionStatus('reconnecting');
        eventSourceRef.current = connectToEventSource();
        setConnectionStatus('connected');
        reconnectTimeoutRef.current = null;
      }, 3000); // Attempt to reconnect after 3 seconds
    }
  };

  useEffect(() => {
    if (connectionStatus === 'connecting') {
      eventSourceRef.current = connectToEventSource();
      setConnectionStatus('connected');
    } else if (connectionStatus === 'stopping' && eventSourceRef.current) {
      eventSourceRef.current.close();
      setConnectionStatus('disconnected');
    }
  }, [connectionStatus]);

  const handleConnectEvent = () => {
    if (connectionStatus === 'disconnected') {
      setExchangeData([]);
      setConnectionStatus('connecting');
    }
  };

  const handleStopEvent = () => {
    if (connectionStatus === 'connected') {
      setConnectionStatus('stopping');
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1>Exchange Rate / USD To Bath</h1>
        <button onClick={handleConnectEvent} disabled={connectionStatus !== 'disconnected'}>
          Connect SSE
        </button>
        <button onClick={handleStopEvent} disabled={connectionStatus !== 'connected'}>
          Stop SSE
        </button>
        {connectionStatus === 'connected' ? (
          <ExchangeTable data={exchangeData} />
        ) : (
          <h1>{`Server send event ${connectionStatus === 'connecting' ? 'connecting' : 'not connected'}`}</h1>
        )}
      </div>
    </div>
  );
};

export default Demo;



