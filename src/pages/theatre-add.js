import React, { Component } from "react";
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import countryList from "react-select-country-list";

export default class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.options = countryList().getData();
    this.state = {
      redirect: false,
      toDashboard: false,
      isLoading: false,
      options: this.options,
      value: null,
    };
  }

  componentDidMount() {}
  changeHandler = (value) => {
    this.setState({ value });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/dashboard" />;
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const url = "http://52.54.194.137:5000/api/theatre";
    const theatre = document.getElementById("theatreid").value;
    const rows = document.getElementById("rows").value;
    const country = this.state.value;
    const capacity = document.getElementById("capacity").value;
    const city = document.getElementById("cityid").value;

    axios
      .post(
        url,
        {
          theatrename: theatre,
          capacity: capacity,
          rows: rows,
          country: country,
          city: city,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,  POST",
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        console.log(result);
        console.log(result.status);
        if (result.status === 200) {
          this.setState({ redirect: true, isLoading: false });
        }
      })
      .catch((error) => {
        this.setState({ toDashboard: true });
        console.log(error);
      });
  };

  render() {
    const isLoading = this.state.isLoading;
    if (this.state.toDashboard === true) {
      return <Redirect to="/theatre-add" />;
    }
    return (
      <div>
        <Header />
        <div id="wrapper">
          <Sidebar></Sidebar>

          <div id="content-wrapper">
            <div className="container-fluid">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/dashboard"}>Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Add Theatre</li>
              </ol>
            </div>
            <div className="container-fluid">
              <div className="card mx-auto">
                <div className="card-header">Add Theatre</div>
                <div className="card-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <div className="form-row">
                        <div className="col-md-6">
                          <input
                            type="text"
                            id="theatreid"
                            className="form-control"
                            placeholder="Enter Theatrename"
                            required="required"
                          />
                        </div>
                        <Select
                          className="col-md-6"
                          id="countryid"
                          options={this.options}
                          value={this.state.value}
                          onChange={this.changeHandler}
                        />
                        <div className="col-md-6">
                          <input
                            type="number"
                            id="capacity"
                            className="form-control"
                            placeholder="capacity"
                            required="required"
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="number"
                            id="rows"
                            className="form-control"
                            placeholder="rows"
                            required="required"
                          />
                        </div>

                        <div className="col-md-6">
                          <input
                            type="text"
                            id="cityid"
                            className="form-control"
                            placeholder="Enter city"
                            required="required"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary btn-block"
                      type="submit"
                      disabled={this.state.isLoading ? true : false}
                    >
                      Add Theatre &nbsp;&nbsp;&nbsp;
                      {isLoading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        <span></span>
                      )}
                    </button>
                  </form>
                  {this.renderRedirect()}
                </div>
              </div>
            </div>

            <footer className="sticky-footer">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>
                    Copyright © Your Website{" "}
                    <div>{new Date().getFullYear()}</div>
                  </span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}
