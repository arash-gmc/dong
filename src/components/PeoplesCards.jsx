import React, { Component } from 'react';
import PayCard from "./payCard";

class PeoplesCards extends Component {
    state = { 
        peoples : [],
        pays:[]
     }

    handlePeopleNameChange = ({currentTarget})=>{
        const peoples = [...this.state.peoples]
        const person = this.state.peoples.find(p=>'i'+p.id===currentTarget.id)
        person.name = currentTarget.value
        this.setState({peoples})
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

      handlePayChange = ({currentTarget})=>{
        const pays = [...this.state.pays]
        const pay = pays.find(pay=>pay.id===currentTarget.id.substring(2))
        pay[currentTarget.name]=currentTarget.value
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
      
      togglePaidFor = (personId,payId)=>{
        const pays = [...this.state.pays]
        const pay = pays.find(pay=>pay.id===payId)
        if (pay.paidFor.includes(personId)){
            const index = pay.paidFor.indexOf(personId)
            pay.paidFor.splice(index,1)
        }else{
            pay.paidFor.push(personId)
        }
        this.setState({pays})
        
      }

      fullPaidFor = (payId)=>{
        const pays = [...this.state.pays]
        const pay = pays.find(pay=>pay.id===payId)
        pay.paidFor = []
        this.state.peoples.map(person=>pay.paidFor.push(person.id))
        this.setState({pays})
      }


    render() { 
        return (
            <div>
                <button 
                    className='btn btn-dark add-people-button'
                    onClick={this.addPeople}  
                    >اضافه کردن افراد
                </button>
                <div className="row"> 
                    {this.state.peoples.map(person=> 
                        <div className="col-sm-3 mb-3 mb-sm-0" key={person.id}>                        
                            <div className="card people-card" >
                                <input 
                                    type='text' 
                                    className='badge-input'
                                    value={person.name}
                                    id = {'i'+person.id}
                                    onChange={this.handlePeopleNameChange}
                                    placeholder='نام'
                                    autoFocus >
                                </input>
                                {person.motherPay && 
                                    <div className="motherpay-text">
                                        <span className="text-success">مادرخرج</span>
                                    </div> 
                                }
                                {person.motherPay ||
                                <div>
                                    <button 
                                        className="btn btn-success" 
                                        id={'m'+person.id}
                                        onClick={this.setMotherPay}
                                        style={{'font-size':'14px'}}>
                                            تعیین به عنوان مادرخرج
                                    </button>
                                </div>
                                }
                                
                                <div>
                                    <button 
                                        className="btn btn-primary peoples-button" 
                                        onClick={this.addPay} id={'s'+person.id}>
                                            افزودن هزینه کرد
                                    </button>
                                </div>                               
                                                   
                                <PayCard 
                                    personId={person.id} 
                                    pays={this.state.pays} 
                                    onPayPropertyChange={this.handlePayChange} 
                                    peoples = {this.state.peoples}
                                    togglePaidFor={this.togglePaidFor} 
                                    fullPaidFor = {this.fullPaidFor}
                                />
                                
                                    
                            </div>
                        </div>        
                    )}
                    
                </div>
            </div> 
        );
    }
}
 
export default PeoplesCards;
