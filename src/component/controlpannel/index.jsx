import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import s from "./style.module.scss";

const operationStack = ["All", "Active", "Completed"];

@inject("store")
@observer
class ControlPannel extends Component {
  constructor(props) {
    super(props);
  }
  handleClick = (e, index) => {
    e.preventDefault()
    let {store} = this.props;
    store.changePage(index)
  };
  render() {
    const {
      store: { left,clearAll }
    } = this.props;
    const { store:{activePage} } = this.props;
    // computed attribute doesnot need ()
    return (
      <div className={s.container}>
        <span>
          {left} {left > 1 ? "items" : "item"} left
        </span>
        {operationStack.map((item, index) => {
          return (
            <Fragment key={Math.random()}>
              <a
                className={index === activePage ? s.selected : null}
                onClick={e => this.handleClick(e, index)}
              >
                {item}
              </a>
            </Fragment>
          );
        })}
        <a onClick={clearAll}>delete ALL</a>
      </div>
    );
  }
}
export default ControlPannel;
