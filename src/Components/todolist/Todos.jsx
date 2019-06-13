import React, { Component } from "react";
import TodoItem from "./TodoItem";

class Todos extends Component {
  render() {
    return (
      <div
        style={{
          padding: "2%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 300px)"
        }}
      >
        {this.props.todo.map(todo => (
          <TodoItem key={todo.id} todo={todo} delTodo={this.props.delTodo} />
        ))}
      </div>
    );
  }
}

export default Todos;
