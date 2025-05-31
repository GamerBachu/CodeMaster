import React from 'react'; 
import d from "@/assets/d.svg"; 

const App = () => {
  return (
    <div>
      <h1>Welcome to the React App</h1>
      <p>This is a simple React application.</p>
      <button className="btn btn-primary">Click Me!</button>
      <p>Make sure to check the console for any messages.</p>
 <img src={d} alt="D" style={{ width: '100px', height: '100px' }} />
     
    </div>
  )
}

export default App