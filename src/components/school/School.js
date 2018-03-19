import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './School.css';

/**
 * Í þessum component ætti að vera mest um að vera og séð um að:
 * - Sækja gögn fyrir svið og birta
 * - Opna/loka deildum
 */

export default class School extends Component {

  state = { data: null, loading: true, error: false}

  async componentDidMount() {
    try {
      const data = await this.fetchData();
      this.setState({ data, loading: false});
    } catch (e) {
      console.error('Error fetching data', e);
      this.setState({ error: true, loading: false });
    }
  }


  async fetchData() {
    const { department } = this.props.match.params;
    const response = await fetch(`https://vefforritun2-2018-v4-synilausn.herokuapp.com/${department}`);
    const data = await response.json();
    return data.school;
  }

  open  = (e) => {
    e.preventDefault();

    var a = document.getElementById('table' + e.target.id);


    if(a.classList.value === 'hidden') {
      a.classList = 'show';
    } else {
      a.classList = 'hidden';
    }

    if(e.target.textContent[0] === '+') {
      e.target.textContent = e.target.textContent.replace('+','-')
    } else {
      e.target.textContent = e.target.textContent.replace('-','+')
    }
  }

  render() {
    const {
      department,
    } = this.props.match.params;

    const {
      loading,
      data,
      error,
      usedData,
    } = this.state;

    if (loading) {
      return (<div>Sæki gögn...</div>);
    }

    if (error) {
      return (<div>Villa við að sækja gögn</div>);
    }

    return (
      <section className="school">
        <h1>{department}</h1>
        <div className="headings" >
          {data.departments.map((item, key)=>{
            return (<div className="headings__item" key={key} >
                      <div className="headings__toggle" onClick={this.open} id={key} key={key} >+ {item.heading}</div>
                      <table id={`table${key}`} className ="hidden">
                        <thead>
                          <tr>
                            <th>Auðkenni</th>
                            <th>Námskeið</th>
                            <th>Fjöldi</th>
                            <th>Dagsetning</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.tests.map((item, key)=>{
                            return(
                              <tr key={key}>
                                <td>
                                  {item.course}
                                </td>
                                <td>
                                  {item.name}
                                </td>
                                <td>
                                  {item.students}
                                </td>
                                <td>
                                  {item.date}
                                </td>
                              </tr>
                          )})}
                        </tbody>
                      </table>
                    </div>) })}
        </div>
      </section>
    );
  }
}
