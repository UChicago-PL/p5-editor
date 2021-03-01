import React from 'react';
import { useTranslation } from 'react-i18next';
import LogoIcon from '../images/p5js-logo-small.svg';

export default function Logo() {
  const { t } = useTranslation();
  return (
    <a href="/" className="svg__logo_link">
      <LogoIcon role="img" aria-label={t('Common.p5logoARIA')} focusable="false" className="svg__logo" />
    </a>
  );
}
