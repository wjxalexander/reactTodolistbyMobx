import React, { Component, Fragment } from "react";
import { Checkbox, Icon } from "antd";
import { inject, observer } from "mobx-react";
import s from "./style.module.scss";
@inject("store")
@observer
class TodoItem extends Component {
 
  onChange = () => {
    const {todo} = this.props
    todo.toggle()
  };
  render() {
    let { todo,store } = this.props;
    return (
      <div className={s.container}>
        <div>
          <Checkbox 
          onChange={this.onChange}
          checked = {todo.finished}
          />
          <span className={todo.finished ? s.finished : null}>{todo.title}</span>
        </div>
        <a onClick={(e)=>store.removeTodo(todo)}> <Icon type="delete" /></a>
      </div>
    );
  }
}
export default TodoItem;
