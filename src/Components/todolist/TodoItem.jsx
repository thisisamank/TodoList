import React, { Component } from "react";
import { Toast, ToastBody, ToastHeader, Button } from "reactstrap";

class TodoItem extends Component {
  render() {
    const { id, title, todo } = this.props.todo;
    return (
      <div>
        <div className="p-3 m-3 bg-info my-2">
          <Toast key={id}>
            <Button
              style={btnStyle}
              onClick={this.props.delTodo.bind(this, id)}
              close
            />
            <ToastHeader>{title}</ToastHeader>
            <ToastBody>{todo}</ToastBody>
          </Toast>
        </div>
      </div>
    );
  }
}
const btnStyle = {
  float: "right"
};

export default TodoItem;
