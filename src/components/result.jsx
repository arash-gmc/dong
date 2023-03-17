import React from 'react';

const Result = ({result,motherPay}) => {
    
    return ( 
        <div className='card result-card col-5 m-auto mt-5'>
            <h1>نتایج</h1>
            <h2></h2>
            <div>
                {result.map(r=>
                    <div className='align-items-right'>
                         {motherPay.id!==r.id && r.dong>0 &&
                            <p key={r.id} className='text-left'>
                                &#x2022; {r.name} باید به {motherPay.name} مبلغ {r.dong} تومن بده.
                            </p>
                        }
                        {motherPay.id!==r.id && r.dong<0 &&
                            <p key={r.id}>
                                &#x2022; {r.name} باید از {motherPay.name} مبلغ {-r.dong} تومن بگیره.
                            </p>
                        }
                        {motherPay.id!==r.id && r.dong==0 &&
                            <p key={r.id}>
                                &#x2022; {r.name} حسابش تسویه هست.
                            </p>
                        }
                    </div>
                   
                )}
                
            </div>
        </div>
     );
}
 
export default Result;