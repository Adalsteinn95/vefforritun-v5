import React, { Component } from "react";
import PropTypes from "prop-types";

import "./School.css";
import Department from "../department/Department";

/**
 * Í þessum component ætti að vera mest um að vera og séð um að:
 * - Sækja gögn fyrir svið og birta
 * - Opna/loka deildum
 */

export default class School extends Component {
  state = {
    data: null,
    loading: true,
    error: false,
    visibleKey: null
  };

  async componentDidMount() {
    try {
      const data = await this.fetchData();
      this.setState({ data, loading: false });
    } catch (e) {
      console.error("Error fetching data", e);
      this.setState({ error: true, loading: false });
    }
  }

  async fetchData() {
    const { department } = this.props.match.params;
    const response = await fetch(
      `https://vefforritun2-2018-v4-synilausn.herokuapp.com/${department}`
    );
    const data = await response.json();
    return data.school;
  }

  click = id => {
    return e => {
      this.setState({ visibleKey: id });
    };
  };

  render() {
    const { department } = this.props.match.params;

    const { loading, data, error } = this.state;

    if (loading) {
      return <div>Sæki gögn...</div>;
    }

    if (error) {
      return <div>Villa við að sækja gögn</div>;
    }

    return (
      <section className="school">
        <h1>{department}</h1>
        <div className="headings">
          {data.departments.map((item, key) => {
            return (
              <div className="headings__item" key={key}>
                <Department
                  {...item}
                  heading={item.heading}
                  click={this.click(key)}
                  visible={this.state.visibleKey === key}
                />
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}
