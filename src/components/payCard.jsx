import React, { Component } from 'react';

class PayCard extends Component {
    
     
     
    render() { 
        const {pays,onPayPropertyChange,personId,peoples,togglePaidFor,fullPaidFor} = this.props
        const personPays = pays.filter(p=>p.ownerId===personId)
        return (
            <div className="accordion" >
            {personPays.map(pay=>
            <div className="accordion-item" key={pay.id}>
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
                                name= 'name'
                                onChange={onPayPropertyChange}
                                placeholder='نام هزینه'
                                autoFocus >
                            </input>
                        </div>
                        <div>
                            <input 
                                type='text' 
                                value={pay.amount}
                                id = {'pa'+pay.id}
                                name = 'amount'
                                onChange={onPayPropertyChange}
                                placeholder='مقدار هزینه'
                                >
                            </input>
                        </div>

                        <div className='texts'>
                            <span>هزینه شده برای</span>
                        </div>

                        <div className='row'>
                            {peoples.map(person=>
                                <div className='col-6' key={person.id}>
                                    <div className={pay.paidFor.includes(person.id) ? 'on':'off'} 
                                        onClick={()=>togglePaidFor(person.id,pay.id)}>
                                        {person.name}
                                    </div>
                                </div>
                            )}
                            <div className='col-12'>
                                <div className='on' onClick = {()=>fullPaidFor(pay.id)}>
                                    انتخاب همه
                                </div>
                            </div>
                           

                        </div>
                        
                        
                    </div>
                </div>
            </div>
                
            )}    
            
        </div> 
        );
    }
}
 
export default PayCard;
