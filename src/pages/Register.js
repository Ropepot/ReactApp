import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Register() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isActive, setIsActive] = useState(false);

    function registerUser(e) {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/`, {

            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                password: password
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.message === "Registered Successfully") {
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setMobileNo('');
                    setPassword('');
                    setConfirmPassword('');

                    Swal.fire({
                        title: "Registered Successfully",
                        icon: "success",
                        text: "Welcome to ByteBlitz!"
                    })
                        .then(() => {
                            navigate("/users/login")
                        })
                } else if (data.error === "Email invalid") {
                    Swal.fire({
                        title: "Invalid Email",
                        icon: "error",
                        text: "Check the email you provided."
                    })
                } else if (data.error === "Mobile number invalid") {
                    Swal.fire({
                        title: "Invalid Mobile Number",
                        icon: "error",
                        text: "Check the mobile number provided."
                    })
                } else if (data.error === "Password must be atleast 8 characters") {
                    Swal.fire({
                        title: "Invalid Password",
                        icon: "error",
                        text: "Password must be atleast 8 characters"
                    })
                } else {
                    Swal.fire({
                        title: "Error",
                        icon: "error",
                        text: "Something went wrong"
                    })
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        setIsActive(firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password !== "" && confirmPassword !== "" && password === confirmPassword);
    }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

    return (
        (user.id !== null) ?
            <Navigate to="/products" />
            :
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Form onSubmit={(e) => registerUser(e)}>
                            <h1 className="my-5 text-center">Register</h1>
                            <Form.Group>
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter First Name"
                                    required
                                    value={firstName}
                                    onChange={e => { setFirstName(e.target.value) }}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="mt-2">Last Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Last Name"
                                    required
                                    value={lastName}
                                    onChange={e => { setLastName(e.target.value) }}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="mt-2">Email:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Email"
                                    required
                                    value={email}
                                    onChange={e => { setEmail(e.target.value) }}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="mt-2">Mobile No:</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter 11 Digit Number"
                                    required
                                    value={mobileNo}
                                    onChange={e => { setMobileNo(e.target.value) }}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="mt-2">Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter Password"
                                    required
                                    value={password}
                                    onChange={e => { setPassword(e.target.value) }}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="mt-2">Confirm Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    required
                                    value={confirmPassword}
                                    onChange={e => { setConfirmPassword(e.target.value) }}
                                />
                            </Form.Group>
                            {/*conditionally render submit button based on isActive state, the current state of the isActive is false*/}
                            {isActive ?
                                <Button variant="warning" type="submit" className="mt-3" style={{ width: "100%" }}>Register</Button>
                                :
                                <Button variant="danger" type="submit" disabled className="mt-3" style={{ width: "100%" }}>Register</Button>
                            }
                            <Form.Group className="mt-3 text-center text-decoration-none">
                                <Form.Label>
                                    Already have an account?{' '}
                                    <Link to="/users/login" className="text-decoration-none">Click here</Link> to login.
                                </Form.Label>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
    )
}
