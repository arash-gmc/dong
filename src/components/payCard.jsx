import React, { Component } from 'react';
import '../styles/payCard.css'

class PayCard extends Component {
    state = { hide:true } 
    componentDidMount(){
        setTimeout(()=>{
            this.setState({hide:false})
        },100)
    }
     
     
    render() { 
        const {pay,onPayNameChange,onPayAmountChange,peoples,togglePaidFor,errs,togglePayDisplay,deletePay} = this.props
        
        return (
                <div className={'my-1 position-relative pay-div '+(this.state.hide ? 'hide':'')}>
                    <div className='window-header p-1 text-right border-ganger' onClick={()=>togglePayDisplay(pay.id)}>
                        <span className={errs['pn:'+pay.id]||errs['pa:'+pay.id]||errs['pf:'+pay.id]?'text-danger':''}>{pay.name}</span>
                        <span className='text-danger'>{errs['pn:'+pay.id] ? '!!!':''}</span>
                    </div>
                    <span className='position-absolute delete-cross rounded-circle' onClick={()=>deletePay(pay.id)}>&#10005;</span>
                    <div className={'mx-2 mx-lg-0 window-body '+(pay.show ? '':'zero-height')}>
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
                                        className='w-75'
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
                                        placeholder='مقدار'
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
                                    <div className='on mb-1' onClick = {()=>togglePaidFor('all',pay.id)}>
                                        انتخاب همه
                                    </div>
                                </div> 
                                <div className='validation-error'>{errs['pf:'+pay.id]}</div>                               
                            </div>

                            <div>
                                <button className='btn btn-primary' onClick={()=>togglePayDisplay(pay.id)}>حله</button>
                            </div>

                        
                        </div>

                    </div>
                </div>
               
        );
    }
}
 
export default PayCard;
