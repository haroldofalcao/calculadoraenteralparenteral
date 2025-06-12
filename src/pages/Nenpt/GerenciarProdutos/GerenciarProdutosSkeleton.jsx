import React from 'react';
import { Container, Row, Col, Placeholder, Card, Table } from 'react-bootstrap';

function GerenciarProdutosSkeleton() {
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
              <Row className="g-3 mb-4">
                <Col md={4}>
                  <Placeholder as="label" animation="glow">
                    <Placeholder xs={6} />
                  </Placeholder>
                  <Placeholder as="div" animation="glow" className="form-control">
                    <Placeholder xs={10} />
                  </Placeholder>
                </Col>
                <Col md={3}>
                  <Placeholder as="label" animation="glow">
                    <Placeholder xs={4} />
                  </Placeholder>
                  <Placeholder as="div" animation="glow" className="form-control">
                    <Placeholder xs={8} />
                  </Placeholder>
                </Col>
                <Col md={3}>
                  <Placeholder as="label" animation="glow">
                    <Placeholder xs={4} />
                  </Placeholder>
                  <Placeholder as="div" animation="glow" className="form-control">
                    <Placeholder xs={8} />
                  </Placeholder>
                </Col>
                <Col md={2} className="d-flex align-items-end">
                  <Placeholder.Button variant="primary" xs={12} />
                </Col>
              </Row>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>
                      <Placeholder xs={6} />
                    </th>
                    <th>
                      <Placeholder xs={4} />
                    </th>
                    <th>
                      <Placeholder xs={4} />
                    </th>
                    <th>
                      <Placeholder xs={4} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, index) => (
                    <tr key={index}>
                      <td>
                        <Placeholder xs={8} />
                      </td>
                      <td>
                        <Placeholder xs={6} />
                      </td>
                      <td>
                        <Placeholder xs={6} />
                      </td>
                      <td>
                        <Placeholder.Button variant="danger" size="sm" xs={8} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default GerenciarProdutosSkeleton;
