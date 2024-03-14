import React from 'react';
import { Button } from 'react-bootstrap';

export default function RemoveItem({ productId, removeFromCart }){
    const handleRemove = () => {
        removeFromCart(productId);
    };

    return (
        <Button variant="danger" onClick={handleRemove} className="mx-auto">
            Remove
        </Button>
    );
};
