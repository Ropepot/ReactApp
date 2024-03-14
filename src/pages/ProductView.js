import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function ProductView() {

  const { productId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState();

  const addToCart = (productId) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/${productId}/add-to-cart`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        quantity: quantity
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.error === 'Admin users are forbidden to perform this action'){
        Swal.fire({
          title: "Error",
          icon: 'error',
          text: "Admin users are forbidden to perform this action."
        })
      } else if (data.message === 'Product added to cart successfully'){
        Swal.fire({
          title: 'Successfully added to cart',
          icon: 'success',
          text: 'You have successfully added the product to your cart.'
        });
        navigate("/products");
      } else {
        Swal.fire({
          title: "Something went wrong",
          icon: "error",
          text: "Please try again"
        });
      }
    })
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
    .then(res => res.json())
    .then(data => {
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
    })
  }, [productId]);

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Subtitle className="mt-3">Description:</Card.Subtitle>
              <Card.Text className="mt-1">{description}</Card.Text>
              <Card.Subtitle className="mt-1">Price:</Card.Subtitle>
              <Card.Text className="mt-1">&#8369;{price}</Card.Text>
              <Card.Subtitle>Quantity:</Card.Subtitle>
              <Card.Text className="mt-2">
                <Form>
                  <Form.Group>
                    <Form.Control type="number" required value={quantity} style={{ width: "25%" }} min={1} onChange={e => {setQuantity(e.target.value)}}/>
                  </Form.Group>
                </Form>
              </Card.Text>
              { user.id !== null ?
                <Button variant="warning" onClick={() => addToCart(productId)} block>Add to Cart</Button>
                :
                <Link className="btn btn-danger btn-block" to="/users/login">Log in to Add to Cart</Link>
              }
            </Card.Body>     
          </Card>
          <div className="text-center my-3">
            <Link className="btn btn-primary" to="/products">Back to Products</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
