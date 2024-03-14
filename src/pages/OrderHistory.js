import React, { useState, useEffect, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import UserContext from '../UserContext';

export default function OrderHistory() {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const fetchAllOrders = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/all-orders`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data && data.orders) { 
                setOrders(data.orders.reverse());
            }
        })
        .catch(err => {
            console.error("Error fetching all orders:", err);
        });
    };

    if (!user.isAdmin) {
        return <Navigate to="/products" />;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Order History</h1>
            <Link to="/products" className="d-flex justify-content-center">
                <Button variant="primary" className="mt-3">Back to Dashboard</Button>
            </Link>
            {orders.map(order => (
                <div key={order._id} className="mt-5">
                    <h3>Order ID: {order._id}</h3>
                    <h5>User ID: {order.userId}</h5>
                    <h5>Order Date: {order.orderedOn}</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.productsOrdered.map(product => (
                                <tr key={product._id}>
                                    <td>{product.productName}</td>
                                    <td>{product.quantity}</td>
                                    <td>&#8369;{product.price}</td>
                                    <td>&#8369;{product.subtotal}</td>
                                </tr>
                            ))}
                            <tr>
                                <th colSpan="3" className="text-end">Total Price:</th>
                                <th>&#8369;{order.totalPrice}</th>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}
        </div>
    );
};
