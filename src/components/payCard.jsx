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
        const {pay,onPayNameChange,onPayAmountChange,peoples,togglePaidFor,errs,togglePayDisplay,deletePay,togglePayType,handleUnequalPayPrice} = this.props
        
        return (
                <div className={'my-1 position-relative pay-div '+(this.state.hide ? 'hide':'')}>
                    <div className='window-header p-1 text-right border-ganger' onClick={()=>togglePayDisplay(pay.id)}>
                        <span className={errs['pn:'+pay.id]||errs['pa:'+pay.id]||errs['pf:'+pay.id]||errs['pq:'+pay.id]?'text-danger':''}>{pay.name}</span>
                        <span className='text-danger'>{errs['pn:'+pay.id] ? '!!!':''}</span>
                    </div>
                    <span className='position-absolute delete-cross rounded-circle' onClick={()=>deletePay(pay.id)}>&#10005;</span>
                    <div className={'mx-2 mx-lg-0 window-body '+(pay.show ? '':'zero-height')}>
                        <div className='p-3'>
                            
                            <div className='mb-2'>
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
                                
                                <div className='row'>
                                    <span className='col-5 my-2 px-0'>نوع پرداخت</span>
                                    <span className='on px-2 py-1 mb-0 col-5'
                                    onClick={()=>togglePayType(pay.id)}>
                                        {pay.equal ? 'برابر' : 'نابرابر'}
                                    </span>
                                </div>
                            </div>

                            {pay.equal&&<div>
                                
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
                                        <div className='on mb-0' onClick = {()=>togglePaidFor('all',pay.id)}>
                                            انتخاب همه
                                        </div>
                                    </div> 
                                    <div className='validation-error'>{errs['pf:'+pay.id]}</div>                               
                                </div>

                                <div>
                                    <span>مبلغ کل: </span>
                                    <input 
                                        type='text' 
                                        value={pay.amount}
                                        id = {'pa:'+pay.id}
                                        name = 'payAmount'
                                        onChange={onPayAmountChange}
                                        placeholder='0'
                                        className='amount-input'
                                        maxLength='10'
                                        >
                                    </input>
                                    <span className='hezar'>هزار تومان</span>
                                </div>
                                <div className='validation-error'>{errs['pa:'+pay.id]}</div>

                            </div>}

                            {!pay.equal&&<div className='mb-3'>

                                <div className='mb-3'>مقدار هزینه شده برای هرکس:</div>

                                {peoples.map(person=>
                                    <div key={person.id} className='my-2 unequal row'>
                                        <span className='col-5 text-start'>{person.name}</span>
                                        <input 
                                            id={'pq:'+pay.id+':'+person.id}
                                            onChange={handleUnequalPayPrice}
                                            value={pay.unequalPays.find(p=>p.id===person.id).money}
                                            placeholder='0'
                                            maxLength='8'
                                            className='col-3'/>
                                        <span className='col-3 hezar'>هزار تومان</span>    
                                    </div>
                                    
                                )}
                                <div className='validation-error'>{errs['pq:'+pay.id]}</div>     
                                
                            </div>}
                    
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
