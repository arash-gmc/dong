export const validateAll = (peoples,pays)=>{
    const errs = {};
    peoples.forEach((person) => {
        if (person.name === "") {
          errs["pr:" + person.id] = "اسم باید وارد بشه";
        }
        if (peoples.filter((p) => p.name === person.name).length > 1) {
          errs["pr:" + person.id] = "این اسم رو دو بار وارد کردی";
        }
      });
    pays.forEach((pay) => {
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
      });

      return errs
}