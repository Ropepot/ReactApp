import React from 'react';
import { Card, Col, Row} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ProductCard({ productProp }) {
    const { _id, name, description, price, imageUrl } = productProp;

    return (
            <Col xs={12} className="my-3">
                <Card className="shadow h-100 d-flex flex-column flex-grow-1">
                    <Card.Body>
                         <Card.Title>{name}</Card.Title>
                         <Card.Subtitle className="mt-3">Description:</Card.Subtitle>
                         <Card.Text>{description}</Card.Text>
                         <Card.Subtitle>Price:</Card.Subtitle>
                         <Card.Text>&#8369;{price}</Card.Text>
                         <div className="mt-auto">
                           <Link className="btn btn-primary" to={`/products/${_id}`}>Details</Link>
                         </div>
                    </Card.Body>
                </Card>
            </Col>
    );
}

ProductCard.propTypes = {
    productProp: PropTypes.object.isRequired,
};

