import React, { Component } from "react";
import "../styles/results.css";

class Result extends Component {
  state = {
    result: [],
    errMessage: "",
  };

  focusDiv = React.createRef();

  claculate = () => {
    let result = [];
    this.props.peoples.forEach((person) => {
      let paid = 0;
      let paidForHim = 0;
      this.props.pays.forEach((pay) => {
        if (pay.equal) {
          const money = Number(pay.amount);
          if (pay.ownerId === person.id) paid += money;
          if (pay.paidFor.includes(person.id))
            paidForHim += money / pay.paidFor.length;
        } else {
          pay.unequalPays.forEach((ueqp) => {
            const money = Number(ueqp.money);
            if (money && pay.ownerId === person.id) paid += money;
            if (money && ueqp.id === person.id) paidForHim += money;
          });
        }
      });
      result.push({
        id: person.id,
        name: person.name,
        dong: Math.ceil(paidForHim - paid),
      });
    });
    this.setState({ result });
  };

  componentDidMount() {
    let errMessage = "";
    if (Object.keys(this.props.errs).length !== 0)
      errMessage = "اطلاعاتی که وارد کردی یه مشکلی داره. دوباره چک کن.";
    else if (this.props.peoples.length < 2)
      errMessage = "برای حساب کردن دنگ حداقل دو نفر لازم داری";
    else if (this.props.pays.length < 1)
      errMessage =
        "اول از طریق گزینه ی «اضافه کردن هزینه» برای شخص مورد نظر یه هزینه تعریف کن.";
    else if (!this.props.peoples.find((p) => p.motherPay))
      errMessage = "مادرخرج انتخاب نشده.";
    else this.claculate();
    this.setState({ errMessage });
    this.focusDiv.current.focus();
  }
  reshapeMoney(number) {
    if (number < 0) return null;
    if (number === 0) return 0;
    if (number < 1000) return number + " هزار تومن";
    if (number < 1000000)
      return (
        Math.floor(number / 1000) +
        " میلیون و " +
        (number % 1000) +
        " هزار تومن"
      );
    return number * 1000 + " تومن";
  }
  render() {
    const { result, errMessage } = this.state;
    const motherPay = this.props.peoples.find((p) => p.motherPay);
    return (
      <div className="mx-auto m-1 mt-2 result-div">
        <div className="result-header p-1">
          <h3>نتیجه</h3>
        </div>

        {errMessage && (
          <div className="card result-card mx-2 text-danger pt-2">
            <p>{errMessage}</p>
            <div
              ref={this.focusDiv}
              tabIndex="0"
            ></div>
          </div>
        )}

        {!errMessage && (
          <div className="card result-card mx-2 pt-2">
            <p>دنگ همه حساب شد و نتیجه اینه:</p>
            {result.map((r) => (
              <div
                className="me-2"
                key={r.id}
              >
                {motherPay.id !== r.id && r.dong > 0 && (
                  <p
                    key={r.id}
                    className="plus"
                  >
                    <strong>{r.name}</strong> باید به {motherPay.name} مبلغ{" "}
                    <strong>{this.reshapeMoney(r.dong)}</strong> بده.
                  </p>
                )}
                {motherPay.id !== r.id && r.dong < 0 && (
                  <p
                    key={r.id}
                    className="minus"
                  >
                    <strong>{r.name}</strong> باید از {motherPay.name} مبلغ{" "}
                    <strong>{this.reshapeMoney(-r.dong)}</strong> بگیره.
                  </p>
                )}
                {motherPay.id !== r.id && r.dong === 0 && (
                  <p
                    key={r.id}
                    className="nopay"
                  >
                    حساب <strong>{r.name}</strong> تسویه هست.
                  </p>
                )}
              </div>
            ))}
            <div
              ref={this.focusDiv}
              tabIndex="0"
            ></div>
          </div>
        )}
      </div>
    );
  }
}

export default Result;
