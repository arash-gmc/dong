export const validateAll = (peoples, pays) => {
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
      errs["pn:" + pay.id] = pay.isTakeing
        ? "برای دریافت یه اسم بذار"
        : "برای پرداخت یه اسم بذار";
    }

    if (pay.equal) {
      if (pay.amount === "" || pay.amount === 0) {
        errs["pa:" + pay.id] = pay.isTakeing
          ? "پول دریافت شده رو بنویس"
          : "پول خرج شده رو بنویس";
      }
      if (pay.paidFor.length === 0) {
        errs["pf:" + pay.id] = "حداقل یک نفر رو انتخاب کن";
      }
    } else {
      if (pay.unequalPays.filter((ueqp) => ueqp.money).length === 0) {
        errs["pq:" + pay.id] = pay.isTakeing
          ? "حداقل برای یک نفر دریافت بنویس"
          : "حداقل برای یک نفر پرداخت بنویس";
      }
    }
  });

  return errs;
};
