import React, { useState, useContext } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function UpdatePassword() {
    const { user } = useContext(UserContext);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'New password and confirm password do not match!',
            });
            return;
        }

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/update-password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ newPassword })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update password');
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Password updated successfully',
            });
            setNewPassword('');
            setConfirmPassword('');
        })
        .catch(error => {
            console.error('Error updating password:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update password',
            });
        });
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Update Password</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="newPassword">
                            <Form.Label>New Password:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label className="mt-3">Confirm Password:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" block className="mt-3 mb-4" style={{ width: "100%" }}>
                            Update Password
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
