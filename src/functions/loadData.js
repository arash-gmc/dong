export const loadData = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    const peoplesKeys = ["id", "name", "motherPay"];
    const payKeys = [
      "id",
      "ownerId",
      "name",
      "amount",
      "equal",
      "show",
      "paidFor",
      "unequalPays",
    ];
    if (!data) return;
    if (data.peoples[0])
      if (peoplesKeys.some((pk) => data.peoples[0][pk] === undefined)) return;
    if (data.pays[0])
      if (payKeys.some((pk) => data.pays[0][pk] === undefined)) return;

    return data;
  };