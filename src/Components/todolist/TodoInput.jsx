import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Button, Input } from "reactstrap";

class TodoInput extends Component {
  state = {
    title: "",
    todo: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    this.props.addTodo(this.state);
    this.setState({ title: "", todo: "" });
  };

  render() {
    return (
      <form style={todoStyles} onSubmit={this.onSubmit}>
        <InputGroup>
          <Input
            placeholder="Title"
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.onChange}
          />
          <Input
            placeholder="Todo"
            name="todo"
            type="text"
            value={this.state.todo}
            onChange={this.onChange}
          />
          <InputGroupAddon addonType="append">
            <Button color="primary">Submit</Button>
          </InputGroupAddon>
        </InputGroup>
      </form>
    );
  }
}
const todoStyles = {
  marginTop: "20px"
};

export default TodoInput;
