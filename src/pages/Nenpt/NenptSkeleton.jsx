import React from 'react';
import { Container, Row, Col, Placeholder, Card } from 'react-bootstrap';

function NenptSkeleton() {
  return (
    <Container className="content-skeleton">
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Placeholder as="h4" animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col md={6}>
                  <Placeholder as="label" animation="glow">
                    <Placeholder xs={4} />
                  </Placeholder>
                  <Placeholder as="div" animation="glow" className="form-control">
                    <Placeholder xs={8} />
                  </Placeholder>
                </Col>
                <Col md={6}>
                  <Placeholder as="label" animation="glow">
                    <Placeholder xs={4} />
                  </Placeholder>
                  <Placeholder as="div" animation="glow" className="form-control">
                    <Placeholder xs={8} />
                  </Placeholder>
                </Col>
                <Col md={6}>
                  <Placeholder as="label" animation="glow">
                    <Placeholder xs={4} />
                  </Placeholder>
                  <Placeholder as="div" animation="glow" className="form-control">
                    <Placeholder xs={8} />
                  </Placeholder>
                </Col>
                <Col md={6}>
                  <Placeholder as="label" animation="glow">
                    <Placeholder xs={4} />
                  </Placeholder>
                  <Placeholder as="div" animation="glow" className="form-control">
                    <Placeholder xs={8} />
                  </Placeholder>
                </Col>
              </Row>
              <div className="mt-4">
                <Placeholder.Button variant="primary" xs={3} className="me-2" />
                <Placeholder.Button variant="secondary" xs={3} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default NenptSkeleton;
