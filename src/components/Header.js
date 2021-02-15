import { Container, Nav, Navbar } from 'react-bootstrap';
import {
  FaUserPlus,
  FaAddressBook,
  FaSignInAlt,
  FaSignOutAlt,
  FaHome,
} from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      bg='primary'
      fixed='top'
      defaultExpanded='false'
    >
      <Container>
        <LinkContainer
          to='/'
          style={{
            color: 'white',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Navbar.Brand>
            <FaAddressBook /> Contact Keeper
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav' style={{ color: 'white' }}>
          <Nav className='ml-auto'>
            <LinkContainer
              to='/'
              style={{ color: 'white', display: 'flex', alignItems: 'center' }}
            >
              <Nav.Link>
                <FaHome /> Home
              </Nav.Link>
            </LinkContainer>

            <Nav.Link
              style={{ color: 'white', display: 'flex', alignItems: 'center' }}
              href='#about'
            >
              About
            </Nav.Link>

            <LinkContainer
              to='/login'
              style={{ color: 'white', display: 'flex', alignItems: 'center' }}
            >
              <Nav.Link>
                <FaSignInAlt /> Login
              </Nav.Link>
            </LinkContainer>

            <Nav.Link
              style={{ color: 'white', display: 'flex', alignItems: 'center' }}
              href='#register'
            >
              <FaUserPlus /> Register
            </Nav.Link>

            <Nav.Link
              style={{ color: 'white', display: 'flex', alignItems: 'center' }}
              href='#logout'
            >
              <FaSignOutAlt />
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
