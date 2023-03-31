import React, { Component } from 'react';
import '../styles/peoplesCard.css'

class PeoplesCard extends Component {
    state = { hide:true } 
    componentDidMount(){
        setTimeout(()=>{
            this.setState({hide:false})
        },100)
    }
    render() { 
        const {deletePeople,errs,person,handlePeopleNameChange,setMotherPay,addPay} = this.props
        return (<div className={"card people-card position-relative "+(this.state.hide ? 'hide':'')} >
                    <div className='position-absolute delete-icon rounded-circle' onClick={()=>deletePeople(person.id)}>&#10005;</div>
                        <div className='mb-2'>
                            <input 
                                type='text' 
                                className={'w-75 mt-2 '+ (errs['pr:'+person.id] ? 'error-border' : '')}
                                value={person.name}
                                name='personName'
                                id = {'pr:'+person.id}
                                onChange={handlePeopleNameChange}
                                maxLength='32'
                                placeholder='اسم'
                                autoFocus >
                            </input>
                            <div className='validation-error'>{errs['pr:'+person.id]}</div>
                        </div>
                    {person.motherPay && 
                        <div className='motherpay-text'>
                            <span className="text-success">&#10004; مادرخرج</span>
                        </div> 
                    }
                    {person.motherPay ||
                    <div>
                        <button 
                            className="btn btn-success" 
                            id={'m'+person.id}
                            onClick={setMotherPay}
                            style={{'fontSize':'14px'}}>
                                تعیین به عنوان مادرخرج
                        </button>
                    </div>
                    }
                    
                    <div className='position-relative'>
                        <button 
                            className="btn btn-primary peoples-button" 
                            onClick={()=>addPay(person.id)}>
                                اضافه کردن هزینه
                        </button>
                        
                    </div>                                       
                </div>);
    }
}
 
export default PeoplesCard;