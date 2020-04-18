import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";

export default class CategryList extends Component {
  constructor(props) {
    super(props);
    this.url = "http://52.54.194.137:5000/api/movies/category";
  }
  state = {
    category: [],
    redirect: false,
  };
  componentDidMount() {
    axios
      .get(this.url)
      .then((response) => {
        if (response.data) {
          this.setState({ category: response.data });
        }
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
      .delete("http://52.54.194.137:5000/api/movies/category" + "/" + data)
      .then((response) => {
        console.log(response);
        this.componentDidMount();
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
                <li className="breadcrumb-item active">List category</li>
              </ol>
            </div>
            <div className="container-fluid">
              <div className="table">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Index</th>
                      <th>category Name</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.category.map((category, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{category.category}</td>

                        <td className="text-center">
                          <button
                            value={category.category}
                            className={"btn btn-sm btn-danger delete"}
                            onClick={this.handleClickDelete}
                          >
                            Delete &nbsp;&nbsp;&nbsp;
                            <span
                              className="spinner-border spinner-border-sm d-none"
                              id={"delete" + category.category}
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
