import React from "react";

const PeoplesCards = ({peoples,onChange,addPay}) => {
    return ( 
        <div>
          {peoples.map(p=>
              <span 
              className="people-badge badge" 
              key={p.id}
              id = {'s'+p.id} 
              onClick={addPay}>
                <input 
                  type='text' 
                  className='badge-input'
                  value={p.name}
                  id = {'i'+p.id}
                  onChange={onChange}
                  autoFocus ></input>
                  <h2 className='badge-plus'>+</h2>
              </span>
          )}    
        </div>    
     );
}
 
export default PeoplesCards;