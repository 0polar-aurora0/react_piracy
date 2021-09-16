/*
 * @Author: fuzhenghao
 * @Date: 2021-09-16 09:44:19
 * @LastEditTime: 2021-09-16 14:53:24
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \react_piracy\src\components\home.js
 *
 */
import React from "../../react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
  }

  componenetWillMount() {
    console.log("组件将要挂载");
  }

  componenetWillReceiveProps(props) {
    console.log(props);
  }

  componenetDidMount() {
    console.log("组件挂载完成");
  }

  componenetWillUpdate() {
    console.log("组件将要更新");
  }

  componenetDidUpdate() {
    console.log("组件更新完成");
  }

  //   buttonClick = () => {
  //     console.log("按钮触发");
  //     let { number } = this.state;
  //     this.setState({
  //       number: number + 1,
  //     });
  //   };
  buttonClick = () => {
    console.log("按钮触发");
    let { number } = this.state;
    this.setState({
      number: number + 1,
    });
  };

  render() {
    let { number } = this.state;
    return (
      <div>
        <div className="home">这里是home组件{number}</div>
        <button onClick={this.buttonClick}>click me</button>
      </div>
    );
  }
}

export default Home;
