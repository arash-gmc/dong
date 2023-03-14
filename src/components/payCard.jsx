import React from 'react';

const PayCard = ({pay,onPayNameChange}) => {
    return ( 
        <div className="accordion" >
            <div className="accordion-item">
                <h2 className="accordion-header w-100" id="headingOne">
                <button className="accordion-button w-100 m-0" type="button" data-bs-toggle="collapse" data-bs-target={'#ac'+pay.id} aria-expanded="true">
                    {pay.name}
                </button>
                </h2>
                <div id={'ac'+pay.id} className="accordion-collapse collapse show" >
                <div className="accordion-body">
                    <div>
                        <input 
                            type='text' 
                            value={pay.name}
                            id = {'pn'+pay.id}
                            onChange={onPayNameChange}
                            placeholder='نام هزینه'
                            autoFocus >
                        </input>
                    </div>
                    
                    
                </div>
                </div>
            </div>
        </div>  
     );
}
 
export default PayCard;