import {useState,useEffect, useContext} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function AddProduct(){

	const navigate = useNavigate();

	const {user} = useContext(UserContext);

	//input states
	const [name,setName] = useState("");
	const [description,setDescription] = useState("");
	const [price,setPrice] = useState("");

	function createProduct(e){

		e.preventDefault();

		let token = localStorage.getItem('token');
		console.log(token);

		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/addProduct`,{

			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({

				name: name,
				description: description,
				price: price

			})
		})
		.then(res => res.json())
		.then(data => {

			console.log(data);

			if(data.message === "Product already exists"){
				Swal.fire({
					title: 'Error',
					icon: 'error',
					text: 'Product already exists'
				})
			} else if (data.error === "Failed to save the product") {
				Swal.fire({
					title: 'Error',
					icon: 'error',
					text: 'Unsuccessful Product Creation"'
				})
			} else {
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product Successfully Added'
				})
				navigate("/products");
			}
		})
		setName("")
		setDescription("")
		setPrice(0);
	}

	return (
		(user.isAdmin === true)
		?
		<>
		<Row className="justify-content-center">
		    <Col md={6}>
				<h1 className="my-5 text-center">Add Product</h1>
				<Form onSubmit={e => createProduct(e)}>
					<Form.Group>
						<Form.Label>Name:</Form.Label>
						<Form.Control type="text" placeholder="Enter Name" required value={name} onChange={e => {setName(e.target.value)}}/>
					</Form.Group>
					<Form.Group>
						<Form.Label className="mt-2">Description:</Form.Label>
						<Form.Control as="textarea" rows={5} placeholder="Enter Description" required value={description} onChange={e => {setDescription(e.target.value)}}/>
					</Form.Group>
					<Form.Group>
						<Form.Label className="mt-2">Price:</Form.Label>
						<Form.Control type="number" placeholder="Enter Price" required value={price} onChange={e => {setPrice(e.target.value)}}/>
					</Form.Group>
				<Button variant="warning" type="submit" className="my-3" style={{ width: "100%" }}>ADD THE PRODUCT</Button>
				</Form>
		    </Col>
		</Row>		
		</>
		:
		<Navigate to="/products" />
		)
}