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
				{props.data.part} {props.data.exercises}
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
	const part1 = 'Fundamentals of React'
	const exercises1 = 10
	const part2 = 'Using props to pass data'
	const exercises2 = 7
	const part3 = 'State of a component'
	const exercises3 = 14

	return (
		<div>
			<Header coursename={course} />
			<Content data={[{ part: part1, exercises: exercises1 }, { part: part2, exercises: exercises2 }, { part: part3, exercises: exercises3 }]} />
			<Total nExercises={exercises1 + exercises2 + exercises3} />
		</div>
	)
}

export default App
