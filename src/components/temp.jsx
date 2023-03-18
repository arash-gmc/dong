import React, { Component } from 'react';

class PayCard extends Component {
    
     
     
    render() { 
        const {pays,onPayNameChange,onPayAmountChange,personId,peoples,togglePaidFor,fullPaidFor,errs} = this.props
        const personPays = pays.filter(p=>p.ownerId===personId)
        return (
            <div className="accordion accordion-flush open mt-0" id={'fl'+personId}>
                {personPays.map(pay=> 
                    <div className="accordion-item" key={pay.id}>
                        <h2 className="accordion-header" id="flush-headingOne">
                            <button className="accordion-button my-accordion-button " type="button" data-bs-toggle="collapse" data-bs-target={'#ac'+pay.id} aria-expanded="true" aria-controls="flush-collapseOne">
                               <span>{pay.name}</span>
                            </button>
                        </h2>
                        <div id={'ac'+pay.id} className="accordion-collapse collapse show" aria-labelledby="flush-headingOne" data-bs-parent={'#fl'+personId}>
                            <div className="accordion-body">
                                <div>
                                    <input 
                                        type='text' 
                                        value={pay.name}
                                        id = {'pn:'+pay.id}
                                        name= 'payName'
                                        onChange={onPayNameChange}
                                        placeholder='نام هزینه'
                                        maxLength='48'
                                        autoFocus >
                                    </input>
                                </div>
                                <div className='validation-error'>{errs['pn:'+pay.id]}</div>

                                <div>
                                    <input 
                                        type='text' 
                                        value={pay.amount}
                                        id = {'pa:'+pay.id}
                                        name = 'payAmount'
                                        onChange={onPayAmountChange}
                                        placeholder='مقدار هزینه'
                                        className='amount-input'
                                        maxLength='16'
                                        >
                                    </input>
                                    <span className='hezar'>هزار تومان</span>
                                </div>
                                <div className='validation-error'>{errs['pa:'+pay.id]}</div>

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
