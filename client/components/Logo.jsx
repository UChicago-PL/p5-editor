import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Logo() {
  const { t } = useTranslation();
  return (
    <a href="/" className="svg__logo_link">
      <div aria-label={t('Common.p5logoARIA')} focusable="false" style={{ fontWeight: 900 }}>
        p5
      </div>
      <div
        aria-label={t('Common.p5logoARIA')}
        focusable="false"
        style={{ fontWeight: 100, marginLeft: '7px' }}
      >
        {' * cs111'}
      </div>
    </a>
  );
}
