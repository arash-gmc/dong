
export const validateOne = (input,peoples,pays)=>{
    const splited = input.split(":");
    const typeChar = splited[0];
    const id = splited[1];
    
    switch (typeChar) {
      case "pr":
        const person = peoples.find((p) => p.id === id);
        if (person.name === "") {
          return "اسم باید وارد بشه";
        }
        if (
          peoples.filter((p) => p.name === person.name).length > 1
        ) {
          return "این اسم رو دو بار وارد کردی";
        }
        return true;

      case "pn":
        const pay1 = pays.find((p) => p.id === id);
        if (pay1.name === "") {
          return "برای هزینه یه اسم بذار";
        }
        return true;

      case "pa":
        const pay2 = pays.find((p) => p.id === id);
        if (pay2.amount === "" || pay2.amount === 0) {
          return "پول خرج شده رو بنویس";
        }
        return true;

      case "pf":
        const pay3 = pays.find((p) => p.id === id);
        if (pay3.paidFor.length === 0) {
          return "حداقل یک نفر رو انتخاب کن";
        }
        return true;

      case "pq":
        const pay4 = pays.find((p) => p.id === id);
        if (pay4.unequalPays.filter((ueqp) => ueqp.money).length === 0) {
          return "حداقل برای یک نفر هزینه بنویس";
        }
        return true;
      default:
        return true;
    }
}