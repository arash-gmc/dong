import React from 'react';

const AddPeopleButton = ({onClick}) => {
    return ( 
        <button 
          className='btn btn-dark add-people-button'
          onClick={onClick}  
        >اضافه کردن افراد
        </button>
     );
}
 
export default AddPeopleButton
