import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import NotFound from "./pages/notfound";
import Register from "./pages/register";
import Forgotpassword from "./pages/forgot-password";
import Dashboard from "./pages/dashboard";
import index from "./pages/index";
import DashboardData from "./pages/dashboard-data";
import AddCategory from "./pages/category-add";
import ListCategory from "./pages/category-list";
import AddActor from "./pages/actor-add";
import ListActors from "./pages/actor-list";
import AddDirector from "./pages/director-add";
import ListDirectors from "./pages/director-list";
import AddProducer from "./pages/producer-add";
import ListProducer from "./pages/producer-list";
import ListMovies from "./pages/list-movies";
import AddMovie from "./pages/movie-add";
import AddTheatre from "./pages/theatre-add";
import ListTheatres from "./pages/theatres-list";
import AddShows from "./pages/show-add";
import ListShows from "./pages/list-shows";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/forgot-password" component={Forgotpassword} />
            <Route path="/index" component={index} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/dashboard-data" component={DashboardData} />
            <Route path="/category-add" component={AddCategory} />
            <Route path="/category-list" component={ListCategory} />
            <Route path="/actor-add" component={AddActor} />
            <Route path="/producer-add" component={AddProducer} />
            <Route path="/producer-list" component={ListProducer} />
            <Route path="/actor-list" component={ListActors} />
            <Route path="/director-add" component={AddDirector} />
            <Route path="/director-list" component={ListDirectors} />
            <Route path="/list-movies" component={ListMovies} />
            <Route path="/list-producer" component={ListProducer} />
            <Route path="/movie-add" component={AddMovie} />
            <Route path="/theatre-add" component={AddTheatre} />
            <Route path="/list-theatre" component={ListTheatres} />
            <Route path="/show-add" component={AddShows} />
            <Route path="/list-shows" component={ListShows} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
