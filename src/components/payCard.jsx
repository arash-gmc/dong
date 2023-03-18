import React, { Component } from 'react';
import '../styles/payCard.css'

class PayCard extends Component {
    
     
     
    render() { 
        const {pays,onPayNameChange,onPayAmountChange,personId,peoples,togglePaidFor,fullPaidFor,errs,togglePayDisplay} = this.props
        const personPays = pays.filter(p=>p.ownerId===personId)
        return (
            <div className="mx-3">
                {personPays.map(pay=> 
                    <div className='m-1' key={pay.id}>
                        <div className='window-header p-1 text-right' onClick={()=>togglePayDisplay(pay.id)}>
                            <span>{pay.name}</span>
                        </div>
                        <div className={pay.show ? 'mx-2 window-body':'zero-height mx-2 window-body'}>
                            <div className='p-3'>
                                <div className='mb-3'>

                                    <div>
                                        <input 
                                            type='text' 
                                            value={pay.name}
                                            id = {'pn:'+pay.id}
                                            name= 'payName'
                                            onChange={onPayNameChange}
                                            placeholder='نام هزینه'
                                            maxLength='46'
                                            className='w-100 mx-auto'
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
                                </div>

                                <div className='m-2'>
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

                                <div>
                                    <button className='btn btn-primary' onClick={()=>togglePayDisplay(pay.id)}>حله</button>
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
