import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Navigation.css';

/* hér ætti að sækja gögn frá vefþjónustu fyrir valmynd */

export default class Navigation extends Component {

  state = { data: null, loading: true, error:false }

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

    if(loading) {
      return (<div>Waiting....</div>)
    }

    if(error) {
      return (<div>ERORORORO</div>)
    }
    
    return (
      <nav className="navigation">
        <h1>Próftöflur</h1>
        <div className="departments">
          {data.map((item, key)=>{
            return <div className="departments__item" key={key}><a href={item.slug}>{item.name}</a></div>
          })}
        </div>
      </nav>
    );
  }
}

