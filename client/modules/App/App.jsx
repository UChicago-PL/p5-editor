import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setPreviousPath } from '../IDE/actions/ide';
import { setLanguage } from '../IDE/actions/preferences';

class App extends React.Component {
  componentDidMount() {
    document.body.className = this.props.theme;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const locationWillChange = nextProps.location !== this.props.location;
    const shouldSkipRemembering =
      nextProps.location.state && nextProps.location.state.skipSavingPath === true;

    if (locationWillChange && !shouldSkipRemembering) {
      this.props.setPreviousPath(this.props.location.pathname);
    }

    if (this.props.language !== nextProps.language) {
      this.props.setLanguage(nextProps.language, { persistPreference: false });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.theme !== prevProps.theme) {
      document.body.className = this.props.theme;
    }
  }

  render() {
    return <div className="app">{this.props.children}</div>;
  }
}

App.propTypes = {
  children: PropTypes.element,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.shape({
      skipSavingPath: PropTypes.bool
    })
  }).isRequired,
  setPreviousPath: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
  language: PropTypes.string,
  theme: PropTypes.string
};

App.defaultProps = {
  children: null,
  language: null,
  theme: 'light'
};

const mapStateToProps = (state) => ({
  theme: state.preferences.theme,
  language: state.preferences.language
});

const mapDispatchToProps = { setPreviousPath, setLanguage };

export default connect(mapStateToProps, mapDispatchToProps)(App);
