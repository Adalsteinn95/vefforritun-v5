import React, { Component } from "react";
import PropTypes from "prop-types";

import "./School.css";
import Department from "../department/Department";
import NotFound from "../not-found/NotFound";

/**
 * Í þessum component ætti að vera mest um að vera og séð um að:
 * - Sækja gögn fyrir svið og birta
 * - Opna/loka deildum
 */

export default class School extends Component {

  static propTypes = {
    url: PropTypes.number,
  }

  state = {
    data: null,
    loading: true,
    error: false,
    visibleKey: null,
    url: null
  };

  async componentDidMount() {
    try {
      const data = await this.fetchData();
      this.setState({ data, loading: false, url: this.props.match.url });
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

  headerClick = id => {
    return e => {
      this.setState(prevState => ({
        visibleKey: prevState.visibleKey === id ? null : id,
      }));
    };
  };

  render() {
    const { loading, data, error } = this.state;

  

    if (this.state.url !== this.props.match.url) {
      this.componentDidMount();
    }

    if (loading) {
      return <div>Sæki gögn...</div>;
    }

    if (error) {
      return <div>Villa við að sækja gögn</div>;
    }

    if (!data) {
      return <NotFound />
    }
    return (
      <section className="school">
        <h1>{data.heading}</h1>
        <div className="headings" >
          {data.departments.map((item, key) => {
            return (
              <div className="headings__item" key={key}>
                <Department
                  {...item}
                  key={key}
                  headerClick={this.headerClick(key)}
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
