import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";

export default class CategryList extends Component {
  constructor(props) {
    super(props);
    this.url = "http://52.54.194.137:5000/api/movies";
  }
  state = {
    movies: [],
    redirect: false,
  };
  componentDidMount() {
    axios
      .get(this.url)
      .then((response) => {
        console.log(response.data);
        var moviedata = [];
        response.data.forEach((element) => {
          let obj = {
            actor: element.actor.value,
            category: element.category.value,
            director: element.director.value,
            producer: element.producer.value,
            duration: element.duration.value,
            moviename: element.moviename,
            video: element.video,
          };
          moviedata.push(obj);
        });
        if (response.data) this.setState({ movies: moviedata });
      })
      .catch((error) => {
        this.setState({ toDashboard: true });
        console.log(error);
      });
  }

  handleClickDelete(event) {
    const data = event.target.value;
    console.log(data);
    axios
      .delete("http://52.54.194.137:5000/api/movies" + "/" + data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.toString());
      });
  }

  render() {
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
                <li className="breadcrumb-item active">List movies</li>
              </ol>
            </div>
            <div className="container-fluid">
              <div className="table">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Index</th>
                      <th>Movie Name</th>
                      <th>Duration</th>
                      <th>Director</th>
                      <th>Producer</th>
                      <th>Actor</th>
                      <th>Category</th>
                      <th>wathc trailer</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.movies.map((movies, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{movies.moviename}</td>

                        <td>{movies.duration}</td>

                        <td>{movies.director}</td>

                        <td>{movies.producer}</td>

                        <td>{movies.actor}</td>

                        <td>{movies.category}</td>

                        <td>
                          <a href={movies.video}>{movies.video}</a>
                        </td>

                        <td className="text-center">
                          <button
                            value={movies.moviename}
                            className={"btn btn-sm btn-danger delete"}
                            onClick={this.handleClickDelete}
                          >
                            Delete &nbsp;&nbsp;&nbsp;
                            <span
                              className="spinner-border spinner-border-sm d-none"
                              id={"delete" + movies.moviename}
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
            <footer className="sticky-footer">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright © Your Website </span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}
