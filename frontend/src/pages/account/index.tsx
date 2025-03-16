import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const Account = () => {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState<any>({});
  const [showReconnectModal, setShowReconnectModal] = useState(false);
  const [reconnectMessage, setReconnectMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          console.error('No access token available');
          return;
        }

        const response = await axios.get('http://localhost:8000/api/users', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUser(response.data);
        setEditUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('No access token available');
        return;
      }

      await axios.put('http://localhost:8000/api/users', editUser, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setUser(editUser);
      setIsEditing(false);

      if (editUser.password || editUser.email !== user.email) {
        const message = editUser.password
          ? 'You have successfully updated your password. Please log in again with your new password.'
          : 'You have successfully updated your email. Please log in again with your new email.';

        setReconnectMessage(message);
        setShowReconnectModal(true);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleModalClose = () => {
    setShowReconnectModal(false);
    localStorage.removeItem('accessToken');
    router.push('/login');
  };

  return (
    <>
      <Navbar />
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <h1 style={styles.title}>Account Information</h1>
          {user ? (
            <div style={styles.userInfo}>
              <p>
                <strong>Email:</strong>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editUser.email}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                ) : (
                  user.email
                )}
              </p>
              <p>
                <strong>First Name:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstname"
                    value={editUser.firstname}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                ) : (
                  user.firstname
                )}
              </p>
              <p>
                <strong>Last Name:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastname"
                    value={editUser.lastname}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                ) : (
                  user.lastname
                )}
              </p>
              {isEditing && (
                <p>
                  <strong>Password:</strong>
                  <input
                    type="password"
                    name="password"
                    value={editUser.password || ''}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                </p>
              )}
              <div style={styles.editButtonContainer}>
                {isEditing ? (
                  <button onClick={handleSaveChanges} style={styles.saveButton}>
                    Save Changes
                  </button>
                ) : (
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    style={styles.editIcon}
                    onClick={() => setIsEditing(true)}
                  />
                )}
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <Modal show={showReconnectModal} onHide={handleModalClose} centered>
        <ModalHeader style={styles.modalHeader} closeButton>
          Update Successful
        </ModalHeader>
        <ModalBody style={styles.modalBody}>
          {reconnectMessage}
        </ModalBody>
        <ModalFooter style={styles.modalFooter}>
          <button onClick={handleModalClose} style={styles.modalButton}>
            OK
          </button>
        </ModalFooter>
      </Modal>
      <style jsx global>{`
        .modal-backdrop.show {
          opacity: 0.8 !important;
        }
      `}</style>
    </>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f0f0f0',
  },
  container: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: 'auto',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
  },
  userInfo: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
  },
  input: {
    width: '100%',
    padding: '8px',
    margin: '8px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  editButtonContainer: {
    textAlign: 'right',
  },
  saveButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  editIcon: {
    cursor: 'pointer',
    fontSize: '18px',
    color: '#007bff',
  },
  modalHeader: {
    backgroundColor: '#007bff',
    color: '#fff',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
  },
  modalBody: {
    textAlign: 'center',
    fontSize: '16px',
    padding: '20px',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'center',
  },
  modalButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Account;
