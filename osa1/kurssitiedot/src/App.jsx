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
	const sum = function(arr) {
		let s = 0
		arr.forEach(i => {
			s += i.exercises
		})
		return s
	}
	return (
		<div>
			<p>Number of exercises {sum(props.data)}</p>
		</div>
	)
}

const App = () => {
	const course = 'Half Stack application development'
	const parts = [{ name: 'Fundamentals of React', exercises: 10 }, { name: 'Using props to pass data', exercises: 7 }, { name: 'State of a component', exercises: 14 }
	]
	return (
		<div>
			<Header coursename={course} />
			<Content data={parts} />
			<Total data={parts} />
		</div>
	)
}

export default App
