const Header = (props) => {
	return (
		<div>
			<h1>{props.coursename}</h1>
		</div>
	)
}

const Part = (props) => {
	return (
		<div>
			<p>
				{props.data.name} {props.data.exercises}
			</p>
		</div>
	)
}

const Content = (props) => {
	return (
		<div>
			<Part data={props.data[0]} />
			<Part data={props.data[1]} />
			<Part data={props.data[2]} />
		</div>
	)
}

const Total = (props) => {
	return (
		<div>
			<p>Number of exercises {props.nExercises}</p>
		</div>
	)
}

const App = () => {
	const course = 'Half Stack application development'
	const part1 = { name: 'Fundamentals of React', exercises: 10 }
	const part2 = { name: 'Using props to pass data', exercises: 7 }
	const part3 = { name: 'State of a component', exercises: 14 }

	return (
		<div>
			<Header coursename={course} />
			<Content data={[part1, part2, part3]} />
			<Total nExercises={part1.exercises + part2.exercises + part3.exercises} />
		</div>
	)
}

export default App
