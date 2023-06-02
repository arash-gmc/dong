import React, { Component } from "react";
import _ from "lodash";
import PayCard from "./payCard";
import Result from "./result";
import "../styles/main.css";
import Starter from "./starter";
import Buttons from "./buttons";
import PeoplesCard from "./PeoplesCard";
import SiteHeader from "./header";
import setEnglishNumber from "../functions/setEnglishNumbers";
import { validateOne } from "../functions/validateOne";
import { validateAll } from "../functions/validateAll";
import { validateOnePay } from "../functions/validateOnePay";
import { isStored } from "../functions/isStored";
import { loadData } from "../functions/loadData";
import { saveData } from "../functions/saveData";

class Main extends Component {
  state = {
    peoples: [],
    pays: [],
    errs: {},
    showResult: false,
  };

  resetAll = () => {
    this.setState({
      peoples: [],
      pays: [],
      errs: {},
      showResult: false,
    });
    localStorage.removeItem("data");
  };

  handlePeopleNameChange = ({ currentTarget }) => {
    this.setState({ showResult: false });
    const peoples = [...this.state.peoples];
    const person = this.state.peoples.find(
      (p) => "pr:" + p.id === currentTarget.id
    );

    const similarPerson = this.state.peoples.find(
      (p) => p.name === person.name && p.id !== person.id
    );
    if (similarPerson) {
      const errs = this.state.errs;
      errs["pr:" + similarPerson.id] = "";
      this.setState(errs);
    }

    person.name = currentTarget.value;
    this.setState({ peoples });
    this.validate(currentTarget.id);
  };

  handlePayNameChange = ({ currentTarget }) => {
    this.setState({ showResult: false });
    const pays = [...this.state.pays];
    const pay = pays.find((pay) => pay.id === currentTarget.id.substring(3));
    pay.name = currentTarget.value;
    this.setState({ pays });
    this.validate(currentTarget.id);
  };

  handlePayAmountChange = ({ currentTarget }) => {
    this.setState({ showResult: false });
    const pays = [...this.state.pays];
    const pay = pays.find((pay) => pay.id === currentTarget.id.substring(3));
    if (currentTarget.value.length > pay.amount.length) {
      const lastChar = currentTarget.value.slice(-1);
      currentTarget.value =
        currentTarget.value.slice(0, -1) + setEnglishNumber(lastChar);
      if (currentTarget.value === "0") return;
    }
    pay.amount = currentTarget.value;
    this.setState({ pays });
    this.validate(currentTarget.id);
  };

  addPeople = (id, name) => {
    this.setState({ showResult: false });
    const peoples = [...this.state.peoples];
    if (!this.validateAllParams()) return;
    const pays = [...this.state.pays];
    pays.forEach((pay) => {
      pay.show = false;
      pay.unequalPays.push({ id: id, money: "" });
    });
    const findMotherPay = () => {
      return this.state.peoples.some((p) => p.motherPay);
    };
    peoples.push({
      id,
      name,
      motherPay: !findMotherPay(),
    });
    this.setState({ peoples, pays });
  };

  deletePeople = (personId) => {
    this.setState({ showResult: false });
    let peoples = [...this.state.peoples];
    if (peoples.length === 1) return;
    const deletedPerson = peoples.find((person) => person.id === personId);
    if (deletedPerson.motherPay) {
      peoples[0].motherPay = true;
    }
    peoples = peoples.filter((person) => person.id !== personId);
    this.setState({ peoples });

    let pays = [...this.state.pays];
    pays = pays.filter((pay) => pay.ownerId !== personId);
    this.setState({ pays });
  };

  addPay = (ownerId) => {
    this.setState({ showResult: false });
    if (!this.validateAllParams()) return;
    const newPay = {
      id: Date.now() + "",
      ownerId,
      name: "",
      amount: "",
      equal: true,
      show: false,
      paidFor: [],
      unequalPays: [],
    };
    this.state.peoples.forEach((person) => {
      newPay.unequalPays.push({ id: person.id, money: "" });
    });
    const pays = [...this.state.pays];
    pays.map((pay) => (pay.show = false));
    pays.push(newPay);
    this.setState({ pays });
    setTimeout(() => {
      newPay.show = true;
      this.setState({ pays });
    }, 500);
  };

  deletePay = (payId) => {
    this.setState({ showResult: false });
    let pays = [...this.state.pays];
    pays = pays.filter((pay) => pay.id !== payId);
    this.setState({ pays });
  };

  setMotherPay = ({ currentTarget }) => {
    this.setState({ showResult: false });
    const peoples = [...this.state.peoples];
    const person = peoples.find((p) => "m" + p.id === currentTarget.id);
    peoples.map((p) => (p.motherPay = false));
    person.motherPay = true;
    this.setState({ peoples });
  };

  // togglePayType = (payId) => {
  //   this.setState({ showResult: false });
  //   const pays = [...this.state.pays];
  //   const pay = pays.find((p) => p.id === payId);
  //   pay.equal = !pay.equal;
  //   this.setState({ pays });
  // };

  togglePaidFor = (personId, payId) => {
    this.setState({ showResult: false });
    const pays = [...this.state.pays];
    const pay = pays.find((pay) => pay.id === payId);
    if (personId === "all") {
      pay.paidFor = [];
      this.state.peoples.map((person) => pay.paidFor.push(person.id));
    } else {
      if (pay.paidFor.includes(personId)) {
        const index = pay.paidFor.indexOf(personId);
        pay.paidFor.splice(index, 1);
      } else {
        pay.paidFor.push(personId);
      }
    }
    this.setState({ pays });
    this.validate("pf:" + payId);
  };

  togglePayDisplay = (payId) => {
    const pays = [...this.state.pays];
    const pay = pays.find((pay) => pay.id === payId);
    if (pay.show)
      if (this.validatePay(pay.id)) {
        pay.show = false;
        this.setState({ pays });
        return;
      }

    if (!pay.show) {
      pay.show = true;
      pays.forEach((pay) => {
        if (pay.id !== payId) pay.show = false;
      });
      this.setState({ pays });
    }
  };

  handleUnequalPayPrice = ({ currentTarget }) => {
    this.setState({ showResult: false });
    const info = currentTarget.id.split(":");
    const pays = [...this.state.pays];
    const pay = pays.find((p) => p.id === info[1]);
    const personPay = pay.unequalPays.find((p) => p.id === info[2]);
    if (currentTarget.value.length > personPay.money.length) {
      const lastChar = currentTarget.value.slice(-1);
      if (currentTarget.value === "0") return;
      currentTarget.value =
        currentTarget.value.slice(0, -1) + setEnglishNumber(lastChar);
    }
    personPay.money = currentTarget.value;
    this.setState({ pays });
    this.validate("pq:" + info[1]);
  };

  validate = (input) => {
    const { peoples, pays } = this.state;
    const errs = { ...this.state.errs };
    delete errs[input];
    const res = validateOne(input, peoples, pays);
    if (res === true) {
      this.setState({ errs });
      return true;
    }
    errs[input] = res;
    this.setState({ errs });
    return false;
  };

  validatePay = (payId) => {
    const pay = this.state.pays.find((p) => p.id === payId);
    const errs = validateOnePay(pay);
    if (_.isEqual(errs, {})) return true;
    this.setState({ errs });
    return false;
  };

  validateAllParams = () => {
    const { pays, peoples } = this.state;
    const errs = validateAll(peoples, pays);
    if (_.isEqual(errs, {})) return true;
    this.setState({ errs });
    return false;
  };

  componentDidMount() {
    if (loadData()) this.setState(loadData());
  }

  render() {
    const { peoples, pays } = this.state;
    if (peoples.length === 0) return <Starter mainAddPeople={this.addPeople} />;

    if (peoples.length > 0)
      return (
        <div>
          <SiteHeader />
          <div className="row mt-md-5">
            <div className="col-xl-1 col-sm-2 col-3 position-fixed fixed-right back-button py-md-3">
              <Buttons
                addPeople={this.addPeople}
                displayResults={() =>
                  this.setState({
                    pays: pays.map((p) => (p.show ? { ...p, show: false } : p)),
                    showResult: true,
                  })
                }
                saveData={() => {
                  saveData({ peoples, pays });
                  this.forceUpdate();
                }}
                resetAll={this.resetAll}
                isStored={() => isStored(peoples, pays)}
                showResult={this.state.showResult}
              />
            </div>
            <div className="col-3 col-sm-2 col-xl-1"></div>
            <div className="row col-9 col-sm-10 col-xl-8 px-md-2 p-0 me-sm-1">
              {this.state.peoples.map((person) => (
                <div
                  className="col-lg-4 col-sm-6 mb-3"
                  key={person.id}
                >
                  <PeoplesCard
                    deletePeople={this.deletePeople}
                    errs={this.state.errs}
                    person={person}
                    handlePeopleNameChange={this.handlePeopleNameChange}
                    setMotherPay={this.setMotherPay}
                    addPay={this.addPay}
                  />
                  <div className="mx-1 mx-lg-0">
                    {this.state.pays
                      .filter((p) => p.ownerId === person.id)
                      .map((pay) => (
                        <PayCard
                          pay={pay}
                          key={pay.id}
                          onPayNameChange={this.handlePayNameChange}
                          onPayAmountChange={this.handlePayAmountChange}
                          peoples={this.state.peoples}
                          togglePaidFor={this.togglePaidFor}
                          errs={this.state.errs}
                          togglePayDisplay={this.togglePayDisplay}
                          togglePayType={(pay, eq) =>
                            this.setState({
                              pays: pays.map((p) =>
                                p.id === pay.id ? { ...pay, equal: eq } : p
                              ),
                            })
                          }
                          deletePay={this.deletePay}
                          handleUnequalPayPrice={this.handleUnequalPayPrice}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="d-none d-sm-block col-2 d-xl-none"></div>
            <div className="col-xl-3 col-sm-10">
              {this.state.showResult && (
                <Result
                  pays={this.state.pays}
                  peoples={this.state.peoples}
                  validateAll={this.validateAllParams}
                />
              )}
            </div>
          </div>
        </div>
      );
  }
}

export default Main;
