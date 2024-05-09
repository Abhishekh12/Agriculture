import React, { useState, useEffect } from 'react';
import WavyText from './WavyText';
import { RotateCcw } from 'react-feather';

const Welcome: React.FC = () => {
  const [replay, setReplay] = useState<boolean>(true);

  useEffect(() => {
    const replayTimeout = setTimeout(() => {
      setReplay(!replay);
      // Reset replay after 600 milliseconds
      setTimeout(() => setReplay(true), 600);
    }, 3000); // Change 3000 to the desired delay in milliseconds before auto-replay

    // Clear timeout on component unmount
    return () => clearTimeout(replayTimeout);
  }, [replay]); // Trigger effect whenever replay state changes

  return (
    <div
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/sunny-meadow-landscape_1112-134.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1714608000&semt=ais')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <a href="/Agriculture" style={{ textDecoration: 'none', color: 'inherit'  }}>
        <WavyText text="Welcome To Agriculture!" replay={replay} />
      </a>
    </div>
  );
};

export default Welcome;
