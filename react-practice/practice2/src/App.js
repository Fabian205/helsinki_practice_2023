/*import React, {useState} from "react"

 const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0, all: 0,
  })
  
  
  const handleLeftClick = () => {
    const newClicks = { 
      ...clicks, 
      left: clicks.left+1, 
      all: clicks.all+1,            
    }
    setClicks(newClicks) 

  }

  const handleRightClick = () => {
    const newClicks = { 
      ...clicks, 
      right: clicks.right+1,
      all: clicks.all+1 
    }
    setClicks(newClicks)

  }



  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
      <p>{clicks.all}</p>
      
    </div>
  )
}

export default App; */

///////////////////////////////////////////
//////////////////////////////////////////

/* import React, { useState } from "react";

const Likes = () => {
  console.log("Render likes");
  const [likes, setLikes] = useState({ val: 0 });
  console.log(likes);
  return (
    <Button
      onClick={() => {
        //const newLikes = { ...likes };        
        //newLikes.val = newLikes.val + 1;
        const newLikes = {val:likes.val}        
        newLikes.val++;
        setLikes(newLikes);
      }}
    >
      {likes.val} likes
    </Button>
  );
};

const Button = ({ onClick, children }) => {
  console.log("Render Button");
  return <button onClick={onClick}>{children}</button>;
};

const App = () => {
  console.log("Render App");
  return <Likes />;
};

export default App; */

////////////////////////////////////////////////
///////////////////////////////////////////////

/* import { useState } from "react";

const Likes = () => {
  console.log("Render likes");

  const [likes, setLikes] = useState(0);
  console.log(likes);
  return (
    <Button
      onClick={() => setLikes(likes+1)}>{likes}likes</Button>
  );
};

const Button = ({ onClick, children }) => {
  console.log("Render Button");
  return <button onClick={onClick}>{children}</button>;
};

const App = () => {
  console.log("Render App");
  return <Likes />;
};

export default App; */

///////////////////////////////////////////
///////////////////////////////////////////

/* import { useState } from "react";

//const getInitialLikes = () => 12;
const getInitialLikes = () => {
  console.log("getInitialLikes");
  return 12;
};

const Likes = () => {
  //const Likes = ({initialLikes}) => {
  console.log("Render likes");

  //const [likes, setLikes] = useState(initialLikes);
  //const [likes, setLikes] = useState(getInitialLikes);
  //const [likes, setLikes] = useState(()=>getInitialLikes());
  const [likes, setLikes] = useState(getInitialLikes);

  console.log(likes);
  return <Button onClick={() => setLikes(likes + 1)}>{likes}likes</Button>;
};

const Button = ({ onClick, children }) => {
  console.log("Render Button");
  return <button onClick={onClick}>{children}</button>;
};

const App = () => {
  console.log("Render App");
  //return <Likes initialLikes={12}/>;
  return <Likes />;
};

export default App; */

/* import React, { useState } from "react";

const Child = ({ nombre, apellido, addMensaje }) => {
  
   //const enviarMensaje=()=>{
    //addMensaje("ChildMessage");
  //} 

  return (
    <div>
      {nombre}

      //<button onClick={enviarMensaje}>Send Message</button> 
      <button onClick={() => addMensaje("ChildMessage")}>Send Message</button>
    </div>
  );
};

const App = () => {
  const [nombre, setNombre] = useState("Mario");
  const [mensaje, setMensaje] = useState("");


  const addMensaje = (mensaje) => {
    console.log(mensaje);
    setMensaje(mensaje);
  };

  return (
    <div>
      App Component
      <h1>{mensaje}</h1>
      <hr />
      <Child nombre={nombre}  addMensaje={addMensaje} />
    </div>
  );
};

export default App; */

/*---------------------------------------------------
 |                  practica props              |                        
 ---------------------------------------------------*/

/* import React, { useState } from "react";

const Child = ({ nombre, addMensaje, onData}) => {
  const [dataToSend, setDataToSend] = useState('');
   //const sendDataToParent = () => {
    // Al hacer clic en un botón, llamamos a la función de devolución de llamada del padre
    //onData(dataToSend);
  //}; 
  // const enviarMensaje=()=>{
    //addMensaje("ChildMessage");
  //} 

  return (
    <div>
      <p>Dato enviado desde el padre: {nombre}</p>           
      <button onClick={() => addMensaje("ChildMessage")}>Send Message </button>
      <input
        type="text"
        value={dataToSend}
        onChange={(e) => setDataToSend(e.target.value)}
      />
      
      <button onClick={()=> onData(dataToSend)}>Send date to app</button>
    </div>
  );
};

const App = () => {
  const [nombre, setNombre] = useState("Mario");
  const [mensaje, setMensaje] = useState("");
  const [dataFromChild, setDataFromChild] = useState('');


  const addMensaje = (mensaje) => {
    console.log(mensaje);
    setMensaje(mensaje);
  };
  const handleChildData = (data) => {
    // Esta función se ejecutará cuando el componente hijo envíe datos al padre
    setDataFromChild(data);
  };

  return (
    <div>
      App Component
      <h1>{mensaje}</h1>
      <p>Datos desde el hijo: {dataFromChild}</p>     
      <hr />
      <Child nombre={nombre}  addMensaje={addMensaje} onData={handleChildData}/>      
    </div>
  );
};

export default App; */

/*---------------------------------------------------
 |         practica helsinki unicafe step3          |                        
 ---------------------------------------------------*/

/* import React, { useState } from "react";

const Statistics =({good, neutral, bad})=>{
  const all= good+neutral+bad
  const average = (good - bad) / all || 0;
  const positive = (good / all) * 100 || 0;

  const Statistic = ({ all, average, positive, text }) => (
    <div>  
      {text}    
      {all}
      {average}
      {positive}     
    </div>
  );

  return(
    <div>      
      <Statistic text={"all:"} all={" " + all}/>
      <Statistic text={"average:"} average={" " + average}/>
      <Statistic text={"positive:"} positive={" " + positive}/>
    </div>
  )
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);


  const handleButtonClick = (type) => {
    if (type === "good") {
      setGood(good + 1);
    } else if (type === "neutral") {
      setNeutral(neutral + 1);
    } else if (type === "bad") {
      setBad(bad + 1);
    }
  };

  const Display = ({ good, neutral, bad, text }) => (
    <div>
      {text}
      {good}
      {neutral}
      {bad}
    </div>
  );

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => handleButtonClick("good")}>good</button>
      <button onClick={() => handleButtonClick("neutral")}>neutral</button>
      <button onClick={() => handleButtonClick("bad")}>bad</button>
      <div>
        <h2>Statistics</h2>
        <Display text={"good:"} good={" " + good} />
        <Display text={"neutral:"} neutral={" " + neutral} />
        <Display text={"bad:"} bad={" " + bad} />        
        <Statistics  good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  );
};

export default App; */

/*---------------------------------------------------
 |                  1.11: unicafe step6              |                        
 ---------------------------------------------------*/
import React, { useState} from "react";

const Statistics = ({ good, neutral, bad  }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all || 0;
  const positive = (good / all) * 100 || 0;
  
  const StatisticLine = ({ good, neutral, bad, all, average, positive, text }) => (
    <div>
      {text}
      {good}
      {neutral}
      {bad}
      {all}
      {average}
      {positive}
    </div>
  );

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td><StatisticLine text={"good:"}/></td>
            <td><StatisticLine good={good}/></td>
          </tr>
          <tr>
            <td><StatisticLine text={"neutral:"} /></td>
            <td><StatisticLine neutral={neutral} /></td>
          </tr>
          <tr>
            <td><StatisticLine text={"bad:"} /></td>
            <td><StatisticLine bad={bad}/></td>
          </tr>
          <tr>
            <td><StatisticLine text={"all:"}/></td>
            <td><StatisticLine all={all} /></td>
          </tr>
          <tr>
            <td><StatisticLine text={"average:"}/></td>
            <td><StatisticLine average={average.toFixed(1)} /></td>
          </tr>
          <tr>
            <td><StatisticLine text={"positive:"} /></td>
            <td><StatisticLine positive={positive.toFixed(1) + "%"} /></td>
          </tr>
        </tbody>
      </table>      
    </div>
  );
};

const App = () => {
  
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [showStatistics, setShowStatistics] = useState(false);
  const [message, setMessage] = useState("No feedBack given");
  

  const handleButtonClick = (type) => {
    if (type === "good") {
      setGood(good + 1);
    } else if (type === "neutral") {
      setNeutral(neutral + 1);
    } else if (type === "bad") {
      setBad(bad + 1);
    }
    setShowStatistics(true);
    setMessage("");   
  };
 
  return (
    <div>
      <h1>Give feedBack</h1>
      <button onClick={() => handleButtonClick("good")}>good</button>
      <button onClick={() => handleButtonClick("neutral")}>neutral</button>
      <button onClick={() => handleButtonClick("bad")}>bad</button>
      <h1>Statistics</h1>
      <p>{message}</p>

      {showStatistics && (
        <div>         
           <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
      )}
    </div>
  );
};

export default App;
