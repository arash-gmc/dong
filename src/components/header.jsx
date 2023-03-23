import React from 'react';

const SiteHeader = () => {
    return (
        <div> 
            <div className='d-none d-md-block header mb-5'>
                <div className='header-logo'>
                    <img src='./new-logo.png'></img> 
                </div>
                <div className='header-text'>
                    <h3>دنگ آنلاین</h3>
                    <p>محاسبه ی آنلاین دنگ سفر</p>
                </div>
            </div>

            <div className='d-md-none header-md mb-2'>
                <img src='./new-logo.png'></img> 
                <h4>دنگ آنلاین</h4>
            </div>
        </div>
     );
}
 
export default SiteHeader;