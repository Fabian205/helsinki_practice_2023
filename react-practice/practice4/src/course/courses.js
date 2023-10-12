import React from 'react'
import { Content } from './content'

function Courses() {

  const parts = Content[0].parts; 
  const parts2 = Content[1].parts;
  
  const total = parts.reduce((accumulator, currentExercise) => {
    return accumulator + currentExercise.exercises;
  }, 0);

  const total2 = parts2.reduce((accumulator, currentExercise) => {
    return accumulator + currentExercise.exercises;
  }, 0);
  
  return (
    <>
      <h1>Web development curriculum</h1>
      <h3>{Content[0].name}</h3>
      <div>
        {parts.map((part) => (
          <p key={part.id}>
            {part.name + " "}
            {part.exercises}
          </p>
        ))}
      </div>
      <h4>total of{" "+total+" "}exercises</h4>

      <h3>{Content[1].name}</h3>
      <div>
        {parts2.map((part2) => (
          <p key={part2.id}>
            {part2.name + " "}
            {part2.exercises}
          </p>
        ))}
      </div>
      <h4>total of{" "+total2+" "}exercises</h4>
    </>
  )
}

export default Courses