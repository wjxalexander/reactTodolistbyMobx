import React, { Component } from "react";
import TodoInput from "../component/input";
import { inject, observer } from "mobx-react";
import TodoItem from "../component/todoItem";
import ControlPannel from "../component/controlpannel";
import { toJS } from "mobx";

@inject("store")
@observer
class TodoList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props);
  }
  getTodos(index){
    const {todos, activeLists,completeLists} = this.props.store
    switch(index){
      case 0:
        return todos
      case 1:
        return activeLists
      case 2:
        return completeLists
      default:
        return todos
    }
  }
  render() {
    const { activePage} = this.props.store;
    const todos = this.getTodos(activePage)
    console.log("todos", todos);
    return (
      <div>
        <h1>todos powered by mobx</h1>
        <TodoInput />
        {todos.map(item => {
          return (
            <li key={item.id}>
              <TodoItem todo={item} />
            </li>
          );
        })}

        <ControlPannel /> 
        <footer>Author: j.wang 2019</footer>
      </div>
    );
  }
}

export default TodoList;
