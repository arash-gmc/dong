const setEnglishNumber = (lastChar)=>{

    const persianNumbers = "۰۱۲۳۴۵۶۷۸۹";
    const arabicNumbers = "٠١٢٣٤٥٦٧٨٩";
    const englishNumbers = "0123456789";
      
    if (englishNumbers.includes(lastChar)) return lastChar
    if (persianNumbers.includes(lastChar)) 
        return englishNumbers[persianNumbers.indexOf(lastChar)];

    if (arabicNumbers.includes(lastChar))     
        return englishNumbers[arabicNumbers.indexOf(lastChar)];
    
    if (isNaN(Number(lastChar))) return ''

    
}

export default setEnglishNumber