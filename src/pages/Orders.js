import React, { useState, useEffect, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function OrderPage() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    const fetchOrders = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/my-orders`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(data.orders)
            setOrders(data.orders.reverse());
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        (user.id === null || user.isAdmin) ?
            <Navigate to="/" />
        :
        <div className="container mt-5">
            <h1 className="mb-3 text-center">Order Summary</h1>
            <Link to="/products" className="d-flex justify-content-center">
                <Button variant="primary" className="mb-3">Back to Products</Button>
            </Link>
            {orders.length > 0 ? (
                orders.map(order => (
                    <div key={order._id}>
                        <Table striped bordered hover className="mb-5">
                            <tbody>
                                <tr>
                                    <th colSpan="4">Order ID: {order._id}</th>
                                </tr>
                                <tr>
                                    <th colSpan="4">Order Date: {order.orderedOn}</th>
                                </tr>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Subtotal</th>
                                </tr>
                                {order.productsOrdered.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.productName}</td>
                                        <td>{item.quantity}</td>
                                        <td>&#8369;{item.price}</td>
                                        <td>&#8369;{item.subtotal}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <th colSpan="3" className="text-end">Total Price:</th>
                                    <th>&#8369;{order.totalPrice}</th>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                ))
            ) : (
                <h2>No orders found.</h2>
            )}
        </div>
    );
};
