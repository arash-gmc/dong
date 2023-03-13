import React, { Component } from 'react';
import SiteHeader from './components/header';
import './App.css';
import PeoplesCards from './components/PeoplesCards';

class App extends Component {
  state = { 
    peoples:[]
   }
   
  handleChange = ({currentTarget})=>{
    const peoples = [...this.state.peoples]
    const person = this.state.peoples.find(p=>'i'+p.id===currentTarget.id)
    person.name = currentTarget.value
    this.setState({peoples})
  }
  
  addPay = ({currentTarget})=>{
    const peoples = [...this.state.peoples]
    const person = this.state.peoples.find(p=>'s'+p.id===currentTarget.id)
    console.log(person.name)
  }

  render() { 
    return (
      <div className="App">
        <SiteHeader />
        <button 
          className='btn btn-dark'
          onClick={()=>{
            const peoples = [...this.state.peoples]
            peoples.push({
              id: Date.now(),
              name: ''
            })
            this.setState({peoples})
          }}  
            >اضافه کردن افراد</button>
        <PeoplesCards 
        peoples={this.state.peoples}
        onChange={this.handleChange}
        addPay={this.addPay} />
        
        
    
      </div>
    );
  }
}
 
export default App;



// 2C3333
// 2E4F4F
// 0E8388
// CBE4DE
