import { Component } from "preact";
import { remote } from "electron";

import style from "./style";

export default class Header extends Component {
  handleClose = () => {
    remote.BrowserWindow.getFocusedWindow().close();
  };

  handleMinimize = () => {
    remote.BrowserWindow.getFocusedWindow().minimize();
  };

  handleMaximize = () => {
    remote.BrowserWindow.getFocusedWindow().maximize();
  };

  render() {
    return (
      <header class={style.header}>
        <button class={style.close} onClick={this.handleClose} />
        <button class={style.minimize} onClick={this.handleMinimize} />
        <button class={style.zoom} onClick={this.handleMaximize} />
      </header>
    );
  }
}
