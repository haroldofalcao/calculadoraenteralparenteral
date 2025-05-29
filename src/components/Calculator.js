import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { calculateResults } from '../utils/calculationUtils';

const Calculator = () => {
  const [patientData, setPatientData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'masculino',
    product: '',
    volume: '',
    infusionTime: '',
    proteinModule: '',
    otherModule: ''
  });

  const [products, setProducts] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // Carregar produtos do localStorage ao iniciar
  useEffect(() => {
    const storedProducts = localStorage.getItem('nutritionalProducts');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      // Produtos originais do Excel
      const defaultProducts = [
        { nome: "Ensure", kcal_ml: 1.0, cho_g_l: 138, lip_g_l: 35, ptn_g_l: 37, ep_ratio: 1.7 },
        { nome: "Ensure Plus", kcal_ml: 1.5, cho_g_l: 200, lip_g_l: 53, ptn_g_l: 55, ep_ratio: 1.7 },
        { nome: "Glucerna", kcal_ml: 1.0, cho_g_l: 96, lip_g_l: 54, ptn_g_l: 42, ep_ratio: 1.7 },
        { nome: "Glucerna 1.5", kcal_ml: 1.5, cho_g_l: 144, lip_g_l: 81, ptn_g_l: 63, ep_ratio: 1.7 },
        { nome: "Nepro", kcal_ml: 2.0, cho_g_l: 215, lip_g_l: 96, ptn_g_l: 70, ep_ratio: 1.8 },
        { nome: "Novasource GC", kcal_ml: 1.5, cho_g_l: 170, lip_g_l: 58, ptn_g_l: 75, ep_ratio: 1.7 },
        { nome: "Novasource Renal", kcal_ml: 2.0, cho_g_l: 200, lip_g_l: 100, ptn_g_l: 70, ep_ratio: 1.8 },
        { nome: "Nutren 1.0", kcal_ml: 1.0, cho_g_l: 111, lip_g_l: 39, ptn_g_l: 40, ep_ratio: 1.8 },
        { nome: "Nutren 1.5", kcal_ml: 1.5, cho_g_l: 170, lip_g_l: 58, ptn_g_l: 60, ep_ratio: 1.7 },
        { nome: "Nutren 2.0", kcal_ml: 2.0, cho_g_l: 215, lip_g_l: 79, ptn_g_l: 80, ep_ratio: 1.8 },
        { nome: "Nutrison Energy", kcal_ml: 1.5, cho_g_l: 183, lip_g_l: 58, ptn_g_l: 60, ep_ratio: 1.5 },
        { nome: "Nutrison Multi Fiber", kcal_ml: 1.0, cho_g_l: 123, lip_g_l: 39, ptn_g_l: 40, ep_ratio: 1.5 },
        { nome: "Nutrison Protein Plus", kcal_ml: 1.25, cho_g_l: 141, lip_g_l: 47, ptn_g_l: 63, ep_ratio: 1.5 },
        { nome: "Nutrison Protein Plus MF", kcal_ml: 1.25, cho_g_l: 129, lip_g_l: 47, ptn_g_l: 63, ep_ratio: 1.5 },
        { nome: "Nutrison Soya", kcal_ml: 1.0, cho_g_l: 123, lip_g_l: 39, ptn_g_l: 40, ep_ratio: 1.5 },
        { nome: "Nutrison Soya MF", kcal_ml: 1.0, cho_g_l: 110, lip_g_l: 39, ptn_g_l: 40, ep_ratio: 1.5 },
        { nome: "Osmolite", kcal_ml: 1.0, cho_g_l: 135, lip_g_l: 39, ptn_g_l: 37, ep_ratio: 1.7 },
        { nome: "Peptamen", kcal_ml: 1.0, cho_g_l: 127, lip_g_l: 39, ptn_g_l: 40, ep_ratio: 1.5 },
        { nome: "Peptamen Intense", kcal_ml: 1.0, cho_g_l: 100, lip_g_l: 38, ptn_g_l: 64, ep_ratio: 1.5 },
        { nome: "Peptamen 1.5", kcal_ml: 1.5, cho_g_l: 190, lip_g_l: 56, ptn_g_l: 68, ep_ratio: 1.5 },
        { nome: "Trophic Basic", kcal_ml: 1.0, cho_g_l: 111, lip_g_l: 39, ptn_g_l: 40, ep_ratio: 1.5 },
        { nome: "Trophic Fiber", kcal_ml: 1.0, cho_g_l: 111, lip_g_l: 39, ptn_g_l: 40, ep_ratio: 1.5 }
      ];
      setProducts(defaultProducts);
      localStorage.setItem('nutritionalProducts', JSON.stringify(defaultProducts));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Encontrar o produto selecionado
    const selectedProduct = products.find(p => p.nome === patientData.product);
    
    if (!selectedProduct) {
      alert('Por favor, selecione um produto válido.');
      setLoading(false);
      return;
    }

    // Calcular resultados usando a função de utilidade
    const calculatedResults = calculateResults(patientData, selectedProduct);
    setResults(calculatedResults);
    setLoading(false);
  };

  return (
    <Container>
      <h1 className="mb-4 text-center">Calculadora de Terapia Nutricional v.4</h1>

      <Form onSubmit={handleSubmit} className="mb-5 p-4 shadow-sm rounded bg-light">
        <h2 className="fs-5 mb-3 border-bottom pb-2">Dados do Paciente</h2>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Peso (kg)</Form.Label>
              <Form.Control
                type="number"
                name="weight"
                value={patientData.weight}
                onChange={handleInputChange}
                required
                min="0"
                step="0.1"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Altura (cm)</Form.Label>
              <Form.Control
                type="number"
                name="height"
                value={patientData.height}
                onChange={handleInputChange}
                required
                min="0"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Idade (anos)</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={patientData.age}
                onChange={handleInputChange}
                required
                min="0"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Sexo</Form.Label>
              <Form.Select
                name="gender"
                value={patientData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <h2 className="fs-5 mb-3 border-bottom pb-2 mt-4">Dados da Fórmula</h2>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Fórmula/Produto</Form.Label>
              <Form.Select
                name="product"
                value={patientData.product}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione um produto</option>
                {products.map((product, index) => (
                  <option key={index} value={product.nome}>
                    {product.nome}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Volume Prescrito (mL)</Form.Label>
              <Form.Control
                type="number"
                name="volume"
                value={patientData.volume}
                onChange={handleInputChange}
                required
                min="0"
              />
            </Form.Group>
          </Col>
        </Row>

        <h2 className="fs-5 mb-3 border-bottom pb-2 mt-4">Dados Opcionais</h2>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Tempo de Infusão (h)</Form.Label>
              <Form.Control
                type="number"
                name="infusionTime"
                value={patientData.infusionTime}
                onChange={handleInputChange}
                min="0"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Módulo de Proteína (g)</Form.Label>
              <Form.Control
                type="number"
                name="proteinModule"
                value={patientData.proteinModule}
                onChange={handleInputChange}
                min="0"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Outro Módulo (Kcal)</Form.Label>
              <Form.Control
                type="number"
                name="otherModule"
                value={patientData.otherModule}
                onChange={handleInputChange}
                min="0"
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-grid gap-2 col-6 mx-auto mt-4">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Calculando...' : 'Calcular'}
          </Button>
        </div>
      </Form>

      {results && (
        <div className="results-section mb-5">
          <h2 className="fs-4 mb-3">Resultados</h2>
          <Row>
            <Col md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title className="text-muted fs-6">IMC</Card.Title>
                  <Card.Text className="fs-4 text-primary">{results.imc.toFixed(1)} kg/m²</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title className="text-muted fs-6">Gasto Energético Basal</Card.Title>
                  <Card.Text className="fs-4 text-primary">{results.geb.toFixed(1)} kcal</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title className="text-muted fs-6">Calorias Totais</Card.Title>
                  <Card.Text className="fs-4 text-primary">{results.totalCalories.toFixed(1)} kcal</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title className="text-muted fs-6">Proteína Total</Card.Title>
                  <Card.Text className="fs-4 text-primary">{results.totalProtein.toFixed(1)} g</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title className="text-muted fs-6">Carboidrato Total</Card.Title>
                  <Card.Text className="fs-4 text-primary">{results.totalCarbs.toFixed(1)} g</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title className="text-muted fs-6">Lipídio Total</Card.Title>
                  <Card.Text className="fs-4 text-primary">{results.totalLipids.toFixed(1)} g</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title className="text-muted fs-6">Proteína (g/kg)</Card.Title>
                  <Card.Text className="fs-4 text-primary">{results.proteinPerKg.toFixed(2)} g/kg</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title className="text-muted fs-6">Calorias (kcal/kg)</Card.Title>
                  <Card.Text className="fs-4 text-primary">{results.caloriesPerKg.toFixed(1)} kcal/kg</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title className="text-muted fs-6">Volume/hora</Card.Title>
                  <Card.Text className="fs-4 text-primary">
                    {results.volumePerHour ? `${results.volumePerHour.toFixed(1)} mL/h` : 'N/A'}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title className="text-muted fs-6">Distribuição CHO</Card.Title>
                  <Card.Text className="fs-4 text-primary">{results.carbsPercentage.toFixed(1)}%</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title className="text-muted fs-6">Distribuição LIP</Card.Title>
                  <Card.Text className="fs-4 text-primary">{results.lipidsPercentage.toFixed(1)}%</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title className="text-muted fs-6">Distribuição PTN</Card.Title>
                  <Card.Text className="fs-4 text-primary">{results.proteinPercentage.toFixed(1)}%</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};

export default Calculator;
