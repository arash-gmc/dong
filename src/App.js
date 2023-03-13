import React, { Component } from 'react';
import SiteHeader from './components/header';
import './App.css';
import PeoplesCards from './components/PeoplesCards';
import AddPeopleButton from './components/AddPeopleButton';

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
    console.log(person)
  }

  findMotherPay = ()=>{
    return this.state.peoples.some(p=>p.motherPay)
  }

  addPeople = ()=>{
    const peoples = [...this.state.peoples]
    peoples.push({
      id: Date.now(),
      name: '',
      motherPay: !this.findMotherPay()
    })
    this.setState({peoples})
  }

  setMotherPay = ({currentTarget})=>{
    const peoples = [...this.state.peoples]
    const person = peoples.find(p=>'m'+p.id==currentTarget.id)
    peoples.map(p=>p.motherPay=false)
    person.motherPay=true
    this.setState({peoples})
  }

  render() { 
    return (
      <div className="App">
        <SiteHeader />
        <AddPeopleButton onClick={this.addPeople} />
        
        <PeoplesCards 
        peoples={this.state.peoples}
        onChange={this.handleChange}
        addPay={this.addPay}
        setMotherPay={this.setMotherPay} />
        
        
    
      </div>
    );
  }
}
 
export default App;



// 2C3333
// 2E4F4F
// 0E8388
// CBE4DE
