// import coursesData from '../data/coursesData';
import CourseCard from '../components/CourseCard';
import { useEffect, useState, useContext } from 'react';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import UserContext from '../UserContext';

export default function Courses(){

	const {user} = useContext(UserContext)

	// Checks to see if the mock data was captured
	// console.log(coursesData);
	// console.log(coursesData[0]);

	// State that will be used to store the courses retrieved from the database
	const [courses, setCourses] = useState([]);

	const fetchData = () => {

		// Allows to have a dynamic url depending whether the user that's logged in is an admin or not
		let fetchUrl = user.isAdmin === true ? `http://localhost:4000/courses/all` : `http://localhost:4000/courses/`

		// headers is included for both /courses/all and /courses/ to allow flexibility even if it is not needed
		fetch(fetchUrl, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			console.log(typeof data);

			// Sets the "courses" state to map the data retrieved from the fetch request into several "CourseCard" component
			// If the data.message is not a string or equal to undefined it will set the courses state with the courses from fetch
			if(typeof data.message !== "string"){
				setCourses(data.courses);
			} else {
				setCourses([]);
			}
		})
	}
	// Retrieves the courses from the database upon initial render of the "Courses" page component.
	useEffect(() => {

		fetchData();

	}, [])

	// The "map" method loops through the individual course objects in our array and returns a component for each course
	// Multiple components created through the map method must have a unique key that will help React JS identify which components/elements have been changed, added or removed
	// Everytime the map method loops through the data, it creates a "CourseCard" component and then passes the current element in our coursesData array using the courseProp
	// const courses = coursesData.map(course => {
	// 	return(
	// 		<CourseCard key={course.id} courseProp={course} />
	// 	);
	// })

	// The "courseProp" in the CourseCard component is called a "prop" which is a shorthand for "property" since components are considered as objects in React JS
	// The curly braces ({}) are used for props to signify that we are providing information using JavaScript expressions rather than hard coded values which use double quotes ("")
	// We can pass information from one component to another component using props. This is referred to as "props drilling"
	return(
		<>
			{
				(user.isAdmin === true) ?
					// Pass the fetchData as a props
					<AdminView coursesData={courses} fetchData={fetchData}/>

				:

					<UserView coursesData={courses} />
			}
		</>
		)
}