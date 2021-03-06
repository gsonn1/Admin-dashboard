import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";

export default class CategryList extends Component {
  constructor(props) {
    super(props);
    this.url = "http://52.54.194.137:5000/api/theatre";
  }
  state = {
    theatres: [],
    redirect: false,
  };
  componentDidMount() {
    axios
      .get(this.url)
      .then((response) => {
        var theatredata = [];
        response.data.forEach((element) => {
          let obj = {
            theatrename: element.theatrename,
            capacity: element.capacity,
            rows: element.rows,
            city: element.city,
            country: element.country.label,
          };
          theatredata.push(obj);
        });
        if (response.data) this.setState({ theatres: theatredata });
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
      .delete("http://52.54.194.137:5000/api/theatre" + "/" + data)
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
                <li className="breadcrumb-item active">List Theatres</li>
              </ol>
            </div>
            <div className="container-fluid">
              <div className="table">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Index</th>
                      <th>Theatre Name</th>
                      <th>capacity</th>
                      <th>rows</th>
                      <th>country</th>
                      <th>city</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.theatres.map((theatres, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{theatres.theatrename}</td>

                        <td>{theatres.capacity}</td>

                        <td>{theatres.rows}</td>

                        <td>{theatres.country}</td>

                        <td>{theatres.city}</td>

                        <td className="text-center">
                          <button
                            value={theatres.theatrename}
                            className={"btn btn-sm btn-danger delete"}
                            onClick={this.handleClickDelete}
                          >
                            Delete &nbsp;&nbsp;&nbsp;
                            <span
                              className="spinner-border spinner-border-sm d-none"
                              id={"delete" + theatres.theatrename}
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
