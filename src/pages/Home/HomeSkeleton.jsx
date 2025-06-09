import React from 'react';
import { Container, Row, Col, Placeholder, Card } from 'react-bootstrap';

function HomeSkeleton() {
  return (
    <Container className="content-skeleton">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <div className="text-center mb-5">
            <Placeholder as="h1" animation="glow">
              <Placeholder xs={8} size="lg" />
            </Placeholder>
            <Placeholder as="p" animation="glow">
              <Placeholder xs={10} />
            </Placeholder>
          </div>

          <Row className="g-4">
            <Col md={6}>
              <Card className="h-100">
                <Card.Body>
                  <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={7} />
                  </Placeholder>
                  <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={12} />
                    <Placeholder xs={10} />
                    <Placeholder xs={8} />
                  </Placeholder>
                  <div className="mt-auto">
                    <Placeholder.Button variant="primary" xs={4} className="me-2" />
                    <Placeholder.Button variant="outline-primary" xs={4} />
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="h-100">
                <Card.Body>
                  <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={7} />
                  </Placeholder>
                  <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={12} />
                    <Placeholder xs={10} />
                    <Placeholder xs={8} />
                  </Placeholder>
                  <div className="mt-auto">
                    <Placeholder.Button variant="success" xs={4} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <Card className="bg-light">
                <Card.Body>
                  <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />
                  </Placeholder>
                  <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={12} />
                    <Placeholder xs={11} />
                    <Placeholder xs={9} />
                  </Placeholder>
                  <Placeholder as="small" animation="glow">
                    <Placeholder xs={8} />
                  </Placeholder>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HomeSkeleton;
