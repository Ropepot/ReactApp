import { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import UserContext from '../UserContext';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isActive, setIsActive] = useState(true);

    function authenticate(e) {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (typeof data.access !== "undefined") {
                    localStorage.setItem('token', data.access);
                    retrieveUserDetails(data.access)

                    Swal.fire({
                        title: "Login Successful",
                        icon: "success",
                        text: "Welcome to ByteBlitz!"
                    })
                } else if (data.error === "No Email Found") {
                    Swal.fire({
                        title: "Email not found.",
                        icon: "error",
                        text: "Check the email you provided."
                    })
                } else {
                    Swal.fire({
                        title: "Login failed",
                        icon: "error",
                        text: "Check your login details and try again."
                    })
                }
            })
        setEmail('');
        setPassword('');
    }

    const retrieveUserDetails = (token) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setUser({
                    id: data.user._id,
                    isAdmin: data.user.isAdmin
                })
            })
    };

    useEffect(() => {
        setIsActive(email !== '' && password !== '');
    }, [email, password]);

    return (
        (user.id !== null) ?
            <Navigate to="/" />
            :
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Form onSubmit={(e) => authenticate(e)}>
                            <h1 className="my-5 text-center">Login</h1>
                            <Form.Group controlId="userEmail">
                                <Form.Label>Email address:</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label className="mt-2">Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <div className="text-center">
                                {isActive ?
                                    <Button variant="warning" type="submit" id="submitBtn" className="mt-3" style={{ width: "100%" }}>
                                        Login
                                    </Button>
                                    :
                                    <Button variant="danger" type="submit" id="submitBtn" className="mt-3" style={{ width: "100%" }} disabled>
                                        Login
                                    </Button>
                                }
                            </div>
                            <Form.Group className="mt-3 text-center text-decoration-none">
                                <Form.Label>
                                    New customer?{' '}
                                    <Link to="/users/" className="text-decoration-none">Create your account</Link>
                                </Form.Label>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
    )
}
