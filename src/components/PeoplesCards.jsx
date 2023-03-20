import React, { Component } from 'react';
import PayCard from "./payCard";
import Result from "./result"
import '../styles/peoples.css'

class PeoplesCards extends Component {
    state = { 
        peoples : [],
        pays:[],
        errs:{},
        showResult:true,
        fristPayWarning:false
     }

    saveData = ()=>{
        localStorage.setItem('data',JSON.stringify(this.state))
    }

    loadData = ()=>{
        const data = JSON.parse(localStorage.getItem('data'))
        if(data)
            return data
    }

    resetAll = ()=>{
        this.setState({
            peoples : [],
            pays:[],
            errs:{},
            showResult:false,
            fristPayWarning:false})
        localStorage.removeItem('data')    
    }

    handlePeopleNameChange = ({currentTarget})=>{
        this.setState({showResult:false})
        const peoples = [...this.state.peoples]
        const person = this.state.peoples.find(p=>'pr:'+p.id===currentTarget.id)
        
        const similarPerson = this.state.peoples.find(p=>(p.name===person.name&&p.id!==person.id))
        if(similarPerson){
            const errs = this.state.errs
            errs['pr:'+similarPerson.id]=''
            this.setState(errs)
        }
        
        person.name = currentTarget.value
        this.setState({peoples})
        this.validate(currentTarget.id)
    } 

    handlePayNameChange = ({currentTarget})=>{
        this.setState({showResult:false})
        const pays = [...this.state.pays]
        const pay = pays.find(pay=>pay.id===currentTarget.id.substring(3))
        pay.name=currentTarget.value
        this.setState({pays})
        this.validate(currentTarget.id)
    }

    handlePayAmountChange = ({currentTarget})=>{
        this.setState({showResult:false})
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

   
    addPeople = ()=>{
        this.setState({showResult:false})
        const peoples = [...this.state.peoples]
        const isValidate = peoples.every(p=> this.validate('pr:'+p.id))
        if (!isValidate) return
        const findMotherPay = ()=>{
            return this.state.peoples.some(p=>p.motherPay)
        }
        peoples.push({
            id: Date.now()+'',
            name: '',
            motherPay: !findMotherPay()
        })
        this.setState({peoples})
    }

    deletePeople = (personId)=>{
        this.setState({showResult:false})
        let peoples = [...this.state.peoples]
        const deletedPerson = peoples.find(person=>person.id===personId)
        if(deletedPerson.motherPay){
            peoples[0].motherPay = true
        }
        peoples = peoples.filter(person=>person.id!==personId)
        this.setState({peoples})
        
        let pays = [...this.state.pays]
        pays = pays.filter(pay=>pay.ownerId!==personId)
        this.setState({pays})
    }

    addPay = ({currentTarget})=>{
        this.setState({showResult:false})
        if(!this.validate(currentTarget.id)) return ;
        if(this.state.peoples.length===1){
            this.setState({fristPayWarning:true})
            setTimeout(()=>{
                this.setState({fristPayWarning:false})
            },4000)
            return
        }
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
        pays.map(pay=>pay.show=false)
        pays.push(newPay)
        this.setState({pays})
    } 

    deletePay = (payId)=>{
        let pays = [...this.state.pays]
        pays = pays.filter(pay=>pay.id!==payId)
        this.setState({pays})
    }

    setMotherPay = ({currentTarget})=>{
        this.setState({showResult:false})
        const peoples = [...this.state.peoples]
        const person = peoples.find(p=>'m'+p.id===currentTarget.id)
        peoples.map(p=>p.motherPay=false)
        person.motherPay=true
        this.setState({peoples})
    }

      
    togglePaidFor = (personId,payId)=>{
        const pays = [...this.state.pays]
        const pay = pays.find(pay=>pay.id===payId)
        if (personId==='all'){
            pay.paidFor = []
            this.state.peoples.map(person=>pay.paidFor.push(person.id))
        }else{
            if (pay.paidFor.includes(personId)){
                const index = pay.paidFor.indexOf(personId)
                pay.paidFor.splice(index,1)
            }else{
                pay.paidFor.push(personId)
            }
        }
        this.setState({pays})
        this.validate('pf:'+payId)
    }

    togglePayDisplay = (payId)=>{
        const pays = [...this.state.pays]
        const pay = pays.find(pay=>pay.id==payId)
        if (pay.show)
            if (this.validate('pn:'+payId) &&
                this.validate('pa:'+payId) &&
                this.validate('pf:'+payId)){
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
            
            case 'pf' :
                const pay3 = this.state.pays.find(p=>p.id === id)
                if (pay3.paidFor.length===0){
                    errs[input] = 'حداقل یک نفر رو انتخاب کن' 
                    this.setState({errs})
                    return false
                }
                this.setState({errs})
                return true   
            
        }
    }
   
    
    componentDidMount(){
        if (this.loadData())
            this.setState(this.loadData())
            this.setState({showResult:false})
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
                            <button 
                                className='btn btn-dark add-people-button mt-2 d-block m-auto w-100'
                                onClick={()=>{this.setState({showResult:true});this.saveData()}}>
                                    <a href='./#results'>دیدن نتیجه</a>
                            </button>
                            <button className='btn btn-dark add-people-button mt-2 d-block w-100'
                                onClick={this.saveData} 
                                >ذخیره
                            </button>
                            <button className='btn btn-dark add-people-button mt-2 d-block w-100'
                                onClick={this.resetAll} 
                                >ریست
                            </button>
                        </div>}
                    <div className='col-3 col-md-2 col-lg-1'></div>    
                    <div className="row col-9 col-md-10 col-lg-8 px-sm-2 p-0"> 
                        {this.state.peoples.map(person=> 
                            <div className="col-md-4 col-sm-6 mb-3" key={person.id}>                        
                                <div className="card people-card position-relative" >
                                    <div className='position-absolute delete-icon rounded-circle' onClick={()=>this.deletePeople(person.id)}>&#10005;</div>
                                    <div className='mb-3'>
                                        <input 
                                            type='text' 
                                            className={'w-75 mt-2 '+ (this.state.errs['pr:'+person.id] ? 'border-danger' : '')}
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
                                        <div className='motherpay-text'>
                                            <span className="text-success">&#10004; مادرخرج</span>
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
                                    
                                    <div className='position-relative'>
                                        <button 
                                            className="btn btn-primary peoples-button" 
                                            onClick={this.addPay} id={'pr:'+person.id}>
                                                اضافه کردن هزینه
                                        </button>
                                        <div className={'position-absolute frist-pay-warning '+(this.state.fristPayWarning ? '':'d-none')}>
                                            <span>بهتره اول همه ی دوستات رو اضافه بکنی و بعد هزینه ی انجام شده هرکسی رو بنویسی.</span>
                                        </div>
                                    </div>                                       
                                </div>
                                    <PayCard 
                                        personId={person.id} 
                                        pays={this.state.pays} 
                                        onPayNameChange={this.handlePayNameChange}
                                        onPayAmountChange={this.handlePayAmountChange}
                                        peoples = {this.state.peoples}
                                        togglePaidFor={this.togglePaidFor} 
                                        errs = {this.state.errs}
                                        togglePayDisplay = {this.togglePayDisplay}
                                        deletePay = {this.deletePay}
                                    />
                            </div>        
                        )}
                                    
                        
                    </div>
                    <div className='col-lg-3 d-none d-lg-block'>
                        {this.state.showResult && 
                            <Result  
                                pays = {this.state.pays}
                                peoples = {this.state.peoples}
                                validate = {this.validate}/>} 
                    </div>
                </div> 

                <div className='col-12 d-lg-none' id='results'>
                        {this.state.showResult && 
                                <Result  
                                pays = {this.state.pays}
                                peoples = {this.state.peoples}
                                validate = {this.validate}/>} 
                </div>

            </div>
        );
    }
}
 
export default PeoplesCards;
