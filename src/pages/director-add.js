import React, { Component } from "react";
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default class Adddirector extends Component {
  state = {
    redirect: false,
    toDashboard: false,
    isLoading: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const url = "http://52.54.194.137:5000/api/movies/director";
    const some = document.getElementById("inputCateId").value;

    let bodyFormData = new FormData();
    const director = some;
    bodyFormData.set("director", director);

    axios
      .post(
        url,
        { director: director },
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

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/dashboard" />;
    }
  };

  render() {
    const isLoading = this.state.isLoading;
    if (this.state.toDashboard === true) {
      return <Redirect to="/director-add" />;
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
                <li className="breadcrumb-item active">Add director</li>
              </ol>
            </div>
            <div className="container-fluid">
              <div className="card mx-auto">
                <div className="card-header">Add director</div>
                <div className="card-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <div className="form-row">
                        <div className="col-md-6">
                          <div className="form-label-group">
                            <input
                              type="text"
                              id="inputCateId"
                              className="form-control"
                              placeholder="Enter director"
                              required="required"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary btn-block"
                      type="submit"
                      disabled={this.state.isLoading ? true : false}
                    >
                      Add director &nbsp;&nbsp;&nbsp;
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
