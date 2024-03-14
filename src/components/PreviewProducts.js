import React, { useContext } from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

export default function PreviewProducts(props) {

    const { user } = useContext(UserContext);

    const { breakPoint, data } = props;

    const { _id, name, description, price } = data;

    return (
        <Col xs={12} md={breakPoint}>
            <Card className="cardHighlight mx-2 h-100 bg-light shadow">
                <Card.Body>
                    <Card.Title className="text-center">
                        {name}
                    </Card.Title>
                </Card.Body>
                <Card.Footer>
                    <h5 className="text-center">&#8369;{price}</h5>
                    {user.isAdmin ? (
                        <Link className="btn btn-warning d-block" to="/products">Details</Link>
                    ) : (
                        <Link className="btn btn-warning d-block" to={`/products/${_id}`}>Details</Link>
                    )}
                </Card.Footer>
            </Card>
        </Col>
    );
}
