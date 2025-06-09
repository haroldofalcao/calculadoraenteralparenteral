import React from 'react';
import { useRouteError } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function RouteErrorPage() {
  const error = useRouteError();
  const { t } = useTranslation();

  return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">{t('routeError.title')}</h4>
        <p>
          {t('routeError.message')}
        </p>
        <hr />
        <p className="mb-0">
          <i>{error?.statusText || error?.message || t('routeError.unknownError')}</i>
        </p>
        <button 
          className="btn btn-primary mt-3"
          onClick={() => window.history.back()}
        >
          {t('routeError.goBack')}
        </button>
      </div>
    </div>
  );
}

export default RouteErrorPage;
