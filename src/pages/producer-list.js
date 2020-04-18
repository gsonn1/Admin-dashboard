import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";

export default class producerlist extends Component {
  constructor(props) {
    super(props);
    this.url = "http://52.54.194.137:5000/api/movies/producer";
  }
  state = {
    producer: [],
    redirect: false,
  };
  componentDidMount() {
    axios
      .get(this.url)
      .then((response) => {
        if (response.data) this.setState({ producer: response.data });
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
      .delete("http://52.54.194.137:5000/api/movies/producer" + "/" + data)
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
                <li className="breadcrumb-item active">List producer</li>
              </ol>
            </div>
            <div className="container-fluid">
              <div className="table">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Index</th>
                      <th>producer Name</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.producer.map((producer, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{producer.producer}</td>

                        <td className="text-center">
                          <button
                            value={producer.producer}
                            className={"btn btn-sm btn-danger delete"}
                            onClick={this.handleClickDelete}
                          >
                            Delete &nbsp;&nbsp;&nbsp;
                            <span
                              className="spinner-border spinner-border-sm d-none"
                              id={"delete" + producer.producer}
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
