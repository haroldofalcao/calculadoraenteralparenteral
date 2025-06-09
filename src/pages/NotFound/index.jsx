import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NotFound() {
  const { t } = useTranslation();

  return (
    <Container>
      <Row className="justify-content-center text-center">
        <Col md={6}>
          <div className="py-5">
            <h1 className="display-1 text-muted">404</h1>
            <h2 className="mb-4">{t('notFound.title')}</h2>
            <p className="lead text-muted mb-4">
              {t('notFound.message')}
            </p>
            <Link to="/" className="btn btn-primary">
              {t('notFound.backHome')}
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
