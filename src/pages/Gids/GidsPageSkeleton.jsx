import React from 'react';
import { Container, Row, Col, Placeholder, Card } from 'react-bootstrap';

function GidsPageSkeleton() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          {/* Header skeleton */}
          <Card className="mb-4">
            <Card.Header className="bg-primary text-white text-center">
              <Placeholder as="h1" animation="glow">
                <Placeholder xs={8} size="lg" />
              </Placeholder>
            </Card.Header>
          </Card>

          {/* Patient info skeleton */}
          <Card className="mb-4">
            <Card.Body>
              <Placeholder as="h5" animation="glow" className="mb-3">
                <Placeholder xs={6} />
              </Placeholder>
              <Row className="g-3">
                <Col md={6}>
                  <Placeholder as="label" animation="glow">
                    <Placeholder xs={4} />
                  </Placeholder>
                  <Placeholder as="div" animation="glow" className="form-control">
                    <Placeholder xs={10} />
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
                    <Placeholder xs={3} />
                  </Placeholder>
                  <Placeholder as="div" animation="glow" className="form-control">
                    <Placeholder xs={6} />
                  </Placeholder>
                </Col>
                <Col md={6}>
                  <Placeholder as="label" animation="glow">
                    <Placeholder xs={5} />
                  </Placeholder>
                  <Placeholder as="div" animation="glow" className="form-control">
                    <Placeholder xs={8} />
                  </Placeholder>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Symptoms sections skeleton */}
          {[...Array(3)].map((_, sectionIndex) => (
            <Card key={sectionIndex} className="mb-4">
              <Card.Body>
                <Placeholder as="h5" animation="glow" className="mb-3">
                  <Placeholder xs={7} />
                </Placeholder>
                {[...Array(4)].map((_, itemIndex) => (
                  <div key={itemIndex} className="d-flex align-items-center mb-3 p-2 bg-light rounded">
                    <Placeholder as="div" animation="glow" style={{ width: '20px', height: '20px' }} className="me-3" />
                    <Placeholder as="span" animation="glow">
                      <Placeholder xs={9} />
                    </Placeholder>
                  </div>
                ))}
              </Card.Body>
            </Card>
          ))}

          {/* Result skeleton */}
          <Card className="mb-4">
            <Card.Body className="text-center">
              <Placeholder as="div" animation="glow" className="p-3 rounded">
                <Placeholder xs={8} size="lg" />
              </Placeholder>
            </Card.Body>
          </Card>

          {/* Buttons skeleton */}
          <div className="d-flex justify-content-between">
            <Placeholder.Button variant="secondary" xs={3} />
            <Placeholder.Button variant="primary" xs={3} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default GidsPageSkeleton;

