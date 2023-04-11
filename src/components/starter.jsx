import React, { Component } from "react";
import "../styles/starter.css";
import SiteHeader from "./header";

class Starter extends Component {
  state = {
    peoplesName: [
      { id: Number(Date.now()) - 1000 + "", name: "" },
      { id: Number(Date.now()) - 500 + "", name: "" },
      { id: Number(Date.now()) + "", name: "" },
    ],
    showFields: false,
    hide: true,
  };
  nums = [
    "اول (مادرخرج)",
    "دوم",
    "سوم",
    "چهارم",
    "پنجم",
    "ششم",
    "هفتم",
    "هشتم",
    "نهم",
    "دهم",
    "یازدهم",
    "دوازدهم",
  ];

  showNumber = (n) => {
    if (n < 12) return this.nums[n];
    return " شماره" + (n + 1);
  };

  addPerson = () => {
    const peoplesName = [...this.state.peoplesName];
    peoplesName.push({ id: Date.now() + "", name: "" });
    this.setState({ peoplesName });
  };

  handleNameChange = ({ currentTarget }) => {
    const peoplesName = [...this.state.peoplesName];
    const person = peoplesName.find((p) => "si:" + p.id === currentTarget.id);
    person.name = currentTarget.value;
    this.setState({ peoplesName });
  };

  deletePeoples = (personId) => {
    if (this.state.peoplesName.length < 2) return;
    const peoplesName = this.state.peoplesName.filter((p) => p.id !== personId);
    this.setState({ peoplesName });
  };

  nextStep = () => {
    const addOnePeople = () => {
      this.props.mainAddPeople("s-" + peoplesName[i].id, peoplesName[i].name);
      if (i < peoplesName.length - 1) setTimeout(addOnePeople, 400);
      i++;
    };
    const peoplesName = this.state.peoplesName.filter((p) => p.name);
    let i = 0;
    addOnePeople();
  };

  render() {
    if (!this.state.showFields)
      return (
        <div>
          <div className="logo">
            <img src="./new-logo.png"></img>
            <div className="mt-3">
              <h1 className="my-3">دنگ آنلاین</h1>
              <h5>دنگ خودت رو عین آب خوردن حساب کن</h5>
            </div>
          </div>
          <div className="m-auto pt-4">
            <button
              className="btn btn-lg btn-dark add-people-button mt-5"
              onClick={() => this.setState({ showFields: true })}
            >
              با اضافه کردن دوستات شروع کن
            </button>
          </div>
        </div>
      );

    return (
      <div>
        <SiteHeader />
        <div className="mt-5 p-3 back ">
          <h5 className="mb-4">اسم بچه های اکیپتون رو بنویس</h5>
          {this.state.peoplesName.map((people, index) => (
            <div
              key={people.id}
              className="my-2"
            >
              <input
                type="text"
                placeholder={"اسم نفر " + this.showNumber(index)}
                value={people.name}
                onChange={this.handleNameChange}
                id={"si:" + people.id}
                className="py-1"
                maxLength="16"
              ></input>
              <button
                className="btn btn-danger mx-2"
                onClick={() => this.deletePeoples(people.id)}
                disabled={this.state.peoplesName.length < 2}
              >
                حذف
              </button>
            </div>
          ))}
          <div>
            <span className="text-danger my-0 error">{this.state.err}</span>
          </div>
          <div className="mt-4">
            <button
              className="btn btn-primary mx-1"
              onClick={this.addPerson}
            >
              یه نفر دیگه
            </button>
            <button
              className="btn btn-success mx-1"
              onClick={this.nextStep}
              disabled={this.state.peoplesName.filter((p) => p.name).length < 2}
            >
              مرحله بعد
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Starter;
