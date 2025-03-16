import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    const userData = {
      login,
      firstname,
      lastname,
      email,
      password,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        setError(errorMessage.error || 'Failed to register user');
        return;
      }

      // Si l'enregistrement est réussi, rediriger vers la page de connexion
      router.push('/login'); // Redirection vers la page de connexion

    } catch (error) {
      console.error('Error registering user:', error);
      setError('Failed to register user');
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.box}>
          <h1 style={styles.heading}>Sign Up</h1>
          <input
            type="text"
            placeholder="Login"
            style={styles.input}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            type="text"
            placeholder="First Name"
            style={styles.input}
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            style={styles.input}
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignup} style={styles.button}>
            Sign Up
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url(https://example.com/background-image.jpg)',
    marginTop: "100px" // Ajustez selon vos besoins de mise en page
  },
  box: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
    width: '80%', // Ajustez selon vos besoins de mise en page
    maxWidth: '600px', // Limitez la largeur si nécessaire
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    width: '100%',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    marginBottom: '15px',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
    textAlign: 'center',
  },
};

export default Index;
