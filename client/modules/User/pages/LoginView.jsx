import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { browserHistory } from 'react-router';
import { parse } from 'query-string';
import PropTypes from 'prop-types';
import SocialAuthButton from '../components/SocialAuthButton';
import Nav from '../../../components/Nav';
import Overlay from '../../App/components/Overlay';
import ErrorModal from '../../IDE/components/ErrorModal';

function LoginView({ location }) {
  const { t } = useTranslation();

  const queryParams = parse(location.search);
  return (
    <div className="login">
      <Nav layout="dashboard" />
      <main className="form-container">
        <Helmet>
          <title>{t('LoginView.Title')}</title>
        </Helmet>
        <div className="form-container__content">
          <h2 className="form-container__title">{t('LoginView.Login')}</h2>
          <div className="form-container__stack">
            <SocialAuthButton service={SocialAuthButton.services.github} />
          </div>

          {queryParams.error && (
            <Overlay
              title={t('ErrorModal.LinkTitle')}
              ariaLabel={t('ErrorModal.LinkTitle')}
              closeOverlay={() => {
                browserHistory.push(location.pathname);
              }}
            >
              <ErrorModal type="oauthError" service={queryParams.error} />
            </Overlay>
          )}
        </div>
      </main>
    </div>
  );
}

LoginView.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default LoginView;
