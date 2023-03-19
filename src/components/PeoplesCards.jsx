import React, { Component } from 'react';
import PayCard from "./payCard";
import Result from "./result"

class PeoplesCards extends Component {
    state = { 
        peoples : [],
        pays:[],
        errs:{},
        result: [],
        showResult:{
            show:false,
            message:''
        }
     }


    handlePeopleNameChange = ({currentTarget})=>{
        this.vanishResult() 
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
        this.vanishResult() 
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
        this.vanishResult() 
        const peoples = [...this.state.peoples]
        const person = peoples.find(p=>'m'+p.id===currentTarget.id)
        peoples.map(p=>p.motherPay=false)
        person.motherPay=true
        this.setState({peoples})
    }

    

      handlePayNameChange = ({currentTarget})=>{
        this.vanishResult() 
        const pays = [...this.state.pays]
        const pay = pays.find(pay=>pay.id===currentTarget.id.substring(3))
        pay.name=currentTarget.value
        this.setState({pays})
        this.validate(currentTarget.id)
    }

      handlePayAmountChange = ({currentTarget})=>{
         this.vanishResult() 
         const pays = [...this.state.pays]
         const pay = pays.find(pay=>pay.id===currentTarget.id.substring(3))
         if (currentTarget.value.length>pay.amount.length){
            const persianNumbers = '۰۱۲۳۴۵۶۷۸۹';
            const arabicNumbers = '٠١٢٣٤٥٦٧٨٩'
            const englishNumbers = '0123456789';
            const lastChar = currentTarget.value.slice(-1)

            if(persianNumbers.includes(lastChar) ){
                    let index = persianNumbers.indexOf(lastChar)
                    currentTarget.value = currentTarget.value.slice(0,-1) + englishNumbers[index]
            }

            if(arabicNumbers.includes(lastChar) ){
                let index = arabicNumbers.indexOf(lastChar)
                currentTarget.value = currentTarget.value.slice(0,-1) + englishNumbers[index]
            }

            if(!Number(currentTarget.value) && currentTarget.value!=='0')
                return

            if (currentTarget.value=='0'){
                return
            }    
         }
        pay.amount = currentTarget.value
        this.setState({pays})
        this.validate(currentTarget.id)
        
        
    }
      
      addPay = ({currentTarget})=>{
        this.vanishResult()       
        if(!this.validate(currentTarget.id)) return ;
        if(!this.validateAll()) return ;
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
        const pays = [...this.state.pays]
        const pay = pays.find(pay=>pay.id==payId)
        if (pay.show)
            if (this.validate('pn:'+payId) && this.validate('pa:'+payId)){
                pay.show = !pay.show
                this.setState({pays})
                return
            }
                
        if (!pay.show){
            pay.show=true
            pays.map(pay=>{
                if (pay.id!==payId)
                    pay.show=false
            })
            this.setState({pays})

        } 
           
        
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
                if (this.state.peoples.filter(p=>p.name==person.name).length>1){
                    errs[input] = 'این اسم رو دو بار وارد کردی' 
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
                if (pay2.amount === '' || pay2.amount === 0){
                    errs[input] = 'پول خرج شده رو بنویس' 
                    this.setState({errs})
                    return false
                }
                this.setState({errs})
                return true
            
        }
      }

    validateAll = ()=>{
        if(!this.state.pays.every(pay=> this.validate('pn:'+pay.id)))
            return false
        
        if(!this.state.pays.every(pay=> this.validate('pa:'+pay.id)))
            return false

        if(!this.state.peoples.every(person=> this.validate('pr:'+person.id)))
            return false    
        
        return true

    }

    
    
    dispalyResults = ()=>{
        const showResult = this.state.showResult
        showResult.show = true
        showResult.message=''
        if (this.state.peoples.length<2)
            showResult.message = 'برای حساب کردن دنگ حداقل دو نفر لازم داری'
        if (this.state.pays.length<1)
            showResult.message = 'برای حساب کردن دنگ حداقل یه هزینه باید تعریف کنی' 
        if (!this.validateAll())
            showResult.message = 'اطلاعاتی که وارد کردی یه مشکلی داره. دوباره چک کن.'       
        else
            this.claculate()
        this.setState({showResult}) 

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
    
    vanishResult = ()=>{
        if (this.state.showResult.show){
            const showResult = {...this.state.showResult}
            showResult.show = false
            this.setState({showResult})
        }
    }
    
    resetAll = ()=>{
        this.setState({
            peoples : [],
            pays:[],
            errs:{},
            result: [],
            showResult:{
                show:false,
                message:''
            }})
    }

    render() { 
        return (
            <div>
                <div>
                    {this.state.peoples.length===0 &&
                    <div className='col-md-4 col-12 m-auto pt-4'>
                        <button 
                            className='btn btn-lg btn-dark add-people-button mt-3'
                            onClick={this.addPeople}  
                            >با اضافه کردن دوستات شروع کن 
                        </button>
                    </div>}
                </div>
                <div className='row'>    
                    {this.state.peoples.length>0 && 
                        <div className='col-lg-1 col-md-2 col-3 pe-0 pe-sm-2 position-fixed fixed-right'>
                            <button className='btn btn-dark add-people-button mt-2 d-block w-100'
                                onClick={this.addPeople}  
                                >یه نفر دیگه
                            </button>
                            <button className='btn btn-dark add-people-button mt-2 d-block w-100'
                                onClick={this.resetAll} 
                                >ریست کردن
                            </button>
                            <button 
                                className='btn btn-dark add-people-button mt-2 d-block m-auto w-100'
                                onClick={this.dispalyResults}>
                                    <a href='./#results'>دیدن نتیجه</a>
                                </button>
                        </div>}
                    <div className='col-3 col-md-2 col-lg-1'></div>    
                    <div className="row col-9 col-md-10 col-lg-8 px-sm-2 p-0"> 
                        {this.state.peoples.map(person=> 
                            <div className="col-md-4 col-sm-6 mb-3" key={person.id}>                        
                                <div className="card people-card" >
                                    <div className='mb-3'>
                                        <input 
                                            type='text' 
                                            className={this.state.errs['pr:'+person.id] ? 'w-75 border-danger' : 'w-75'}
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
                        
                        

                        <div className='col-12 d-lg-none'>
                            {this.state.showResult.show && 
                                 <Result result={this.state.result} 
                                 motherPay={this.state.peoples.find(p=>p.motherPay)}
                                 errMessage ={this.state.showResult.message}/>} 
                        </div>
                        
                    </div>
                    <div className='col-lg-3 d-none d-lg-block'>
                        {this.state.showResult.show && 
                            <Result result={this.state.result} 
                                motherPay={this.state.peoples.find(p=>p.motherPay)}
                                errMessage ={this.state.showResult.message}/>} 
                    </div>
                </div> 
            </div>
        );
    }
}
 
export default PeoplesCards;
