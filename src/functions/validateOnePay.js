

export const validateOnePay = (pay)=>{
    const errs={}
    if (pay.name === "") {
        errs["pn:" + pay.id] = "برای هزینه یه اسم بذار";
    }
    if (pay.equal) {
        if (pay.amount === "" || pay.amount === 0) {
          errs["pa:" + pay.id] = "پول خرج شده رو بنویس";
        }
        if (pay.paidFor.length === 0) {
          errs["pf:" + pay.id] = "حداقل یک نفر رو انتخاب کن";
        }
    } else {
        if (pay.unequalPays.filter((ueqp) => ueqp.money).length === 0) {
          errs["pq:" + pay.id] = "حداقل برای یک نفر هزینه بنویس";
        }
    }
    return errs
}