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
    this.director = [];
    console.log(this.options);
    this.state = {
      redirect: false,
      toDashboard: false,
      isLoading: false,
      options: this.options,
      value: null,
      director: [],
      producer: [],
      actor: [],
      category: [],
      directorn: null,
      producern: null,
      actorn: null,
      categoryn: null,
    };
  }

  componentDidMount() {
    //director
    axios
      .get(" http://52.54.194.137:5000/api/movies/director")
      .then((response) => {
        console.log(response);
        console.log(response.data);
        let list = [];
        response.data.forEach((element) => {
          let data = {
            value: element.director,
            label: element.director,
          };
          list.push(data);
        });
        console.log(list);
        this.setState({ director: list });
      })
      .catch((error) => {
        console.log(error);
      });
    //producer
    axios
      .get(" http://52.54.194.137:5000/api/movies/producer")
      .then((response) => {
        console.log(response);
        console.log(response.data);
        let list = [];
        response.data.forEach((element) => {
          let data = {
            value: element.producer,
            label: element.producer,
          };
          list.push(data);
        });
        console.log(list);
        this.setState({ producer: list });
      })
      .catch((error) => {
        console.log(error);
      });
    //actor
    axios
      .get(" http://52.54.194.137:5000/api/movies/actor")
      .then((response) => {
        console.log(response);
        console.log(response.data);
        let list = [];
        response.data.forEach((element) => {
          let data = {
            value: element.actor,
            label: element.actor,
          };
          list.push(data);
        });
        console.log(list);
        this.setState({ actor: list });
      })
      .catch((error) => {
        console.log(error);
      });
    //category
    axios
      .get(" http://52.54.194.137:5000/api/movies/category")
      .then((response) => {
        console.log(response);
        console.log(response.data);
        let list = [];
        response.data.forEach((element) => {
          let data = {
            value: element.category,
            label: element.category,
          };
          list.push(data);
        });
        console.log(list);
        this.setState({ category: list });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeHandler = (value) => {
    this.setState({ value });
  };
  directorhand = (value) => {
    this.setState({ directorn: value });
    console.log(value);
  };
  producerhand = (value) => {
    this.setState({ producern: value });
  };
  actorhand = (value) => {
    this.setState({ actorn: value });
  };
  categoryhand = (value) => {
    this.setState({ categoryn: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const url = "http://52.54.194.137:5000/api/movies";
    const movie = document.getElementById("movieid").value;
    const duration = document.getElementById("durationid").value;
    const country = this.state.value;
    const date = document.getElementById("dateid").value;
    // const director = document.getElementById("directorid").value;
    // const producer = document.getElementById("prodid").value;
    // const actor = document.getElementById("actorid").value;
    const video = document.getElementById("vidid").value;
    // const category = document.getElementById("cateId").value;
    const director = this.state.directorn;
    const producer = this.state.producern;
    const actor = this.state.actorn;
    const category = this.state.categoryn;

    axios
      .post(
        url,
        {
          moviename: movie,
          duration: duration,
          country: country,
          rdate: date,
          director: director,
          producer: producer,
          actor: actor,
          video: video,
          category: category,
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

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/dashboard" />;
    }
  };

  render() {
    const isLoading = this.state.isLoading;
    if (this.state.toDashboard === true) {
      return <Redirect to="/movie-add" />;
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
                <li className="breadcrumb-item active">Add Movie</li>
              </ol>
            </div>
            <div className="container-fluid">
              <div className="card mx-auto">
                <div className="card-header">Add Movie</div>
                <div className="card-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <div className="form-row">
                        <div className="col-md-6">
                          <input
                            type="text"
                            id="movieid"
                            className="form-control"
                            placeholder="Enter movie name"
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
                            type="text"
                            id="durationid"
                            className="form-control"
                            placeholder="duration"
                            required="required"
                          />
                        </div>
                        <Select
                          className="col-md-6"
                          id="directorid"
                          options={this.state.director}
                          value={this.state.directorn}
                          onChange={this.directorhand}
                          placeholder="Director.."
                        />
                        <div className="col-md-6">
                          <input
                            type="date"
                            id="dateid"
                            className="form-control"
                            placeholder="Enter date"
                            required="required"
                          />
                        </div>
                        {/* <div className="col-md-6">
                          <input
                            type="text"
                            id="directorid"
                            className="form-control"
                            placeholder="Enter Director"
                            required="required"
                          />
                        </div> */}
                        {/* <div className="col-md-6">
                          <input
                            type="text"
                            id="prodid"
                            className="form-control"
                            placeholder="Enter Producer"
                            required="required"
                          />
                        </div> */}
                        <Select
                          className="col-md-6"
                          id="prodid"
                          options={this.state.producer}
                          value={this.state.producern}
                          onChange={this.producerhand}
                          placeholder="producer.."
                        />
                        {/* <div className="col-md-6">
                          <input
                            type="text"
                            id="actorid"
                            className="form-control"
                            placeholder="Enter Actor"
                            required="required"
                          />
                        </div> */}
                        <Select
                          className="col-md-6"
                          id="prodid"
                          options={this.state.actor}
                          value={this.state.actorn}
                          onChange={this.actorhand}
                          placeholder="actor.."
                        />
                        <div className="col-md-6">
                          <input
                            type="text"
                            id="vidid"
                            className="form-control"
                            placeholder="Enter trailer link"
                            required="required"
                          />
                        </div>
                        {/* <div className="col-md-6">
                          <input
                            type="text"
                            id="cateId"
                            className="form-control"
                            placeholder="Enter Category"
                            required="required"
                          />
                        </div> */}
                        <Select
                          className="col-md-6"
                          id="prodid"
                          options={this.state.category}
                          value={this.state.categoryn}
                          onChange={this.categoryhand}
                          placeholder="category.."
                        />
                      </div>
                    </div>
                    <button
                      className="btn btn-primary btn-block"
                      type="submit"
                      disabled={this.state.isLoading ? true : false}
                    >
                      Add Movie &nbsp;&nbsp;&nbsp;
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
