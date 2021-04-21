import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { withTranslation } from 'react-i18next';
import { withRouter, browserHistory } from 'react-router';
import { parse } from 'query-string';
import SocialAuthButton from '../components/SocialAuthButton';
import Nav from '../../../components/Nav';
import ErrorModal from '../../IDE/components/ErrorModal';
import Overlay from '../../App/components/Overlay';
import Toast from '../../IDE/components/Toast';

function SocialLoginPanel(props) {
  const { user, t } = props;
  return (
    <React.Fragment>
      <p className="account__social-text">{t('AccountView.SocialLoginDescription')}</p>
      <div className="account__social-stack">
        <SocialAuthButton service={SocialAuthButton.services.github} linkStyle isConnected={!!user.github} />
      </div>
    </React.Fragment>
  );
}

SocialLoginPanel.propTypes = {
  user: PropTypes.shape({ github: PropTypes.string }).isRequired,
  t: PropTypes.func.isRequired
};

class AccountView extends React.Component {
  componentDidMount() {
    document.body.className = this.props.theme;
  }

  render() {
    const queryParams = parse(this.props.location.search);
    const showError = !!queryParams.error;
    const errorType = queryParams.error;
    return (
      <div className="account-settings__container">
        <Helmet>
          <title>{this.props.t('AccountView.Title')}</title>
        </Helmet>
        {this.props.toast.isVisible && <Toast />}

        <Nav layout="dashboard" />

        {showError && (
          <Overlay
            title={this.props.t('ErrorModal.LinkTitle')}
            ariaLabel={this.props.t('ErrorModal.LinkTitle')}
            closeOverlay={() => {
              browserHistory.push(this.props.location.pathname);
            }}
          >
            <ErrorModal type="oauthError" service={errorType} />
          </Overlay>
        )}

        <main className="account-settings">
          <header className="account-settings__header">
            <h1 className="account-settings__title">{this.props.t('AccountView.Settings')}</h1>
          </header>
          <SocialLoginPanel {...this.props} />
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    initialValues: state.user, // <- initialValues for reduxForm
    previousPath: state.ide.previousPath,
    user: state.user,
    apiKeys: state.user.apiKeys,
    theme: state.preferences.theme,
    toast: state.toast
  };
}

AccountView.propTypes = {
  previousPath: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired
  }).isRequired,
  toast: PropTypes.shape({
    isVisible: PropTypes.bool.isRequired
  }).isRequired
};

export default withTranslation()(withRouter(connect(mapStateToProps)(AccountView)));
