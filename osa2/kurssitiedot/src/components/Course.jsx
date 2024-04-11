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
        return <Part part={part} key={part.id} />;
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

export default Course;
