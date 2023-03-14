import React, { Component } from 'react';
import SiteHeader from './components/header';
import './App.css';
import PeoplesCards from './components/PeoplesCards';
import AddPeopleButton from './components/AddPeopleButton';

class App extends Component {
  state = { 
    peoples:[],
    pays:[]
   }
   
  handlePeopleNameChange = ({currentTarget})=>{
    const peoples = [...this.state.peoples]
    const person = this.state.peoples.find(p=>'i'+p.id===currentTarget.id)
    person.name = currentTarget.value
    this.setState({peoples})
  }

  handlePayNameChange = ({currentTarget})=>{
    const pays = [...this.state.pays]
    const pay = pays.find(pay=>'pn'+pay.id===currentTarget.id)
    pay.name=currentTarget.value
    this.setState({pays})
    
    
  }
  
  addPay = ({currentTarget})=>{
    const ownerId = currentTarget.id.substring(1)
    const newPay = {
      id: Date.now()+'',
      ownerId,
      name: '',
      amount: '',
      paidFor: [],
    } 
    const pays = [...this.state.pays]
    pays.push(newPay)
    this.setState({pays})
    
  }

  findMotherPay = ()=>{
    return this.state.peoples.some(p=>p.motherPay)
  }

  addPeople = ()=>{
    const peoples = [...this.state.peoples]
    peoples.push({
      id: Date.now()+'',
      name: '',
      pays:[],
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
        <div className="row">
          {this.state.peoples.map(person=>
            <PeoplesCards 
              person={person}
              pays = {this.state.pays.filter(pay=>pay.ownerId === person.id)}
              onPeopleNameChange={this.handlePeopleNameChange}
              onPayNameChange={this.handlePayNameChange}
              addPay={this.addPay}
              setMotherPay={this.setMotherPay} 
              key={person.id}
            />
          )}    
        </div>  
        
        
    
      </div>
    );
  }
}
 
export default App;



// 2C3333
// 2E4F4F
// 0E8388
// CBE4DE
