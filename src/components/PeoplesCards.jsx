import React from "react";

const PeoplesCards = ({peoples,onChange,addPay,setMotherPay}) => {
    return ( 
        <div className="row">
          {peoples.map(p=>
              <div 
                className="col-sm-2 mb-3 mb-sm-0"
                key={p.id}
                id = {'s'+p.id}>

                <div className="card people-card">
                    <input 
                        type='text' 
                        className='badge-input'
                        value={p.name}
                        id = {'i'+p.id}
                        onChange={onChange}
                        placeholder='نام'
                        autoFocus >
                    </input>
                    {p.motherPay && 
                        <div className="motherpay-text">
                            <span className="text-success">مادرخرج</span>
                        </div> 
                    }
                    {p.motherPay ||
                    <div>
                        <button 
                            className="btn btn-success" 
                            id={'m'+p.id}
                            onClick={setMotherPay}>
                                تعیین مادرخرج
                        </button>
                    </div>
                    }
                    
                    <div>
                        <button className="btn btn-primary peoples-button" onClick={addPay} id={'s'+p.id}>افزون خرج</button>
                    </div>
                </div>        
            </div>
          
            
          )}    
        </div>    
     );
}
 
export default PeoplesCards;