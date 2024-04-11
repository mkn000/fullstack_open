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
      <h2>{coursename}</h2>
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
    <div>
      {parts.map((part) => {
        return (
          <p key={part.id}>
            <Part part={part} />
          </p>
        );
      })}
      <Total parts={parts} />
    </div>
  );
};

const Total = ({ parts }) => {
  console.log("Total", parts);

  return (
    <div>
      <p>
        <strong>
          total of{" "}
          {parts.reduce((acc, elem) => {
            return (acc += elem.exercises);
          }, 0)}{" "}
          exercises
        </strong>
      </p>
    </div>
  );
};

const App = () => {
  const courses = [
    {
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
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => {
        return (
          <div>
            <Course course={course} />
          </div>
        );
      })}
    </div>
  );
};

export default App;
