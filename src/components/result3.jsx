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
    this.props.peoples.map((person) => {
      let paid = 0;
      let paidForHim = 0;
      this.props.pays.map((pay) => {
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
    if (!this.props.validateAll())
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

  render() {
    const { result, errMessage } = this.state;
    const motherPay = this.props.peoples.find((p) => p.motherPay);
    return (
      <div className="mx-auto mb-0 mt-2 result-div">
        <div className="result-header p-1">
          <h3>نتیجه</h3>
        </div>

        {errMessage && (
          <div className="card result-card mx-2 text-danger pt-2">
            <p>{errMessage}</p>
            <div
              tabIndex="0"
              ref={this.focusDiv}
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
                  <p key={r.id}>
                    <span className="plus">&#x2B;</span>{" "}
                    <strong>{r.name}</strong> باید به {motherPay.name} مبلغ{" "}
                    {r.dong} هزار تومن بده.
                  </p>
                )}
                {motherPay.id !== r.id && r.dong < 0 && (
                  <p key={r.id}>
                    <span className="minus">&#8722;</span>{" "}
                    <strong>{r.name}</strong> باید از {motherPay.name} مبلغ{" "}
                    {-r.dong} هزار تومن بگیره.
                  </p>
                )}
                {motherPay.id !== r.id && r.dong === 0 && (
                  <p key={r.id}>
                    <span className="bullet"> &#x2022;</span> حساب{" "}
                    <strong>{r.name}</strong> تسویه هست.
                  </p>
                )}
              </div>
            ))}

            <div
              tabIndex="0"
              ref={this.focusDiv}
            ></div>
          </div>
        )}
      </div>
    );
  }
}

export default Result;
