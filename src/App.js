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
import FirebaseUtil from "./database/FirebaseUtil";

firebase.initializeApp({
  apiKey: "AIzaSyBssQncOUrTyStS8Oq8KetIIJ7C7sUfHkk",
  authDomain: "todolist-b1759.firebaseapp.com",
  databaseURL: "https://todolist-b1759.firebaseio.com",
  projectId: "todolist-b1759",
  storageBucket: "todolist-b1759.appspot.com",
  messagingSenderId: "280850416757",
  appId: "1:280850416757:web:94c4d751ecc091ce"
});
let database = firebase.firestore();
class App extends Component {
  /**
   * This method takes a Components as a parameter and checks whether the user * is signed in or not, it returns the same component if @isSignedIn istate
   * is true otherwise returns firebaseui for logging in
   */

  state = {
    todos: [],
    uid: ""
  };

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: result => {
        localStorage.setItem("isSignedIn", JSON.stringify(true));
        localStorage.setItem("uid", result.uid);
        this.setState({ uid: firebase.auth().currentUser.uid });
        console.log(this.state.uid);
      }
    }
  };
  // getFirebaseData() {
  //   let todolist;
  //   let getTodoFromFirebase = database.collection(localStorage.uid);
  //   getTodoFromFirebase
  //     .get()
  //     .then(doc => doc.docs.filter(d =>
  //     .catch(e => console.log(e));
  //   console.log(todolist);
  // }
  componentDidMount() {
    console.log(localStorage.uid);
    let getTodoFromFirebase = database.collection(localStorage.uid);
    getTodoFromFirebase
      .get()
      .then(doc => {
        console.log(doc);
        doc.docs.filter(d => {
          this.setState({ todos: [...this.state.todos, d.data()] });
        });
      })
      .catch(e => console.log(e));

    this.setState({
      isSignedIn: localStorage.isSignedIn
    });
    firebase.auth().onAuthStateChanged(user => {
      //console.log(user.displayName + " component did mount");
      if (user === null) {
        localStorage.setItem("isSignedIn", JSON.stringify(false));
      } else {
        localStorage.setItem("isSignedIn", JSON.stringify(true));
      }
    });
  }

  addTodo = props => {
    const { title, todo } = props;
    const id = uuid.v1();
    const isCompleted = false;
    const newTodo = { id, title, todo, isCompleted };
    localStorage.setItem("uid", firebase.auth().currentUser.uid);
    database
      .collection(firebase.auth().currentUser.uid)
      .doc(id)
      .set(newTodo)
      .then(() => {
        this.setState({
          todos: [...this.state.todos, newTodo]
        });
      })
      .catch(e => console.log(e));
  };

  delTodo = id => {
    database
      .collection(localStorage.uid)
      .doc(id)
      .delete()
      .then(() => {
        console.log("deleted + ", id);
        this.setState({
          todos: this.state.todos.filter(item => item.id !== id)
        });
      })
      .catch(e => console.log(e));
  };

  RouteGuard = Component => {
    if (localStorage.isSignedIn == "true") {
      return Component;
    } else {
      return (
        <div>
          {console.log("Firebase Auth Called!")}
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      );
    }
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
