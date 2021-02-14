import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import SocialAuthButton from '../components/SocialAuthButton';
import Nav from '../../../components/Nav';

function LoginView() {
  const { t } = useTranslation();
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
        </div>
      </main>
    </div>
  );
}

export default LoginView;
