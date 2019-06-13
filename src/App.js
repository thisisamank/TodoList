import React, { Component } from "react";
import { Container } from "reactstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/navbar/Header";
import about from "./Components/about/about";
import Todos from "./Components/todolist/Todos";
import TodoInput from "./Components/todolist/TodoInput";
import uuid from "uuid";

class App extends Component {
  state = {
    todos: []
  };

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
            render={props => (
              <Container
                style={{
                  margin: "auto",
                  width: "80%"
                }}
              >
                <TodoInput addTodo={this.addTodo} />
                <Todos todo={this.state.todos} delTodo={this.delTodo} />
              </Container>
            )}
          />
          <Route path="/about" component={about} />
        </Router>
      </div>
    );
  }
}

export default App;
