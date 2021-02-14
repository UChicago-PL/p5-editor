import React from 'react';
import { useTranslation } from 'react-i18next';
import LogoIcon from '../images/p5js-logo-small.svg';

export default function Logo() {
  const { t } = useTranslation();
  return (
    <LogoIcon
      role="img"
      aria-label={t('Common.p5logoARIA')}
      focusable="false"
      className="svg__logo"
      // Using onClick instead of an a element because of weird css styling issues
      style={{ cursor: 'pointer' }}
      onClick={() => { window.location.href = '/'; }}
    />
  );
}

