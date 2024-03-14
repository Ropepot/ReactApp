import { CardGroup, Row } from 'react-bootstrap';
import PreviewProducts from './PreviewProducts';
import { useState, useEffect } from 'react';

export default function FeaturedProducts() {

    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`)
            .then(res => res.json())
            .then(data => {
                const availableProducts = data.availableProducts.filter(course => course.isActive);
                const featured = [];

                const limit = Math.min(5, availableProducts.length);

                for (let i = 0; i < limit; i++) {
                    featured.push(
                        <PreviewProducts data={availableProducts[i]} key={availableProducts[i]._id} breakPoint={2} />
                    );
                }

                setPreviews(featured);
            });
    }, []);

    return (
        <>
            <h2 className="text-center mb-4 mt-3 text-primary">Featured Products</h2>
            {/* Use a Row to wrap each PreviewProducts component */}
            <Row className="justify-content-center mb-5">
                {previews}
            </Row>
        </>
    );
}
