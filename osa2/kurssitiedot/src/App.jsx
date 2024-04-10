const Course = ({ course }) => {
  console.log(course);
  return (
    <div>
      <Header coursename={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

const Header = ({ coursename }) => {
  console.log("header", coursename);
  return (
    <div>
      <h1>{coursename}</h1>
    </div>
  );
};

const Part = ({ part }) => {
  console.log("Part", part);
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  );
};

const Content = ({ parts }) => {
  console.log(parts);
  return (
    <ul>
      {parts.map((part) => {
        return (
          <li key={part.id}>
            <Part part={part} />
          </li>
        );
      })}
    </ul>
  );
};

const Total = (props) => {
  const sum = function (arr) {
    let s = 0;
    arr.forEach((i) => {
      s += i.exercises;
    });
    return s;
  };
  return (
    <div>
      <p>Number of exercises {sum(props.data)}</p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

export default App;
