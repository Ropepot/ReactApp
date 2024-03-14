import { useState, useEffect } from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';

export default function AdminView({ productsData, fetchData }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const sortedProducts = [...productsData].sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        const productsArr = sortedProducts.map(product => (
            <tr key={product._id}>
                <td className="p-2 text-primary bg-opacity-25">{product._id}</td>
                <td className="p-2 text-dark bg-opacity-25">{product.name}</td>
                <td className="p-2 text-dark bg-opacity-25">{product.description}</td>
                <td className="p-2 text-primary bg-opacity-25">&#8369;{product.price}</td>
                <td className={product.isActive ? "text-success" : "text-danger"}>
                    {product.isActive ? "Available" : "Unavailable"}
                </td>
                <td><EditProduct product={product._id} fetchData={fetchData}/></td>
                <td><ArchiveProduct className="btn btn-danger" product={product._id} isActive={product.isActive} fetchData={fetchData}/></td>   
            </tr>
        ));

        setProducts(productsArr);
    }, [productsData]);

    return (
        <>
            <h1 className="text-center my-4"> Admin Dashboard</h1>
            <Row className="justify-content-center mb-3">
                <Col md={6} className="text-center">
                    <Link to="/products/addProduct" className="btn btn-warning">Add New Product</Link>
                </Col>
            </Row>
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th className="bg-success p-2 text-dark bg-opacity-50">ID</th>
                        <th className="bg-success p-2 text-dark bg-opacity-50">Name</th>
                        <th className="bg-success p-2 text-dark bg-opacity-50">Description</th>
                        <th className="bg-success p-2 text-dark bg-opacity-50">Price</th>
                        <th className="bg-success p-2 text-dark bg-opacity-50">Availability</th>
                        <th colSpan="2" className="bg-success p-2 text-dark bg-opacity-50">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products}
                </tbody>
            </Table>    
        </>
    );
}
