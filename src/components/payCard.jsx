import React, { Component } from "react";
import "../styles/payCard.css";

class PayCard extends Component {
  state = { hide: true };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ hide: false });
    }, 100);
  }

  render() {
    const {
      pay,
      onPayNameChange,
      onPayAmountChange,
      peoples,
      togglePaidFor,
      errs,
      togglePayDisplay,
      deletePay,
      togglePayType,
      handleUnequalPayPrice,
    } = this.props;

    return (
      <div className={"pay-card " + (this.state.hide ? "hide" : "")}>
        <div
          className="pay-header p-1"
          onClick={() => togglePayDisplay(pay.id)}
        >
          <span
            className={
              errs["pn:" + pay.id] ||
              errs["pa:" + pay.id] ||
              errs["pf:" + pay.id] ||
              errs["pq:" + pay.id]
                ? "text-danger"
                : ""
            }
          >
            {pay.name}
          </span>
          <span className="text-danger">
            {errs["pn:" + pay.id] ? "!!!" : ""}
          </span>
        </div>
        <span
          className="delete-icon"
          onClick={() => deletePay(pay.id)}
        >
          &#10005;
        </span>
        <div className={"pay-body " + (pay.show ? "" : "zero-height")}>
          <div className="p-3">
            <div className="mb-2">
              <div>
                <input
                  type="text"
                  className="py-2 mt-2 w-75"
                  value={pay.name}
                  id={"pn:" + pay.id}
                  name="payName"
                  onChange={onPayNameChange}
                  placeholder="نام هزینه"
                  maxLength="32"
                  autoFocus
                ></input>
              </div>
              <div className="validation-error">{errs["pn:" + pay.id]}</div>

              <div className=" my-2 text-nowrap">نوع پرداخت</div>
              <div className="row my-1 mx-3 ">
                <div
                  className={
                    (pay.equal ? "on " : "off ") + "pay-toggle-left px-3 col-6"
                  }
                  onClick={() => togglePayType(pay, true)}
                >
                  برابر
                </div>
                <div
                  className={
                    (pay.equal ? "off" : "on") + " pay-toggle-right px-3 col-6"
                  }
                  onClick={() => togglePayType(pay, false)}
                >
                  نابرابر
                </div>
              </div>
            </div>

            {pay.equal && (
              <div>
                <div className="m-2 text-nowrap">
                  <span>هزینه شده برای</span>
                </div>

                <div className="row paidFors">
                  {peoples
                    .filter((person) => person.name)
                    .map((person) => (
                      <div
                        className="col-6"
                        key={person.id}
                      >
                        <div
                          className={
                            pay.paidFor.includes(person.id) ? "on" : "off"
                          }
                          onClick={() => togglePaidFor(person.id, pay.id)}
                        >
                          {person.name}
                        </div>
                      </div>
                    ))}
                  <div className="col-12">
                    <div
                      className="on mb-0"
                      onClick={() => togglePaidFor("all", pay.id)}
                    >
                      انتخاب همه
                    </div>
                  </div>
                  <div className="validation-error">{errs["pf:" + pay.id]}</div>
                </div>

                <div className="d-flex justify-content-center">
                  <span>مبلغ: </span>
                  <input
                    type="text"
                    value={pay.amount}
                    id={"pa:" + pay.id}
                    name="payAmount"
                    onChange={onPayAmountChange}
                    placeholder="0"
                    className="w-25 me-3"
                    maxLength="10"
                  />
                  <span className="hezar">&#10005; هزار تومان</span>
                </div>
                <div className="validation-error">{errs["pa:" + pay.id]}</div>
              </div>
            )}

            {!pay.equal && (
              <div>
                <div className="mb-3">مبلغ هزینه شده برای</div>

                {peoples
                  .filter((person) => person.name)
                  .map((person) => (
                    <div
                      key={person.id}
                      className="my-2 unequal row"
                    >
                      <span className="col-5 text-start">{person.name}</span>
                      <input
                        id={"pq:" + pay.id + ":" + person.id}
                        onChange={handleUnequalPayPrice}
                        value={
                          pay.unequalPays.find((p) => p.id === person.id).money
                        }
                        placeholder="0"
                        maxLength="8"
                        className="col-3"
                      />
                      <span className="col-4 hezar">&#10005;هزار تومان</span>
                    </div>
                  ))}
                <div className="validation-error">{errs["pq:" + pay.id]}</div>
              </div>
            )}

            <div>
              <button
                className="btn btn-primary"
                onClick={() => togglePayDisplay(pay.id)}
              >
                حله
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PayCard;
