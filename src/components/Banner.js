import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({ data, style }){
  const { title, content, destination, label } = data;

  return (
    <Row style={{ position: 'relative', ...style }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100%',
          background: 'url("https://www.visiondesign.com/wp-content/uploads/hero-background-ecommerce.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
        }}
      ></div>

      <Col className="p-5 text-center">
        <h1>{title}</h1>
        <p>{content}</p>
        <Link className="btn btn-warning" to={destination}>
          {label}
        </Link>
      </Col>
    </Row>
  );
};