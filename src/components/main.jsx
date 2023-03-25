import React, { Component } from 'react';
import _ from 'lodash'
import PayCard from "./payCard";
import Result from "./result"
import '../styles/main.css'
import Starter from './starter';
import Buttons from './buttons';
import PeoplesCard from './PeoplesCard';
import SiteHeader from './header';

class Main extends Component {
    state = { 
        peoples : [],
        pays:[],
        errs:{},
        showResult:true,
     }

    saveData = ()=>{
        
        localStorage.setItem('data',JSON.stringify({peoples:this.state.peoples,pays:this.state.pays}))
        this.setState({})
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
            showResult:false})
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

    isStored = ()=>{
        const stored = JSON.parse(localStorage.getItem('data'))
        if(!stored) return false
        return _.isEqual(this.state.peoples, stored.peoples)&&
            _.isEqual(this.state.pays,stored.pays)
    }
   
    addPeople = (id,name)=>{
        this.setState({showResult:false})
        const peoples = [...this.state.peoples]
        if(!this.validateAll()) return ;
        const pays = [...this.state.pays]
        pays.forEach(pay=>pay.show=false)
        const findMotherPay = ()=>{
            return this.state.peoples.some(p=>p.motherPay)
        }
        peoples.push({
            id,
            name,
            motherPay: !findMotherPay()
        })
        this.setState({peoples,pays})
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

    addPay = (personId)=>{
        this.setState({showResult:false})
        if(!this.validateAll()) return ;
        if(this.state.peoples.length===1){
            this.setState({fristPayWarning:true})
            setTimeout(()=>{
                this.setState({fristPayWarning:false})
            },4000)
            return
        }
        const ownerId = personId
        const newPay = {
            id: Date.now()+'',
            ownerId,
            name: '',
            amount: '',
            show:false,
            paidFor: [],
        } 
        const pays = [...this.state.pays]
        pays.map(pay=>pay.show=false)
        pays.push(newPay)
        this.setState({pays})
        setTimeout(()=>{newPay.show=true;this.setState({pays})},500)
    } 

    deletePay = (payId)=>{
        this.setState({showResult:false})
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
        this.setState({showResult:false})
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
        delete errs[input]
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

    validateAll = ()=>{

        let OK = true
        const {pays,peoples} = this.state
        const errs = {}

        peoples.forEach(person=>{
            if (person.name===''){
                errs['pr:'+person.id] = 'اسم باید وارد بشه'
                OK = false
            }
            if(peoples.filter(p=>p.name==person.name).length>1){
                errs['pr:'+person.id] = 'این اسم رو دو بار وارد کردی'
                OK = false
            }
        })
        pays.forEach(pay=>{
            if (pay.name===''){
                errs['pn:'+pay.id] = 'برای هزینت یه اسم بذار' 
                OK = false 
            }
            if (pay.amount===''|| pay.amount === 0){
                errs['pa:'+pay.id] = 'پول خرج شده رو بنویس'  
                OK = false 
            }
            if (pay.paidFor.length===0){
                errs['pf:'+pay.id] = 'حداقل یک نفر رو انتخاب کن'  
                OK = false 
            }
        })

        
        
        this.setState({errs})    
        return OK

    }

    displayResults = ()=>{
        const pays = [...this.state.pays]
        pays.forEach(pay=>pay.show=false)
        this.setState(pays)
        this.setState({showResult:true});
    }
   
    
    componentDidMount(){
        if (this.loadData())
            this.setState(this.loadData())
        this.setState({showResult:false})    
    }

    

    render() {
        
        if (this.state.peoples.length===0)
        return(
            <Starter mainAddPeople = {this.addPeople} />
        )

        if (this.state.peoples.length>0)
        return (
            <div>
                <SiteHeader />
                <div className='row mt-md-5'>    
                    <div className='col-xl-1 col-sm-2 col-3 position-fixed fixed-right back-button py-md-3'>  
                        <Buttons
                            addPeople ={this.addPeople}
                            displayResults ={this.displayResults}
                            saveData = {this.saveData}
                            resetAll = {this.resetAll}
                            isStored = {this.isStored}
                            showResult = {this.state.showResult}
                        />
                    </div>    
                    <div className='col-3 col-sm-2 col-xl-1'></div>    
                    <div className="row col-9 col-sm-10 col-xl-8 px-md-2 p-0 me-sm-1"> 
                        {this.state.peoples.map(person=> 
                            <div className="col-lg-4 col-sm-6 mb-3" key={person.id}>                        
                                <PeoplesCard 
                                    deletePeople={this.deletePeople}
                                    errs = {this.state.errs}
                                    person = {person}
                                    handlePeopleNameChange = {this.handlePeopleNameChange}
                                    setMotherPay = {this.setMotherPay}
                                    addPay = {this.addPay}
                                />
                                <div className="mx-1 mx-lg-0">
                                    {this.state.pays.filter(p=>p.ownerId===person.id).map(pay=> 
                                        <PayCard 
                                            pay={pay} 
                                            key={pay.id}
                                            onPayNameChange={this.handlePayNameChange}
                                            onPayAmountChange={this.handlePayAmountChange}
                                            peoples = {this.state.peoples}
                                            togglePaidFor={this.togglePaidFor} 
                                            errs = {this.state.errs}
                                            togglePayDisplay = {this.togglePayDisplay}
                                            deletePay = {this.deletePay}
                                        />
                                    )}
                                </div>
                            </div>        
                        )}
                                    
                        
                    </div>
                    <div className='col-xl-3 d-none d-xl-block'>
                        {this.state.showResult && 
                            <Result  
                                pays = {this.state.pays}
                                peoples = {this.state.peoples}
                                validateAll = {this.validateAll}/>} 
                    </div>

                    <div className='d-none d-sm-block col-sm-2'></div>
                    <div className='d-xl-none col-sm-10 ' id='results'>
                            {this.state.showResult && 
                                    <Result  
                                        pays = {this.state.pays}
                                        peoples = {this.state.peoples}
                                        validateAll = {this.validateAll}
                                    />} 
                    </div>
                </div> 

            </div>
        );
    }
}
 
export default Main;
