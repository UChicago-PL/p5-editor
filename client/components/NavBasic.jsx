import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';

import Logo from './Logo';
import ArrowIcon from '../images/triangle-arrow-left.svg';

class NavBasic extends React.PureComponent {
  static defaultProps = {
    onBack: null
  };

  render() {
    return (
      <nav
        className="nav"
        title="main-navigation"
        ref={(node) => {
          this.node = node;
        }}
      >
        <ul className="nav__items-left">
          <li className="nav__item-logo">
            <Logo />
          </li>
          {this.props.onBack && (
            <li className="nav__item">
              <button onClick={this.props.onBack}>
                <span className="nav__item-header">
                  <ArrowIcon focusable="false" aria-hidden="true" />
                </span>
                Back to the editor
              </button>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}

NavBasic.propTypes = {
  onBack: PropTypes.func
};

export default withTranslation()(NavBasic);
