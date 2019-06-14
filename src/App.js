import React, { Component } from "react";
import { Container } from "reactstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/navbar/Header";
import Todos from "./Components/todolist/Todos";
import TodoInput from "./Components/todolist/TodoInput";
import uuid from "uuid";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import About from "./Components/about/About";

firebase.initializeApp({
  apiKey: "AIzaSyBssQncOUrTyStS8Oq8KetIIJ7C7sUfHkk",
  authDomain: "todolist-b1759.firebaseapp.com",
  databaseURL: "https://todolist-b1759.firebaseio.com",
  projectId: "todolist-b1759",
  storageBucket: "todolist-b1759.appspot.com",
  messagingSenderId: "280850416757",
  appId: "1:280850416757:web:94c4d751ecc091ce"
});
class App extends Component {
  RouteGuard = Component => {
    console.log(this.state.isSignedIn);
    if (this.state.isSignedIn === true) {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      return Component;
    } else {
      return (
        <div>
          {console.log("something is wrong")}
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={
              firebase.auth()
              // .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
              // .then(() => firebase.auth())
              // .catch(console.log("error"))
            }
          />
        </div>
      );
    }
  };

  state = {
    isSignedIn: false,
    todos: []
  };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    });
  }

  addTodo = props => {
    const { title, todo } = props;
    const id = uuid.v1();
    const isCompleted = false;
    this.setState({
      todos: [...this.state.todos, { id, title, todo, isCompleted }]
    });
  };
  delTodo = id => {
    this.setState({
      todos: this.state.todos.filter(item => item.id !== id)
    });
  };
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Route
            exact
            path="/"
            render={props =>
              this.RouteGuard(
                <Container
                  id="main-container"
                  style={{
                    margin: "auto",
                    width: "80%"
                  }}
                >
                  <TodoInput addTodo={this.addTodo} />
                  <Todos
                    style={{
                      margin: "auto"
                    }}
                    todo={this.state.todos}
                    delTodo={this.delTodo}
                  />
                </Container>
              )
            }
          />
          <Route
            exact
            path="/about"
            render={props => this.RouteGuard(<About />)}
          />
        </Router>
      </div>
    );
  }
}

export default App;
