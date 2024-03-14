import React, { useState } from 'react';
import { Button, Form, Col, Row, Container } from 'react-bootstrap';

export default function EditQuantity({ initialQuantity, onUpdateQuantity }){
    const [quantity, setQuantity] = useState(initialQuantity);

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value);
        setQuantity(value);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Form.Control
                        type="number"
                        value={quantity}
                        onChange={handleInputChange}
                        min={1}
                        style={{ width: "100%" }}
                    />
                </Col>
                <Col>
                    <Button onClick={() => onUpdateQuantity(quantity)} className="me-0" style={{ width: "95%" }}>Update</Button>
                </Col>
            </Row>
        </Container>
    );
};

