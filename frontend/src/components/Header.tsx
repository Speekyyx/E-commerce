// Header.tsx
import React from 'react';

function Header() {
  return (
    <div style={styles.header}>
      {/* Contenu du header */}
    </div>
  );
};

const styles = {
  header: {
    backgroundImage: "url('https://www.amd.com/content/dam/amd/en/images/backgrounds/abstract/black-grey-angles-gradient-texture-background.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: '24px',
    top: '0',
    width: '100%',
    position: 'absolute',
    zIndex: '900', // Réduisez le z-index
  },
};


export default Header;
