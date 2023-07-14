import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLanguage } from '../store/languageSlice';
import '../header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clock: ''
    }
  }

  componentDidMount() {
    this.digitalClock();
  }
  
  digitalClock() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    this.setState({ clock: `${hours}:${minutes}:${seconds}` });
    setTimeout(() => {
      this.digitalClock();
    }, 1000);
  }

  handleLanguageChange(event) {
    this.props.dispatch(setLanguage(event.target.value));
  }

  render() {
    const { language } = this.props;
    const { clock } = this.state;
    
    return (
      <div className="headerWrapper">
        <div>
          <img className="logo" src="logo.svg" alt="" />
        </div>
        <div className="rightGrid">
          <div className="watch">{clock}</div>
          <hr />
          <select className="selectRuEng" id="selectRuEng" value={language} onChange={(event) => this.handleLanguageChange(event)}>
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.language
});

export default connect(mapStateToProps)(Header);