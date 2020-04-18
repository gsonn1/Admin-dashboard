import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import axios from "axios";
import countryList from "react-select-country-list";
import Select from "react-select";

class ListMovies extends Component {
  constructor(props) {
    super(props);
    this.options = countryList().getData();
    this.url = "http://52.54.194.137:5000/api/";
    this.state = {
      redirect: false,
      toDashboard: false,
      isLoading: false,
      options: this.options,
      value: null,
      country: null,
      city: null,
      shows: [],
    };
  }

  componentDidMount() {
    //axios request  to get all running shows
    axios
      .get(" http://52.54.194.137:5000/api/shows")
      .then((response) => {
        console.log(response.data);
        if (response.data) this.setState({ shows: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  countryhandler = (value) => {
    this.setState({ country: value });
  };
  cityhandler = (value) => {
    this.setState({ city: value });
  };
  handleClickDelete = (event) => {
    console.log(event.target.value);
    axios.delete("http://52.54.194.137:5000/api/shows/" + event.target.value);
  };

  render() {
    return (
      <div>
        <Header />
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper">
            <div className="container-fluid">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/dashboard"}>Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Running Movies</li>
              </ol>
            </div>
            <div className="container-fluid">
              <div className="card mx-auto">
                <div className="card-header">Movies</div>
                <div className="card-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <div className="form-row">
                        <Select
                          className="col-md-5"
                          id="countryid"
                          options={this.options}
                          value={this.state.value}
                          onChange={this.changeHandler}
                        />
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
                    <button className="btn btn-primary btn-block" type="submit">
                      check shows
                    </button>
                  </form>
                </div>
              </div>
              <div className="card mx-auto">
                <div className="card-header">ListShows</div>
                <div className="table">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Index</th>
                        <th>Movie Name</th>
                        <th>Theatre</th>
                        <th>City</th>
                        <th>Timing</th>
                        <th className="text-center">BookShow</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.shows.map((shows, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{shows.moviename}</td>

                          <td>{shows.theatre}</td>

                          <td>{shows.city}</td>

                          <td>{shows.timing}</td>

                          <td className="text-center">
                            {/* <Link
                              className={"btn btn-sm btn-danger"}
                              to={{
                                pathname: "/seat-select",
                                state: {
                                  moviename: shows.moviename,
                                  theatre: shows.theatre,
                                  price: shows.price,
                                },
                              }}
                            >
                              BookMovie
                            </Link> */}
                            <button
                              value={shows._id["$oid"]}
                              className={"btn btn-sm btn-danger delete"}
                              onClick={this.handleClickDelete}
                            >
                              Delete &nbsp;&nbsp;&nbsp;
                              <span
                                className="spinner-border spinner-border-sm d-none"
                                id={"delete" + shows.moviename}
                                role="status"
                                aria-hidden="true"
                              ></span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListMovies;
