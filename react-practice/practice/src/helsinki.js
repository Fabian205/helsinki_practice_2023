/*---------------------------------------------------
 |                  1.7: unicafe step2               |                        
	---------------------------------------------------*/
/* const App = () => {
  const [clicks, setClicks] = useState([]);
  const [clickText, setClickText] = useState("");

  const handleClick = (type) => {
    const newClick = { type, text: clickText };
    setClicks([...clicks, newClick]);
    setClickText("");
  };

  const calcuStatistics = () => {
    const totalClicks = clicks.length;
    if (totalClicks === 0) {
      return {
        totalClicks: 0,
        averageScore: 0,
        positivePercentage: 0,
        good: 0,
        neutral: 0,
        bad: 0,
      };
    }

    const goodClicks = clicks.filter((clicks) => clicks.type === "good").length;
    const neutralClicks = clicks.filter(
      (clicks) => clicks.type === "neutral"
    ).length;
    const badClicks = clicks.filter((clicks) => clicks.type === "bad").length;

    const totalScore = goodClicks - badClicks;
    const averageScore = totalScore / totalClicks;
    const positivePercentage = (goodClicks / totalClicks) * 100;

    return {
      totalClicks,
      averageScore,
      positivePercentage,
      good: goodClicks,
      neutral: neutralClicks,
      bad: badClicks,
    };
  };

  const statistics = calcuStatistics();

  return (
    <>
      <div>
        <h1>Give feedback</h1>
        <button onClick={() => handleClick("good")}>Good</button>
        <button onClick={() => handleClick("neutral")}>Neutral</button>
        <button onClick={() => handleClick("bad")}>Bad</button>
      </div>

      <div>

        <h1>Statistics</h1>

        <p>Good: {statistics.good}</p>
        <p>Neutral: {statistics.neutral}</p>
        <p>Bad: {statistics.bad}</p>
        <p>All: {statistics.totalClicks}</p>
        <p>Average: {statistics.averageScore}</p>
        <p>Positive: {statistics.positivePercentage}%</p>
      </div>
    </>
  );
};

export default App; */

/*---------------------------------------------------
	 |                      STEP 3 unicafe 1.8                  |                        
	  ---------------------------------------------------*/
/* const App = () => {
  const [clicks, setClicks] = useState([]);
  const [clickText, setClickText] = useState("");
  const [showStatistics, setShowStatistics] = useState(false);

  const handleClick = (type) => {
    const newClick = { type, text: clickText };
    setClicks([...clicks, newClick]);
    setClickText("");
    setShowStatistics(true);
  };

  const calcuStatistics = () => {
    const totalClicks = clicks.length;
    if (totalClicks === 0) {
      return {
        totalClicks: 0,
        averageScore: 0,
        positivePercentage: 0,
        good: 0,
        neutral: 0,
        bad: 0,
      };
    }

    const goodClicks = clicks.filter((clicks) => clicks.type === "good").length;
    const neutralClicks = clicks.filter(
      (clicks) => clicks.type === "neutral"
    ).length;
    const badClicks = clicks.filter((clicks) => clicks.type === "bad").length;

    const totalScore = goodClicks - badClicks;
    const averageScore = totalScore / totalClicks;
    const positivePercentage = (goodClicks / totalClicks) * 100;

    return {
      totalClicks,
      averageScore,
      positivePercentage,
      good: goodClicks,
      neutral: neutralClicks,
      bad: badClicks,
    };
  };

  const statistics = calcuStatistics();

  return (
    <>
      <div>
        <h1>Give feedback</h1>
        <button onClick={() => handleClick("good")}>Good</button>
        <button onClick={() => handleClick("neutral")}>Neutral</button>
        <button onClick={() => handleClick("bad")}>Bad</button>
      </div>
      <div>
        <h1>Statistics</h1>
        <p>Good: {statistics.good}</p>
        <p>Neutral: {statistics.neutral}</p>
        <p>Bad: {statistics.bad}</p>
        <p>All: {statistics.totalClicks}</p>
        <p>Average: {statistics.averageScore}</p>
        <p>Positive: {statistics.positivePercentage}%</p>
      </div>
    </>
  );
};

export default App; */

/*---------------------------------------------------
	 |                      STEP 4 unicafe 1.9                  |                        
	  ---------------------------------------------------*/
/* const App = () => {
      const [clicks, setClicks] = useState([]);
      const [clickText, setClickText] = useState("");
      const [showStatistics, setShowStatistics] = useState(false);
    
      const handleClick = (type) => {
        const newClick = { type, text: clickText };
        setClicks([...clicks, newClick]);
        setClickText("");
        setShowStatistics(true);
      };
    
      const Statistics = () => {
        const totalClicks = clicks.length;
        if (totalClicks === 0) {
          return null;
        }
    
        const goodClicks = clicks.filter((clicks) => clicks.type === "good").length;
        const neutralClicks = clicks.filter(
          (clicks) => clicks.type === "neutral"
        ).length;
        const badClicks = clicks.filter((clicks) => clicks.type === "bad").length;
    
        const totalScore = goodClicks - badClicks;
        const averageScore = totalScore / totalClicks;
        const positivePercentage = (goodClicks / totalClicks) * 100;
    
        return {
          totalClicks,
          averageScore,
          positivePercentage,
          good: goodClicks,
          neutral: neutralClicks,
          bad: badClicks,
        };
      };
    
      const statistics = showStatistics ? Statistics() : null;
    
      return (
        <>
          <div>
            <h1>Give feedback</h1>
            <button onClick={() => handleClick("good")}>Good</button>
            <button onClick={() => handleClick("neutral")}>Neutral</button>
            <button onClick={() => handleClick("bad")}>Bad</button>
            <h1>Statistics</h1>
            <p>No feedback given</p>
          </div>
          {statistics && (
          <div>    
            <p>Good: {statistics.good}</p>
            <p>Neutral: {statistics.neutral}</p>
            <p>Bad: {statistics.bad}</p>
            <p>All: {statistics.totalClicks}</p>
            <p>Average: {statistics.averageScore}</p>
            <p>Positive: {statistics.positivePercentage}%</p>
          </div>
          )}
        </>
      );
    };
    
    export default App; */

//<p>Puntuación promedio: {statistics.averageScore.toFixed(2)}</p>