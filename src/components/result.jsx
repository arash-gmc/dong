import React from 'react';
import '../styles/results.css'
const Result = ({result,motherPay,errMessage}) => {
    
    return ( 
        <div className='m-auto mt-2' id='results'>
            <div className='result-header p-1'>
                <h3>نتیجه</h3>

            </div>

            {errMessage&&<div className='card result-card mx-1 text-danger'>
                <p>{errMessage}</p>
            </div>}
            
            {!errMessage&&<div className='card result-card mx-1 pt-2'>
                <p>دنگ همه با موفقیت حساب شد و نتیجه اینه:</p>
                {result.map(r=>
                    <div className='align-items-right'>
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
 
export default Result;