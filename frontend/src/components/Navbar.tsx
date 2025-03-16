import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import axios from 'axios';

import {
  faShoppingCart,
  faUser,
  faSearch,
  faLanguage,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

interface NavbarProps {
  category: string;
  products: any[];
}

const Navbar: React.FC<NavbarProps> = ({ category, products }) => {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkLoggedInStatus();
  }, []);

  const checkLoggedInStatus = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const response = await axios.get('http://localhost:8000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleInputChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSearchSubmit = () => {
    const product = products.find((product) => product.name.toLowerCase().includes(searchValue.toLowerCase()));

    if (product) {
      console.log('Product found:', product);
      router.push(`/products/${product.category}/${product.id}`);
    } else {
      console.log('Product not found');
    }

    setSearchValue('');
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('cartItems');
    setIsLoggedIn(false);
    setUser(null);
    setShowAccountModal(false);
  };

  const handleAccountModalClose = () => {
    setShowAccountModal(false);
  };

  const handleAccessAccount = () => {
    router.push('/account');
    setShowAccountModal(false);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  const handleProductSelection = (category: string) => {
    router.push(`/products/${category}`);
    setShowProductsDropdown(false);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.navbarBrand}>
          <a href="/" style={styles.navbarLogo}>
            E-COMMERCE
          </a>
        </div>
        <div style={styles.navbarMenu}>
          <Dropdown isOpen={showProductsDropdown} toggle={() => setShowProductsDropdown(!showProductsDropdown)}>
            <DropdownToggle style={{ backgroundColor: '#000', color: '#fff', border: 'none', paddingRight: '10px' }}>
              Products
              <span className="dropdown-arrow"></span>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => handleProductSelection('cpu')}>CPU</DropdownItem>
              <DropdownItem onClick={() => handleProductSelection('gpu')}>GPU</DropdownItem>
              <DropdownItem onClick={() => handleProductSelection('motherboards')}>Motherboards</DropdownItem>
              <DropdownItem onClick={() => handleProductSelection('ram')}>RAM</DropdownItem>
              <DropdownItem onClick={() => handleProductSelection('ssd')}>SSD</DropdownItem>
              <DropdownItem onClick={() => handleProductSelection('cooling')}>Cooling</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <a href="#" style={styles.navbarLink}>
            Solutions
          </a>
          <a href="#" style={styles.navbarLink}>
            Support
          </a>
          <a href="https://www.epitech.eu/" target="_blank" style={styles.navbarLink}>
            Company
          </a>
        </div>
      </div>
      <div>
        <ul style={styles.navbarMenu}>
          <li style={styles.navbarItem}>
            <Link href="/cart" passHref>
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
          </li>
          <li style={styles.navbarItem}>
            <a style={styles.navbarLink} onClick={toggleSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </a>
            {showSearch && (
              <div style={styles.searchBar}>
                <input
                  type="text"
                  placeholder={`Search ${category}`}
                  value={searchValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                />
                <button onClick={handleSearchSubmit}>Search</button>
              </div>
            )}
          </li>
          <li style={styles.navbarItem}>
            {isLoggedIn ? (
              <button onClick={() => setShowAccountModal(true)} style={styles.navbarLink}>
                Welcome back {user?.firstname}
              </button>
            ) : (
              <FontAwesomeIcon icon={faUser} onClick={() => setShowAccountModal(true)} style={{ cursor: 'pointer' }} />
            )}
          </li>
        </ul>
      </div>
      <Modal show={showAccountModal} onHide={handleAccountModalClose} style={styles.isConnectedModal}>
        <ModalHeader closeButton>{isLoggedIn ? `Welcome back ${user?.firstname}` : 'Login'}</ModalHeader>
        <ModalBody>
          {isLoggedIn ? (
            <>
              <button onClick={handleAccessAccount} style={styles.modalButton}>
                Access Account
              </button>
              <button onClick={handleLogout} style={styles.modalButton}>
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => router.push('/login')} style={styles.modalButton}>
              Login
            </button>
          )}
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </Modal>
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '80px',
    backgroundColor: '#000000',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    zIndex: '3000',
  },

  container: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },

  navbarBrand: {
    fontSize: '1.5rem',
    marginRight: '20px',
  },

  navbarLogo: {
    color: '#fff',
    textDecoration: 'none',
  },

  navbarMenu: {
    display: 'flex',
    alignItems: 'center',
  },

  navbarItem: {
    marginRight: '20px',
  },

  navbarLink: {
    color: '#fff',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    marginLeft: '20px',
  },

  searchBar: {
    position: 'absolute',
    top: 'calc(100% + 10px)',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    color: '#000',
  },

  modalButton: {
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
  isConnectedModal: {
    marginTop: "100px"
  }
};

export default Navbar;
