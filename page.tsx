'use client';

import Matrix from '../components/Matrix';
import { useState } from 'react';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [messageType, setMessageType] = useState('Appointment Reminder');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    console.log(`Sending "${messageType}" to ${phone}`);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <>
      <Matrix />

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            color: '#000000',
            padding: '2rem',
            borderRadius: '12px',
            width: '400px',
            boxShadow: '0px 20px 50px rgba(0,0,0,0.6)',
            zIndex: 1000,
          }}
        >
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '1rem',
            }}
          >
            💬 Seven Tattoo Studio SMS Console
          </h1>

          <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 'bold' }}>
            Select Message Type:
          </label>
          <select
            value={messageType}
            onChange={(e) => setMessageType(e.target.value)}
            style={{
              width: '100%',
              padding: '.5rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
              marginBottom: '1rem',
            }}
          >
            <option>Appointment Reminder</option>
            <option>Healing Follow-up</option>
            <option>We Miss You</option>
          </select>

          <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 'bold' }}>
            Client Phone Number:
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1XXXXXXXXXX"
            style={{
              width: '100%',
              padding: '.5rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
              marginBottom: '1rem',
            }}
          />

          <button
            onClick={handleSend}
            style={{
              width: '100%',
              padding: '.75rem',
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '1rem',
            }}
          >
            Send SMS
          </button>

          {sent && (
            <div style={{ textAlign: 'center', color: 'green', fontWeight: 'bold' }}>
              ✅ Message sent!
            </div>
          )}
        </div>
      </div>
    </>
  );
}

