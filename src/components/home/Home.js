import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import './Home.css';

/* hér ætti að sækja forsíðu vefþjónustu til að sækja stats */

export default class Home extends Component {

  state = { data: null, loading: true, error: false}

  async componentDidMount() {
    try {
      const data = await this.fetchStats();
      this.setState({ data, loading: false });
    } catch (e) {
      console.error('Error fetching data', e);
      this.setState({ error: true, loading: false });
    }
  }

  async fetchStats() {
    const { url } = this.props;
    const response = await fetch('https://vefforritun2-2018-v4-synilausn.herokuapp.com/stats');
    const data = await response.json();
    return data.stats;
  }
  render() {

    const { data, loading, error } = this.state;

    if(loading) {
      return (<div>Waiting....</div>)
    }

    if(error) {
      return (<div>ERRORROROOR</div>)
    }
    return (
      <div className="home">
        <h1>Tölfræði</h1>
        <table>
          <tbody>
            <tr>
              <td>Fjöldi prófa</td>
              <td>{data.numTests}</td>
            </tr>
            <tr>
              <td>Fjöldi nemenda í öllum prófum</td>
              <td>{data.numStudents}</td>
            </tr>
            <tr>
              <td>Meðalfjöldi nemenda í prófi</td>
              <td>{data.averageStudents}</td>
            </tr>
            <tr>
              <td>Minnsti fjöldi nemenda í prófi</td>
              <td>{data.min}</td>
            </tr>
            <tr>
              <td>Mesti fjöldi nemenda í prófi</td>
              <td>{data.max}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
