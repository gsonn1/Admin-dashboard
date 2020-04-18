import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Sidebar extends Component {
  render() {
    return (
      <div id="wrapper">
        <ul className="sidebar navbar-nav">
          <li className="nav-item active">
            <Link to={"/dashboard"} className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>&nbsp; AdminDashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/dashboard-data"} className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>&nbsp;Dasahboard</span>
            </Link>
          </li>
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to={""}
              id="pagesDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-fw fa-film"></i>
              <span>&nbsp;Add Movie</span>
            </Link>
            <div className="dropdown-menu" aria-labelledby="pagesDropdown">
              <Link
                to={"/category-add"}
                className="dropdown-header fas fa-fw fa-film"
              >
                Add category
              </Link>
              <div className="dropdown-divider "></div>
              <Link
                to={"/actor-add"}
                className="dropdown-header fas fa-fw fa-film"
              >
                Add Actor
              </Link>
              <div className="dropdown-divider "></div>
              <Link
                to={"/director-add"}
                className="dropdown-header fas fa-fw fa-film"
              >
                Add Director
              </Link>
              <div className="dropdown-divider "></div>
              <Link
                to={"/producer-add"}
                className="dropdown-header fas fa-fw fa-film"
              >
                Add producer
              </Link>
              <div className="dropdown-divider "></div>
              <Link
                to={"/movie-add"}
                className="dropdown-header fas fa-fw fa-film"
              >
                Add movie
              </Link>
              <div className="dropdown-divider "></div>
              <Link
                to={"/movie-photo-add"}
                className="dropdown-header fas fa-fw fa-film"
              >
                Add Movie picture
              </Link>
              <div className="dropdown-divider "></div>
            </div>
          </li>
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to={""}
              id="pagesDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-fw fa-list"></i>
              <span>&nbsp;Movie Listings</span>
            </Link>
            <div className="dropdown-menu" aria-labelledby="pagesDropdown">
              <Link
                to={"/category-list"}
                className="dropdown-header fas fa-fw fa-film"
              >
                List category
              </Link>
              <div className="dropdown-divider "></div>
              <Link
                to={"/actor-list"}
                className="dropdown-header fas fa-fw fa-film"
              >
                List Actors
              </Link>
              <div className="dropdown-divider "></div>
              <Link
                to={"/director-list"}
                className="dropdown-header fas fa-fw fa-film"
              >
                List Directors
              </Link>
              <div className="dropdown-divider "></div>
              <Link
                to={"/producer-list"}
                className="dropdown-header fas fa-fw fa-film"
              >
                List Producers
              </Link>
              <div className="dropdown-divider "></div>
              <Link
                to={"/list-movies"}
                className="dropdown-header fas fa-fw fa-film"
              >
                List Movies
              </Link>
              <div className="dropdown-divider "></div>
            </div>
          </li>
          <li className="nav-item">
            <Link to={"/theatre-add"} className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>&nbsp;Add Theatre</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/list-theatre"} className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>&nbsp;List Theatres</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/show-add"} className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>&nbsp;Add Shows</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/list-shows"} className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>&nbsp;List Shows</span>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
