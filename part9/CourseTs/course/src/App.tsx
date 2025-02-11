interface HeaderProps {
  courseName: string;
}

interface ContentProps {
  courseParts: CoursePart[];
}

interface TotalProps {
  totalExercises: number;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourseDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CourseDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CourseDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CourseSpecial extends CourseDescription {
  kind: "special";
  requirements: string[];
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CourseSpecial;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
];

const Header = ({courseName}:HeaderProps) => <h1>{courseName}</h1>;

const Part = ({ part }: { part: CoursePart }) => {
  const baseInfo = (
    <h2>
      {part.name} {part.exerciseCount}
    </h2>
  );

  switch (part.kind) {
    case "basic":
      return (
        <>
          {baseInfo} {part.description}
        </>
      );
    case "group":
      return (
        <>
          {baseInfo} Project exercises {part.groupProjectCount}
        </>
      );
    case "background":
      return (
        <>
          {baseInfo} {part.description} {part.backgroundMaterial}
        </>
      );
    case "special":
      return (
        <>
          {baseInfo} {part.description} {part.requirements.join(', ')}
        </>
      );
    default:
      return assertNever(part);
  }
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Content = ({ courseParts }: ContentProps) => ( 
  <div>
    {courseParts.map(part => (
      <Part key={part.name} part={part} />  
    ))}
  </div>
);

const Total = ({ totalExercises }: TotalProps) => <p>Number of exercises {totalExercises}</p>;

const App = () => {
  const courseName = "Half Stack application development";

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;