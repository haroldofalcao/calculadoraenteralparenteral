import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <div className="text-center mb-5">
            <h1 className="display-4 text-primary mb-3">
              {t('home.title')}
            </h1>
            <p className="lead text-muted">
              {t('home.subtitle')}
            </p>
          </div>

          <Row className="g-4">
            <Col md={6}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-primary">
                    <i className="fas fa-calculator me-2"></i>
                    {t('home.nenpt.title')}
                  </Card.Title>
                  <Card.Text className="flex-grow-1">
                    {t('home.nenpt.description')}
                  </Card.Text>
                  <div className="mt-auto">
                    <Button as={Link} to="/nenpt" variant="primary" className="me-2">
                      {t('home.nenpt.accessCalculator')}
                    </Button>
                    <Button as={Link} to="/nenpt/gerenciar-produtos" variant="outline-primary">
                      {t('home.nenpt.manageProducts')}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-success">
                    <i className="fas fa-stethoscope me-2"></i>
                    {t('home.gids.title')}
                  </Card.Title>
                  <Card.Text className="flex-grow-1">
                    {t('home.gids.description')}
                  </Card.Text>
                  <div className="mt-auto">
                    <Button as={Link} to="/gids" variant="success">
                      {t('home.gids.access')}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <Card className="bg-light">
                <Card.Body>
                  <Card.Title className="text-info">
                    <i className="fas fa-info-circle me-2"></i>
                    {t('home.about.title')}
                  </Card.Title>
                  <Card.Text>
                    {t('home.about.description')}
                  </Card.Text>
                  <small className="text-muted">
                    <strong>{t('home.about.license')}</strong>
                  </small>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
