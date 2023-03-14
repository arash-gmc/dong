import React from "react";
import PayCard from "./payCard";

const PeoplesCards = ({person,pays,onPeopleNameChange,addPay,setMotherPay,onPayNameChange}) => {
   
    return ( 
            <div 
            className="col-sm-3 mb-3 mb-sm-0"
            id = {'s'+person.id}>

            <div className="card people-card">
                <input 
                    type='text' 
                    className='badge-input'
                    value={person.name}
                    id = {'i'+person.id}
                    onChange={onPeopleNameChange}
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
                        onClick={setMotherPay}>
                            تعیین مادرخرج
                    </button>
                </div>
                }
                
                <div>
                    <button className="btn btn-primary peoples-button" onClick={addPay} id={'s'+person.id}>افزون خرج</button>
                </div>
                
                {pays.map(pay=>                    
                    <PayCard pay={pay} onPayNameChange={onPayNameChange} key={pay.id} />
                )}
                    
            </div>        
        </div>
          
            
           
     );
}
 
export default PeoplesCards;