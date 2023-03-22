import React, { Component } from 'react';
import '../styles/starter.css'


class Starter extends Component {
    state = { 
        peoplesName : [],
        showFields : false,
     }
     nums = ['اول','دوم','سوم','چهارم','پنجم','ششم','هفتم','هشتم','نهم','دهم','یازدهم','دوازدهم'] 
    
     showNumber = (n)=>{
        if (n<12)
            return this.nums[n]
        return ('نفر شماره '+(n+1))    
     }

     addPerson = ()=>{
        const peoplesName = [...this.state.peoplesName] 
        peoplesName.push({id:Date.now() + '',name:''})
        this.setState({peoplesName})
     }

     handleNameChange = ({currentTarget})=>{
        const peoplesName = [...this.state.peoplesName]
        const person = peoplesName.find(p=>'si:'+p.id===currentTarget.id)
        person.name = currentTarget.value
        this.setState({peoplesName})
     }

     deletePeoples = (personId)=>{
        if (this.state.peoplesName.length<2)            
            return
        const peoplesName = this.state.peoplesName.filter(p=>p.id!==personId)
        this.setState({peoplesName})
     }

     nextStep = ()=>{
        const addOnePeople = ()=>{
            this.props.mainAddPeople(peoplesName[i].id,peoplesName[i].name)
            if(i<peoplesName.length-1)
                setTimeout(addOnePeople,20)
            i++
            
        }
        const peoplesName = this.state.peoplesName.filter(p=>p.name)
        let i=0
        addOnePeople()
        
     }

     componentDidMount(){
        this.addPerson()
        setTimeout(()=>{
            this.addPerson()
        },50)
        setTimeout(()=>{
            this.addPerson()
        },300)
        
     }
    
     render() { 

        if (!this.state.showFields)
        return (  
                <div className='col-md-4 col-12 m-auto pt-4'>
                    <button 
                        className='btn btn-lg btn-dark add-people-button mt-3'
                        onClick={()=>this.setState({showFields:true})}  
                        >با اضافه کردن دوستات شروع کن 
                    </button>
                </div>
                );

        return(
            <div className='mt-4 p-3 back'>
                <h4 className='mb-4'>اسم دوستات رو بنویس</h4>
                {this.state.peoplesName.map((people,index)=>
                <div key = {people.id} className='my-2'>
                    <input 
                        type='text'                        
                        placeholder={'اسم نفر '+this.showNumber(index) }
                        value = {people.name}
                        onChange = {this.handleNameChange}
                        id={'si:'+people.id}
                         >
                    </input>
                    <button 
                        className='btn btn-danger mx-2' 
                        onClick={()=>this.deletePeoples(people.id)}
                        disabled = {this.state.peoplesName.length<2}                    
                        >حذف
                    </button>

                </div>  
                )}
                <div>
                    <span className='text-danger my-0 error'>{this.state.err}</span>
                </div>
                <div className='mt-4'>
                    <button className='btn btn-primary mx-1' onClick={this.addPerson}>
                        یه نفر دیگه
                    </button>
                    <button 
                        className='btn btn-success mx-1' 
                        onClick={this.nextStep}
                        disabled={this.state.peoplesName.filter(p=>p.name).length<2}>
                        مرحله بعد
                    </button>
                </div>
            </div>
        )
    }
}
 
export default Starter;