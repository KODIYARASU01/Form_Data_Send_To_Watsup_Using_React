import React, { useState } from "react";
import "./Form.scss";
import "react-time-picker/dist/TimePicker.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const Booking_Form = () => {
  const [startDate, setStartDate] = useState();
  let [OneWay, setOneWay] = useState(true);
  let [TwoWay, setTwoWay] = useState(false);

  //Collect form data using UseState:

  let [pickUp, setPickUp] = useState();
  let [dropUp, setDropUp] = useState();
  let [mobile, setMobile] = useState();

  let handleSubmit = async(e) => {
    e.preventDefault();

    let userData = {
      pickUp: pickUp,
      dropUp: dropUp,
      mobile: mobile,
    };
    await fetch("/data", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <>
      <div className="Booking_Form_Container">
        <div className="Booking_Form_Title">
          <h2>Hari Cabs</h2>
        </div>
        <div className="Form_Action_Container">
          <div className="OneWay_Btn">
            <button
              className={OneWay ? "active_oneWay" : ""}
              onClick={() => {
                setOneWay(true), setTwoWay(false);
              }}
            >
              OneWay
            </button>
          </div>
          <div className="TwoWay_Btn">
            <button
              className={TwoWay ? "active_toWay" : ""}
              onClick={() => {
                setOneWay(false), setTwoWay(true);
              }}
            >
              TwoWay
            </button>
          </div>
        </div>

        <div className="Form_Container">
          {OneWay ? (
            <div className="oneWay_form">
              <form action="" className="oneWay" onSubmit={handleSubmit} method="post">
                <div className="form_group">
                  <label htmlFor="pickup">PickUp Address</label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Your Location"
                    id="pickup"
                    name="pickup"
                    value={pickUp}
                    onChange={(e) => {
                      setPickUp(e.target.value);
                    }}
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="dropup">Drop Location</label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Your Destination"
                    name="dropup"
                    id="dropup"
                    value={dropUp}
                    onChange={(e) => {
                      setDropUp(e.target.value);
                    }}
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="date">Date</label>
                  <DatePicker
                    className="input"
                    selected={startDate}
                    name="date"
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="time">Time</label>
                  <input
                    className="input"
                    type="time"
                    placeholder="Time"
                    name="time"
                    id="time"
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="mobile">Mobile Number</label>
                  <input
                    className="input"
                    type="tel"
                    placeholder="Enter Your Destination"
                    name="mobile"
                    id="mobile"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                    }}
                  />
                </div>
                <div className="submit_action">
                  <button type="Submit">Book OneWay</button>
                </div>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Booking_Form;
