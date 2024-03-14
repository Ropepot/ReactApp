import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import EditQuantity from '../components/EditQuantity';
import RemoveItem from '../components/RemoveItem';

export default function CheckoutPage() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        // Fetch user's cart data
        fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/get-cart`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.cart) {
                setCartItems(data.cart.cartItems);
                setTotalPrice(data.cart.totalPrice);
            } else {
                console.log("No items in cart");
            }
        })
        .catch(err => {
            console.error("Error fetching cart:", err);
        });
    }, []);

    const removeFromCart = (productId) => {
        const updatedCartItems = cartItems.filter(item => item.productId !== productId);
        setCartItems(updatedCartItems);

        const totalPrice = updatedCartItems.reduce((total, item) => total + item.subtotal, 0);
        setTotalPrice(totalPrice);

        fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/${productId}/remove-from-cart`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === "Product removed from cart successfully") {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Product removed from cart successfully'
                })
            } else {
                console.error("Error removing product from cart:", data.error);
            }
        })
        .catch(err => {
            console.error("Error removing product from cart:", err);
        });
    };

    const handleCheckout = () => {

        fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === "Order placed successfully") {
                Swal.fire({
                    title: "Success!",
                    icon: "success",
                    text: "Your order was placed successfully!"
                });
                navigate("/orders/my-orders");
            } else {
                console.error("Checkout error:", data.error);
            }
        })
        .catch(err => {
            console.error("Error during checkout:", err);
        });
    };

    useEffect(() => {
        if (user.isAdmin) {
            navigate("/");
        }
    }, [user.isAdmin, navigate]);

    const handleQuantityUpdate = (productId, newQuantity) => {
        console.log(productId)
        console.log(newQuantity)

        const updatedCartItems = cartItems.map(item => {
            if (item.productId === productId) {
                const subtotal = item.price * newQuantity;
                return { ...item, quantity: newQuantity, subtotal: subtotal };
            }
            return item;
        });

        const totalPrice = updatedCartItems.reduce((total, item) => total + item.subtotal, 0);
        
        setCartItems(updatedCartItems);
        setTotalPrice(totalPrice);

        fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/${productId}/update-cart-quantity`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                quantity: newQuantity
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === "Cart updated successfully") {
                Swal.fire({
                    title: "Success!",
                    icon: "success",
                    text: "Cart updated successfully!"
                });
            } else {
                console.error("Cart update error:", data.error);
            }
        })
        .catch(err => {
            console.error("Error updating cart:", err);
        });
    };

    return (
        (user.id === null) ?
            <Navigate to="/products" />
        :
        <div className="container mt-5">
            <h1>Checkout</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Subtotal</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => (
                        <tr key={item.productId}>
                            <td>{item.productName}</td>
                            <td>&#8369;{item.price}</td>
                            <td className="pe-0">
                                <EditQuantity
                                    initialQuantity={item.quantity}
                                    onUpdateQuantity={(newQuantity) => handleQuantityUpdate(item.productId, newQuantity)}
                                />
                            </td>
                            <td> &#8369;{item.subtotal}</td>
                            <td className="text-center">
                                <RemoveItem productId={item.productId} removeFromCart={removeFromCart} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="text-end">
                <h5>Total Price: &#8369;{totalPrice}</h5>
                <Button variant="warning" onClick={handleCheckout}>Checkout</Button>
            </div>
        </div>
    );
}

