const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <b>total of {sum} exercises</b>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Course = ({course}) => {

    const courseWithTotals = {
      ...course, 
      total: course.parts.reduce((sum, part) => sum + part.exercises, 0)
    }
  
    return(
      <>
        <Header course={courseWithTotals.name} />
  
        {courseWithTotals.parts.map(part => 
          <Part key={part.id} part={part} 
        /> )}
  
        <Total sum={courseWithTotals.total} />
      </>
    )
  }  

  export default Course