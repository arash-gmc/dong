import React from 'react';
import '../styles/buttons.css'

const Buttons = ({addPeople,displayResults,saveData,resetAll}) => {
    return ( 
        <div className='col-lg-1 col-md-2 col-3 position-fixed fixed-right back-button py-3'>
            <button className='btn btn-dark add-people-button d-block w-100'
                onClick={()=>addPeople(Date.now()+'','')}  
                >یه نفر دیگه
            </button>                            
            <button 
                className='btn btn-dark add-people-button mt-2 d-block m-auto w-100'
                onClick={displayResults}>
                    <a href='./#results'>دیدن نتیجه</a>
            </button>
            <button className='btn btn-dark add-people-button mt-2 d-block w-100'
                onClick={saveData} 
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