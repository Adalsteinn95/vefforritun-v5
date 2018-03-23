import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Department.css";

/**
 * Þessi component ætti að vera einfaldur í birtingu en taka fall frá foreldri
 * sem keyrir þegar smellt er á fyrirsögn.
 */

export default class Exams extends Component {
  render() {
    const { tests, heading } = this.props;
    
    const display = this.props.visible ? 'block' : 'none';

    const symbol = display === 'block' ? '-' : '+';

    return (
      <section className="department">
        <button className="headings__toggle" onClick={this.props.headerClick}>
          {symbol} {heading}
        </button>
        <table style={{ display }}>
          <thead>
            <tr>
              <th>Auðkenni</th>
              <th>Námskeið</th>
              <th>Fjöldi</th>
              <th>Dagsetning</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item.course}</td>
                  <td>{item.name}</td>
                  <td>{item.students}</td>
                  <td>{item.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    );
  }
}
