const Header = ({ courseName }) => <h2>{courseName}</h2>

const Part = ({ part }) => (
  <div>
      <p>
        {part.name} {part.exercises}
      </p>
  </div>
)

const Content = ({ parts }) => (
  <div>
    {parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
  </div>
)

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p>Total of {totalExercises} exercises</p>
}

const Course = ({ course }) => (
  <div>
    <Header courseName={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course