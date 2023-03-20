import React,{Component} from 'react';
import '../styles/results.css'

class Result extends Component { 
    state={
        result:[],
        errMessage:''
    }

    claculate = ()=>{
        let result = []
        this.props.peoples.map(person=>{
            let paid = 0
            let paidForHim = 0
            this.props.pays.map(pay=>{
                const money = Number(pay.amount)
                if (pay.ownerId===person.id)
                    paid += money
                if (pay.paidFor.includes(person.id))
                    paidForHim += (money/pay.paidFor.length)         
            })
            result.push({
                id : person.id,
                name: person.name,
                dong: Math.ceil(paidForHim-paid)
            })
        })
        this.setState({result})
        
    }

    componentDidMount(){
        let errMessage = ''
        if (this.props.peoples.length<2)
            errMessage = 'برای حساب کردن دنگ حداقل دو نفر لازم داری'
        else if (this.props.pays.length<1)
            errMessage = 'برای حساب کردن دنگ حداقل یه هزینه باید تعریف کنی' 
        else if (!this.validateAll())
            errMessage = 'اطلاعاتی که وارد کردی یه مشکلی داره. دوباره چک کن.'       
        else
            this.claculate()    
        this.setState({errMessage}) 
        

    }

    validateAll = ()=>{

        if(!this.props.pays.every(pay=> this.props.validate('pn:'+pay.id)))
            return false
        
        if(!this.props.pays.every(pay=> this.props.validate('pa:'+pay.id)))
            return false

        if(!this.props.pays.every(pay=> this.props.validate('pf:'+pay.id)))
            return false    

        if(!this.props.peoples.every(person=> this.props.validate('pr:'+person.id)))
            return false    
        
            
        return true

    }

    
    render(){
        //const {motherPay}  = this.props
        const {result,errMessage} = this.state 
        const motherPay= this.props.peoples.find(p=>p.motherPay)
        return ( 
            <div className='m-auto mt-2'>
                <div className='result-header p-1'>
                    <h3>نتیجه</h3>

                </div>

                {errMessage&&<div className='card result-card mx-1 text-danger pt-2'>
                    <p>{errMessage}</p>
                    
                </div>}
                
                {!errMessage&&<div className='card result-card mx-1 pt-2'>
                    <p>دنگ همه حساب شد و نتیجه اینه:</p>
                    {result.map(r=>
                        <div className='align-items-right' key={r.id}>
                            {motherPay.id!==r.id && r.dong>0 &&
                                <p key={r.id} className='text-left'>
                                    &#x2022; {r.name} باید به {motherPay.name} مبلغ {r.dong} هزار تومن بده.
                                </p>
                            }
                            {motherPay.id!==r.id && r.dong<0 &&
                                <p key={r.id}>
                                    &#x2022; {r.name} باید از {motherPay.name} مبلغ {-r.dong} هزار تومن بگیره.
                                </p>
                            }
                            {motherPay.id!==r.id && r.dong===0 &&
                                <p key={r.id}>
                                    &#x2022; {r.name} حسابش تسویه هست.
                                </p>
                            }
                            
                        </div>
                        
                    
                    )}
                
                </div>}
                
            </div>
        );
    }    
}
 
export default Result;