/*
 * @Author: fuzhenghao
 * @Date: 2021-09-16 10:05:01
 * @LastEditTime: 2021-09-16 14:07:56
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \react_piracy\react\component.js
 *
 */

import { renderComponent } from "../react-dom";

class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
  }
  setState(stateChange) {
    Object.assign(this.state, stateChange);
    renderComponent(this);
  }
}

export default Component;
