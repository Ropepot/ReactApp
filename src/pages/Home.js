import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FeaturedProducts from '../components/FeaturedProducts';
import React, { useContext } from 'react';
import UserContext from '../UserContext';


export default function Home(){

    const { user } = useContext(UserContext);

    return (
        <>
            <Row style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '150vh',
                  background: 'url("https://abrakadabra.fun/uploads/posts/2021-12/1639055494_28-abrakadabra-fun-p-sereznii-fon-dlya-prezentatsii-28.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundAttachment: 'fixed',
                  zIndex: -1,
                }}
              ></div>
                <Col className="p-5 text-center col-12">
                    <h1 className="mt-4 text-primary">ByteBlitz</h1>
                    <h4 className="my-3 text-primary" style={{ fontStyle: 'italic' }}>Unleash Your Tech Fury</h4>
                    {user.isAdmin ? (
                        <Link className="btn btn-warning" to="/products">Go to Dashboard</Link>
                    ) : (
                        <Link className="btn btn-warning" to="/products">Buy now!</Link>
                    )}
                    
                </Col>
                <Col>
                    <FeaturedProducts />
                </Col>
            </Row>
        </>
    )
}
