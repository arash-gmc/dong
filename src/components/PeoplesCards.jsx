import React, { Component } from 'react';
import PayCard from "./payCard";
import Result from "./result"

class PeoplesCards extends Component {
    state = { 
        peoples : [],
        pays:[],
        errs:{},
        result: []
     }

    errMsg = {
        personName : '',
        payName: '',
        payAmount: ''
    } 

    handlePeopleNameChange = ({currentTarget})=>{
        const peoples = [...this.state.peoples]
        const person = this.state.peoples.find(p=>'pr:'+p.id===currentTarget.id)
        person.name = currentTarget.value
        this.setState({peoples})
        this.validate(currentTarget.id)
    } 

    findMotherPay = ()=>{
        return this.state.peoples.some(p=>p.motherPay)
    }

    addPeople = ()=>{
        const peoples = [...this.state.peoples]
        const isValidate = peoples.every(p=> this.validate('pr:'+p.id))
        if (!isValidate) return
        peoples.push({
            id: Date.now()+'',
            name: '',
            motherPay: !this.findMotherPay()
        })
        this.setState({peoples})
    }

    setMotherPay = ({currentTarget})=>{
        const peoples = [...this.state.peoples]
        const person = peoples.find(p=>'m'+p.id==currentTarget.id)
        peoples.map(p=>p.motherPay=false)
        person.motherPay=true
        this.setState({peoples})
      }

    

      handlePayNameChange = ({currentTarget})=>{
        const pays = [...this.state.pays]
        const pay = pays.find(pay=>pay.id===currentTarget.id.substring(3))
        pay.name=currentTarget.value
        this.setState({pays})
        this.validate(currentTarget.id)
      }

      handlePayAmountChange = ({currentTarget})=>{
        if(!'0123456789'.includes(currentTarget.value.slice(-1)))
            return ;
        const pays = [...this.state.pays]
        const pay = pays.find(pay=>pay.id===currentTarget.id.substring(3))
        pay.amount=currentTarget.value
        this.setState({pays})
        this.validate(currentTarget.id)
        
        
      }
      
      addPay = ({currentTarget})=>{
        if(!this.validate(currentTarget.id)) return ;
        const ownerId = currentTarget.id.substring(3)
        const newPay = {
          id: Date.now()+'',
          ownerId,
          name: '',
          amount: '',
          show:true,
          paidFor: [],
        } 
        const pays = [...this.state.pays]
        pays.push(newPay)
        this.setState({pays})
        
      } 
      
      togglePaidFor = (personId,payId)=>{
        const pays = [...this.state.pays]
        const pay = pays.find(pay=>pay.id===payId)
        if (pay.paidFor.includes(personId)){
            const index = pay.paidFor.indexOf(personId)
            pay.paidFor.splice(index,1)
        }else{
            pay.paidFor.push(personId)
        }
        this.setState({pays})
        
      }

      fullPaidFor = (payId)=>{
        const pays = [...this.state.pays]
        const pay = pays.find(pay=>pay.id===payId)
        pay.paidFor = []
        this.state.peoples.map(person=>pay.paidFor.push(person.id))
        this.setState({pays})
      }

      togglePayDisplay = (payId)=>{
        const pays = this.state.pays
        const pay = pays.find(pay=>pay.id==payId)
        pay.show = !pay.show
        this.setState({pays})
      }

      validate = (input)=>{
        const splited = input.split(':')
        const typeChar = splited[0]
        const id = splited[1]
        const errs = {...this.state.errs}
        errs[input] = ''
        switch (typeChar) {
            case 'pr' :
                const person = this.state.peoples.find(p=>p.id === id)
                if (person.name === ''){
                    errs[input] = 'اسم باید وارد بشه' 
                    this.setState({errs})
                    return false
                }
                this.setState({errs})
                return true
                
            case 'pn' :
                const pay1 = this.state.pays.find(p=>p.id === id)
                if (pay1.name === ''){
                    errs[input] = 'برای هزینت یه اسم بذار' 
                    this.setState({errs})
                    return false
                }
                this.setState({errs})
                return true
            case 'pa' :
                const pay2 = this.state.pays.find(p=>p.id === id)
                if (pay2.amount === ''){
                    errs[input] = 'پول خرج شده رو بنویس' 
                    this.setState({errs})
                    return false
                }
                this.setState({errs})
                return true
            
        }
      }

    claculate = ()=>{
        let result = []
        this.state.peoples.map(person=>{
            let paid = 0
            let paidForHim = 0
            this.state.pays.map(pay=>{
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

    render() { 
        return (
            <div>
                {this.state.peoples.length===0 &&<button 
                    className='btn btn-dark add-people-button mt-3'
                    onClick={this.addPeople}  
                    >با اضافه کردن دوستات شروع کن 
                </button>}
                <div className="row d-flex flex-row"> 
                    {this.state.peoples.map(person=> 
                        <div className="col-sm-3 mb-0" key={person.id}>                        
                            <div className="card people-card" >
                                <div className='mb-3'>
                                    <input 
                                        type='text' 
                                        className={this.state.errs['pr:'+person.id] ? 'input-badge border-danger' : 'input-badge'}
                                        value={person.name}
                                        name='personName'
                                        id = {'pr:'+person.id}
                                        onChange={this.handlePeopleNameChange}
                                        maxLength='32'
                                        placeholder='اسم'
                                        autoFocus >
                                    </input>
                                    <div className='validation-error'>{this.state.errs['pr:'+person.id]}</div>
                                </div>
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
                                        onClick={this.setMotherPay}
                                        style={{'fontSize':'14px'}}>
                                            تعیین به عنوان مادرخرج
                                    </button>
                                </div>
                                }
                                
                                <div>
                                    <button 
                                        className="btn btn-primary peoples-button" 
                                        onClick={this.addPay} id={'pr:'+person.id}>
                                            افزودن هزینه کرد
                                    </button>
                                </div>                                       
                            </div>
                                <PayCard 
                                    personId={person.id} 
                                    pays={this.state.pays} 
                                    onPayNameChange={this.handlePayNameChange}
                                    onPayAmountChange={this.handlePayAmountChange}
                                    peoples = {this.state.peoples}
                                    togglePaidFor={this.togglePaidFor} 
                                    fullPaidFor = {this.fullPaidFor}
                                    errs = {this.state.errs}
                                    togglePayDisplay = {this.togglePayDisplay}
                                />
                        </div>        
                    )}
                    
                    {this.state.peoples.length>0 && <div className='col-sm-3 mb-3 mb-sm-0'>
                        <button className='btn btn-dark add-people-button mt-5 d-block m-auto w-50'
                            onClick={this.addPeople}  
                            >+ یه نفر دیگه
                        </button>
                        {this.state.peoples.length>1 && <button 
                            className='btn btn-dark add-people-button mt-3 d-block m-auto w-50'
                            onClick={this.claculate}    
                                >دیدن نتایج
                            </button>}
                    </div>}

                    {this.state.peoples.length>1 && this.state.pays.length>0 && <div className='col-12 row mb-3 mb-sm-0'>
                      <Result result={this.state.result} motherPay={this.state.peoples.find(p=>p.motherPay)}/> 
                    </div>}
                    
                </div>
            </div> 
        );
    }
}
 
export default PeoplesCards;
