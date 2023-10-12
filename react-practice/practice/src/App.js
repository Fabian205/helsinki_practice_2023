/* const Hello = (props) => {
  const bornYear = () => {
    const yearNow = new Date().getFullYear();
    return yearNow - props.age;
  };
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
}; */
/* const Hello = (props) => {
  const name = props.name  
  const age = props.age
  const bornYear = () => new Date().getFullYear() - age
  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>      
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
} */

/* const Hello = (props) => {
  const { name, age } = props  
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
} */

/* const Hello = ({ name, age }) => {  
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const name = "Peter";
  const age = 10;

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  );
}; 
export default App;*/

import { useState } from "react";
const App = () => {
  const [counter, setCounter] = useState(0);
  console.log('rendering with counter value', counter)
  const increaseByOne = () => setCounter(counter + 1);
  console.log('increasing, value before', counter)
  const decreaseByOne = () => setCounter(counter - 1);
  console.log('decreasing, value before', counter)
  const setToZero = () => setCounter(0);
  console.log('resetting to zero, value before', counter)

  /* const Display = (props) => {
    return <div>{props.counter}</div>;
  }; */

  /* const Display = ({ counter }) => {
    return (
      <div>{counter}</div>
    )
  } */

  const Display = ({ counter }) => <div>{counter}</div>

  /* const Button = (props) => {
    return <button onClick={props.handleClick}>{props.text}</button>;
  }; */


  /* const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  ) */

  const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

  /* const handleClick = () => {
    console.log("clicked");
  }; */

  /* setTimeout(() => setCounter(counter + 1), 1000);
  console.log("rendering...", counter); */

  return (
    <div>
      {/* <div>{counter}</div> */}
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text="plus" />
      <Button handleClick={setToZero} text="zero" />
      <Button handleClick={decreaseByOne} text="minus" />
    </div>
  );
};

export default App;
