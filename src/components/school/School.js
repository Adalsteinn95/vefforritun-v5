import React, { Component } from "react";
import PropTypes from "prop-types";

import "./School.css";
import Department from "../department/Department";
import NotFound from "../not-found/NotFound";
import Helmet from "react-helmet";

/**
 * Í þessum component ætti að vera mest um að vera og séð um að:
 * - Sækja gögn fyrir svið og birta
 * - Opna/loka deildum
 */

export default class School extends Component {
  static propTypes = {
    url: PropTypes.number
  };

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

  async componentWillReceiveProps() {
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
      `${process.env.REACT_APP_SERVICE_URL}${department}`
    );

    const data = await response.json();
    return data.school;
  }

  headerClick = id => {
    return e => {
      this.setState(prevState => ({
        visibleKey: prevState.visibleKey === id ? null : id
      }));
    };
  };

  render() {
    const { loading, data, error } = this.state;

    if (this.state.url !== this.props.match.url) {
      this.componentWillReceiveProps();
    }

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

    if (!data) {
      return <NotFound />;
    }

    return (
      <section className="school">
        <h1>{data.heading}</h1>
        <div className="headings">
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
