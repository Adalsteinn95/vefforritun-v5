import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Helmet from "react-helmet";

import './Navigation.css';

/* hér ætti að sækja gögn frá vefþjónustu fyrir valmynd */

export default class Navigation extends Component {
  static propTypes = {
    url: PropTypes.string,
  }

  state = { data: null, loading: true, error: false };

  async componentDidMount() {
    try {
      const data = await this.fetchData();
      this.setState({ data, loading: false });
    } catch (e) {
      console.error('Error fetching data', e);
      this.setState({ error: true, loading: false });
    }
  }
  async fetchData() {
    const { url } = this.props;
    const response = await fetch(url);
    const data = await response.json();
    return data.schools;
  }

  render() {
    const { data, loading, error } = this.state;

    if (loading) {
      return (
        <div>
          <p>Waiting....</p>
          <Helmet title="wait for" />
        </div>
      );
    }

    if (error) {
      return (
        <div>
          <p>Villa við að sækja gögn</p>
          <Helmet title="Villa">
            <style>{`body { background-color: red; }`}</style>
          </Helmet>
        </div>
      );
    }

    return (
      <nav className='navigation'>
        <h1 className='navigation__header'>Próftöflur</h1>
        <ul className='navigation__items'>
          {data.map((item, key) => {
            return (
              <li className='navigation__item'key={key}>
                <NavLink activeClassName='toggled' to={`/${item.slug}`} >{item.name}</NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}
