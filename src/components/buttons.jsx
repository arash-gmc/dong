import React from 'react';
import '../styles/buttons.css'

const Buttons = ({addPeople,displayResults,saveData,resetAll,isStored,showResult}) => {
    return ( 
        <div>
            <button className='btn btn-dark add-people-button d-block w-100'
                onClick={()=>addPeople(Date.now()+'','')}  
                >افزودن
            </button>                            
            <button 
                className='btn btn-dark add-people-button mt-2 d-block m-auto w-100'
                onClick={displayResults}
                disabled={showResult}>
                    نتیجه
            </button>
            <button className='btn btn-dark add-people-button mt-2 d-block w-100'
                onClick={saveData}
                disabled = {isStored()} 
                >ذخیره
            </button>
            <button className='btn btn-dark add-people-button mt-2 d-block w-100'
                onClick={resetAll} 
                >ریست
            </button>
        </div>
     );
}
 
export default Buttons;