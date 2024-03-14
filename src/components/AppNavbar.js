import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../UserContext';

export default function AppNavbar() {
    const { user } = useContext(UserContext);
    console.log(user._id)
    return (
        <Navbar bg="*" expand="lg" className="sticky-top">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" style={{ fontWeight: 'bold' }} className="text-primary">ByteBlitz</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" className="text-primary">Home</Nav.Link>
                        {user.id === null ? (
                            <>
                                <Nav.Link as={Link} to="/products" className="text-primary">Products</Nav.Link>
                                <Nav.Link as={Link} to="/users/" className="text-primary">Register</Nav.Link>
                                <Nav.Link as={Link} to="/users/login" className="text-primary">Login</Nav.Link>
                            </>
                        ) : (
                            <>
                                {user.isAdmin ? (
                                    <>
                                        <Nav.Link as={Link} to="/products" className="text-primary">Dashboard</Nav.Link>
                                        <Nav.Link as={Link} to="/products/addProduct" className="text-primary">Add Product</Nav.Link>
                                        <Nav.Link as={Link} to="/orders/all-orders" className="text-primary">Orders History</Nav.Link>
                                        <Nav.Link as={Link} to="/users/details" className="text-primary">Account</Nav.Link>
                                        <Nav.Link as={Link} to="/users/logout" className="text-primary">Logout</Nav.Link>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link as={Link} to="/products" className="text-primary">Products</Nav.Link>
                                        <Nav.Link as={Link} to="/carts" className="text-primary">Cart</Nav.Link>
                                        <Nav.Link as={Link} to="/orders/my-orders" className="text-primary">Orders</Nav.Link>
                                        <Nav.Link as={Link} to="/users/details" className="text-primary">Account</Nav.Link>
                                        <Nav.Link as={Link} to="/users/logout" className="text-primary">Logout</Nav.Link>
                                    </>
                                )}
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}