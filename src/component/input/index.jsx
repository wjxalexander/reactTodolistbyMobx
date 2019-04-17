import React, { Component } from "react";
import { Form, Icon, Input, Button } from "antd";
import s from './style.module.scss'
import { observer,inject } from "mobx-react";

@inject('store')
@observer
class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }
  handleSubmit = e => {
    let store = this.props.store;
    const {inputValue} = this.state;
    if(inputValue.trim()){
      store.createTodo(inputValue)
    }
    this.setState({ inputValue: "" });
  };
  handleInput = e => {
    const inputValue = e.target.value;
    this.setState({
      inputValue
    });
  };
  handleKeypress = (e)=>{
    (e.key === 'Enter') && this.handleSubmit()
  }
  render() {
    const { inputValue } = this.state;
    return (
      <div className={s.header}> 
        <Input
          placeholder="Add a Todo"
          value={inputValue}
          onChange={this.handleInput}
          onKeyPress={this.handleKeypress}
        />
        <Button type="primary" onClick={this.handleSubmit}>
          ADD
        </Button>
      </div>
    );
  }
}
export default TodoInput;
