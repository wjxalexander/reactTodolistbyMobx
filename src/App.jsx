import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import TodoList from "./contains/index";
import { Store } from "./store";
import { observer, Provider, inject } from "mobx-react";

let store = new Store();
class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store = {store}>
          <TodoList />
        </Provider>
      </div>
    );
  }
}

export default App;
