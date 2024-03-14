import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CourseCard({courseProp}) {
	// Checks to see if the data was successfully passed
	// console.log(props);
	// Every component receives information in a form of object
	// console.log(typeof props);
	// Deconstruct the course properties into their own variables
	const {_id, name, description, price} = courseProp;

	// Use the state hook for this component to be able to store its state
	// States are used to keep track of information related to individual components
	// Syntax
		// const [getter, setter] = useState(initialGetterValue)
	// const [count, setCount] = useState(0);
	// Using the state hook returns an array with the first element being a value and the second element as function that's used to change the value of the first element
	// console.log(useState(0));
	// Use state hook for getting and setting the seats for this course
	// const [seats, setSeats] = useState(30);

	// Function that keeps track of the enrollees for a course
	// By default JavaScript is synchronous it executes code from top of the all the way to the bottom and will wait for the completion of one expression before it proceeds to the next
	// The setter function for useStates are asynchronous allowing it to execute separately from other codes in the program
	// The 'setCount' function is being executed while the "console.log" is already completed resulting in the value to be displayed in the console to be behind by one count
	// function enroll(){
	// 	if(seats > 0){
	// 		setCount(count + 1);
	// 		console.log('Enrollees: ' + count);
	// 		setSeats(seats - 1);
	// 		console.log('Seats: ' + seats);
	// 	} else {
	// 		alert("No more seats available");
	// 	};
		
	// }

	return (
		// add margin top
		<Card className="mt-3">
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Subtitle>Description:</Card.Subtitle>
				<Card.Text>{description}</Card.Text>
				<Card.Subtitle>Price:</Card.Subtitle>
				<Card.Text>PhP {price}</Card.Text>
				<Link className="btn btn-primary" to={`/courses/${_id}`}>Details</Link>
			</Card.Body>
		</Card>
		)
}

// Check if the CourseCard component is getting the correct prop types
// Proptypes are used for validating information passed to a component and is a tool normally used to help developers ensure the correct information is passed from one component to the next
// PropTypes are a good way of checking the data type of information passed between components
CourseCard.propTypes = {
	// The "shape" method is used to check if a prop object conforms to a specfic "shape"
	courseProp: PropTypes.shape({
		// Define the properties and their expected types
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired
	})
}