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

    console.log(this.options);
    this.state = {
      redirect: false,
      toDashboard: false,
      isLoading: false,
      options: this.options,
      value: null,
      movies: [],
      moviename: null,
      theatres: [],
      theatrename: null,
      city: null,
    };
  }

  componentDidMount() {
    axios
      .get(" http://52.54.194.137:5000/api/movies")
      .then((response) => {
        let list = [];
        response.data.forEach((element) => {
          let data = {
            value: element.moviename,
            label: element.moviename,
          };
          list.push(data);
        });
        this.setState({ movies: list });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(" http://52.54.194.137:5000/api/theatre")
      .then((response) => {
        let list = [];
        response.data.forEach((element) => {
          let data = {
            value: element.theatrename,
            label: element.theatrename,
          };
          list.push(data);
        });
        this.setState({ theatres: list });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeHandler = (value) => {
    this.setState({ value });
  };
  moviehand = (value) => {
    this.setState({ moviename: value.value });
  };
  theatrehand = (value) => {
    console.log(value.value);
    this.setState({ theatrename: value.value });
    axios
      .get("http://52.54.194.137:5000/api/theatre/" + value.value)
      .then((response) => {
        console.log(response);
        this.setState({ city: response.data.city });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const url = "http://52.54.194.137:5000/api/shows";
    const country = this.state.value.label;
    const theatre = this.state.theatrename;
    const moviename = this.state.moviename;
    const city = this.state.city;
    const sdate = document.getElementById("sdateid").value;
    const edate = document.getElementById("edateid").value;
    const showtime = document.getElementById("showid").value;
    const price = document.getElementById("priceid").value;

    axios
      .post(
        url,
        {
          moviename: moviename,
          city: city,
          country: country,
          edate: edate,
          theatre: theatre,
          sdate: sdate,
          price: price,
          showtime: showtime,
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
                <li className="breadcrumb-item active">Add Show</li>
              </ol>
            </div>
            <div className="container-fluid">
              <div className="card mx-auto">
                <div className="card-header">Add Show</div>
                <div className="card-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <div className="form-row">
                        <Select
                          className="col-md-6"
                          id="countryid"
                          options={this.options}
                          value={this.state.value}
                          onChange={this.changeHandler}
                          placeholder="country"
                        />

                        <Select
                          className="col-md-6"
                          id="directorid"
                          options={this.state.movies}
                          value={this.state.moviename}
                          onChange={this.moviehand}
                          placeholder="movies.."
                        />

                        <Select
                          className="col-md-6"
                          id="directorid"
                          options={this.state.theatres}
                          value={this.state.theatrename}
                          onChange={this.theatrehand}
                          placeholder="Thetres.."
                        />

                        <div className="col-md-6">
                          start date
                          <input
                            type="date"
                            id="sdateid"
                            className="form-control"
                            placeholder="Enter date"
                            required="required"
                          />
                        </div>
                        <div className="col-md-6">
                          end date
                          <input
                            type="date"
                            id="edateid"
                            className="form-control"
                            placeholder="Enter date"
                            required="required"
                          />
                        </div>

                        <div className="col-md-6">
                          <input
                            type="number"
                            id="priceid"
                            className="form-control"
                            placeholder="Enter ticket price"
                            required="required"
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            id="showid"
                            className="form-control"
                            placeholder="Enter Timing"
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
                      Add Show &nbsp;&nbsp;&nbsp;
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
