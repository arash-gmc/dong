import React, { Component } from 'react';
import siteHeader from './components/header';
import './App.css';

class App extends Component {
  state = { 
    peoples:[]
   } 
  render() { 
    return (
      <div className="App">
        <siteHeader />
        <button 
          className='btn btn-dark'
          onClick={()=>{
          }}  
            >اضافه کردن افراد</button>
      </div>
    );
  }
}
 
export default App;



// 2C3333
// 2E4F4F
// 0E8388
// CBE4DE
