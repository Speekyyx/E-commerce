import React from 'react';
import { FaGithub, FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <div>
      <footer style={styles.footer_design}>
        <div className='footer-content-container' style={styles.footer_content_container}>
          <div className='footer-content' style={styles.footer_content}>
            <ul>
              <li>
                <a href="https://github.com/EpitechMscProPromo2026/T-WEB-600-BDX_7" target='_blank' className='github_a' style={styles.a}>GitHub</a>
              </li>
            </ul>
          </div>
          <div style={styles.footer_content}>
            <ul>
              <div>Product</div>
              <br />
              <li style={styles.li_content}>
                <a href="" style={styles.a}>Features</a>
              </li>
              <li style={styles.li_content}>
                <a href="" style={styles.a}>Security</a>
              </li>
              <li style={styles.li_content}>
                <a href="" style={styles.a}>Business</a>
              </li>
              <li style={styles.li_content}>
                <a href="" style={styles.a}>Case studies</a>
              </li>
              <li style={styles.li_content}>
                <a href="" style={styles.a}>Pricing</a>
              </li>
              <li style={styles.li_content}>
                <a href="" style={styles.a}>Resources</a>
              </li>
            </ul>
          </div>
          <div style={styles.footer_content}>
            <ul>
              <div>Explore</div>
              <br />
              <li style={styles.li_content}>
                <a href="" style={styles.a}>Developer</a>
              </li>
              <li style={styles.li_content}>
                <a href="" style={styles.a}>API</a>
              </li>
              <li style={styles.li_content}>
                <a href="" style={styles.a}>Partners</a>
              </li>
              <li style={styles.li_content}>
                <a href="" style={styles.a}>Atam</a>
              </li>
              <li style={styles.li_content}>
                <a href="" style={styles.a}>Electron</a>
              </li>
              <li style={styles.li_content}>
                <a href="" style={styles.a}>GitHub Desktop</a>
              </li>
            </ul>
          </div>
          <div style={styles.footer_content}>
            <ul>
              <div>Support</div>
              <br />
              <li style={styles.li_content}>
                <a href="" style={styles.a}>Help</a>
              </li>
              <li style={styles.li_content}>
                <a href="" style={styles.a}>Community</a>
              </li>
              <li style={styles.li_content}>
                <a href="" style={styles.a}>Forum</a>
              </li>
              <li style={styles.li_content}>
                <a href="" style={styles.a}>Training</a>
              </li>
              <li style={styles.li_content}>
                <a href="" style={styles.a}>Status</a>
              </li>
              <li style={styles.li_content}>
                <a href="" style={styles.a}>Contact GitHub</a>
              </li>
            </ul>
          </div>
          <div style={styles.footer_content}>
            <ul>
              <div>Company</div>
              <br />
              <li style={styles.li_content}>
                <a href="#" style={styles.a}>About</a>
              </li>
              <li style={styles.li_content}>
                <a href="" style={styles.a}>Blog</a>
              </li>
              <li style={styles.li_content}>
                <a href="" style={styles.a}>Careers</a>
              </li>
              <li style={styles.li_content}>
                <a href="" style={styles.a}>Press</a>
              </li>
              <li style={styles.li_content}>
                <a href="" style={styles.a}>Shop</a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div style={styles.footerBottom}>
          <div className='bottomRight'>
            <div style={styles.footer_content}>
              <ul style={{ display: 'flex', alignItems: 'center', listStyleType: 'none', padding: 0 }}>
                <div>
                  &copy; Copyright 2024 HTML.am &nbsp;
                </div>
                <div style={{ marginRight: '10px' }}>
                  <li>
                    <a href="" style={styles.a}>Termes</a>
                  </li>
                </div>
                <div>
                  <li>
                    <a href="" style={styles.a}>Privacy</a>
                  </li>
                </div>
              </ul>
            </div>
          </div>
          <div className='bottomLeft'>
            <div style={styles.footer_content}>
              <ul style={{ display: 'flex', alignItems: 'center', listStyleType: 'none', padding: 8 }}>
                <li>
                  <a href="https://www.facebook.com/" target='_blank' style={styles.a}>
                    <FaFacebook size={20} style={{ marginRight: '10px' }} />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/" target='_blank' style={styles.a}>
                    <FaLinkedin size={20} style={{ marginRight: '10px' }} />
                  </a>
                </li>
                <li>
                    <a href="https://www.youtube.com/watch?v=BBJa32lCaaY&ab_channel=LegacyPNDA" target='_blank' style={styles.a}>
                        <FaYoutube size={20} style={{ marginRight: '10px' }} />
                    </a>
                </li>
                <li>
                  <a href="https://www.github.com/" target='_blank' style={styles.a}>
                    <FaGithub size={20} style={{ marginRight: '10px' }} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

type TextAlign = 'left' | 'right' | 'center' | 'justify';

const styles = {
  footerContainer: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  
  footer_design: {
    backgroundImage: "url('https://www.amd.com/content/dam/amd/en/images/backgrounds/abstract/black-grey-angles-gradient-texture-background.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '330px',
    textAlign: 'center' as TextAlign,
    flex: '1', // Utilisation de flex pour pousser le footer en bas de la page
  },

  footer_content_container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    padding: "20px"
  },

  footer_content: {
    color: '#fff',
  },

  ul: {
    listStyleType: 'none',
    textAlign: 'left',
  },

  a: {
    textDecoration: 'none',
    color: 'rgb(152, 152, 152)',
  },

  'a:hover': {
    color: '#ffffff',
  },

  li_content: {
    marginBottom: '10px',
  },

  github_a: {
    color: '#fff',
  },

  footerBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#000',
  },

  hr: {
    border: '0',
    height: '1px',
    background: '#333',
    backgroundImage: 'linear-gradient(to right, #ccc, #333, #ccc)',
  },
};



export default Footer;
