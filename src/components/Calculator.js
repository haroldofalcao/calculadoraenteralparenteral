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
    if (storedProducts && JSON.parse(storedProducts).length > 30) {
      setProducts(JSON.parse(storedProducts));
    } else {
      // Produtos originais do Excel
      const defaultProducts = [
        { nome: "Cubison", kcal_ml: 1.00, cho_g_l: 130.0, lip_g_l: 33, ptn_g_l: 55.00, ep_ratio: 18.181818 },
        { nome: "Diason", kcal_ml: 1.00, cho_g_l: 110.0, lip_g_l: 42, ptn_g_l: 43.00, ep_ratio: 23.255814 },
        { nome: "Diason Energy HP", kcal_ml: 1.50, cho_g_l: 120.0, lip_g_l: 77, ptn_g_l: 77.00, ep_ratio: 19.480519 },
        { nome: "Diben", kcal_ml: 1.00, cho_g_l: 92.5, lip_g_l: 46, ptn_g_l: 46.00, ep_ratio: 21.739130 },
        { nome: "Diben 1,5", kcal_ml: 1.50, cho_g_l: 131.0, lip_g_l: 70, ptn_g_l: 75.00, ep_ratio: 20.000000 },
        { nome: "Fresubin 2 kcal", kcal_ml: 2.00, cho_g_l: 168.0, lip_g_l: 100, ptn_g_l: 100.00, ep_ratio: 20.000000 },
        { nome: "Fresubin Energy", kcal_ml: 1.50, cho_g_l: 188.0, lip_g_l: 58, ptn_g_l: 56.00, ep_ratio: 26.785714 },
        { nome: "Fresubin Energy Fibre", kcal_ml: 1.50, cho_g_l: 180.0, lip_g_l: 58, ptn_g_l: 56.00, ep_ratio: 26.785714 },
        { nome: "Fresubin Hepa", kcal_ml: 1.30, cho_g_l: 174.0, lip_g_l: 47, ptn_g_l: 40.00, ep_ratio: 32.500000 },
        { nome: "Fresubin HP Energy", kcal_ml: 1.50, cho_g_l: 170.0, lip_g_l: 58, ptn_g_l: 75.00, ep_ratio: 20.000000 },
        { nome: "Fresubin Lipid", kcal_ml: 1.50, cho_g_l: 118.0, lip_g_l: 67, ptn_g_l: 100.00, ep_ratio: 15.000000 },
        { nome: "Fresubin Original", kcal_ml: 1.00, cho_g_l: 138.0, lip_g_l: 34, ptn_g_l: 38.00, ep_ratio: 26.315789 },
        { nome: "Fresubin Original Fibre", kcal_ml: 1.00, cho_g_l: 130.0, lip_g_l: 34, ptn_g_l: 38.00, ep_ratio: 26.315789 },
        { nome: "Fresubin Soya Fibre", kcal_ml: 1.00, cho_g_l: 121.0, lip_g_l: 36, ptn_g_l: 38.00, ep_ratio: 26.315789 },
        { nome: "Glucerna 1,5", kcal_ml: 1.50, cho_g_l: 130.0, lip_g_l: 75, ptn_g_l: 75.00, ep_ratio: 20.000000 },
        { nome: "Glucerna RTH", kcal_ml: 1.00, cho_g_l: 81.0, lip_g_l: 54, ptn_g_l: 42.00, ep_ratio: 23.809524 },
        { nome: "Impact", kcal_ml: 1.00, cho_g_l: 130.0, lip_g_l: 28, ptn_g_l: 65.00, ep_ratio: 15.384615 },
        { nome: "Impact 1.5", kcal_ml: 1.50, cho_g_l: 139.0, lip_g_l: 63, ptn_g_l: 94.00, ep_ratio: 15.957447 },
        { nome: "Isosource 1,5", kcal_ml: 1.50, cho_g_l: 150.0, lip_g_l: 68, ptn_g_l: 63.00, ep_ratio: 23.809524 },
        { nome: "Isosource Fiber MIX", kcal_ml: 1.00, cho_g_l: 168.0, lip_g_l: 40, ptn_g_l: 42.00, ep_ratio: 23.809524 },
        { nome: "Jevity Hi Cal", kcal_ml: 1.50, cho_g_l: 203.0, lip_g_l: 48, ptn_g_l: 64.00, ep_ratio: 23.437500 },
        { nome: "Jevity Plus RTH", kcal_ml: 1.20, cho_g_l: 157.0, lip_g_l: 39, ptn_g_l: 55.00, ep_ratio: 21.818182 },
        { nome: "Novasource GC HP", kcal_ml: 1.00, cho_g_l: 105.0, lip_g_l: 40, ptn_g_l: 55.00, ep_ratio: 18.181818 },
        { nome: "Novasource GI Control", kcal_ml: 1.50, cho_g_l: 180.0, lip_g_l: 60, ptn_g_l: 60.00, ep_ratio: 25.000000 },
        { nome: "Novasource Renal", kcal_ml: 2.00, cho_g_l: 200.0, lip_g_l: 100, ptn_g_l: 75.00, ep_ratio: 26.666667 },
        { nome: "Novasource Senior", kcal_ml: 1.20, cho_g_l: 160.0, lip_g_l: 40, ptn_g_l: 53.00, ep_ratio: 22.641509 },
        { nome: "Novasource Standard", kcal_ml: 1.23, cho_g_l: 170.0, lip_g_l: 41, ptn_g_l: 44.00, ep_ratio: 27.954545 },
        { nome: "Nutri Diabetic", kcal_ml: 1.00, cho_g_l: 98.0, lip_g_l: 51, ptn_g_l: 39.00, ep_ratio: 25.641026 },
        { nome: "Nutri Enteral", kcal_ml: 1.20, cho_g_l: 174.0, lip_g_l: 33, ptn_g_l: 51.00, ep_ratio: 23.529412 },
        { nome: "Nutri Enteral 1.5", kcal_ml: 1.50, cho_g_l: 210.0, lip_g_l: 42, ptn_g_l: 64.00, ep_ratio: 23.437500 },
        { nome: "Nutri Enteral Soya", kcal_ml: 1.20, cho_g_l: 170.0, lip_g_l: 37, ptn_g_l: 48.00, ep_ratio: 25.000000 },
        { nome: "Nutri Enteral Soya Fiber", kcal_ml: 1.20, cho_g_l: 170.0, lip_g_l: 37, ptn_g_l: 48.00, ep_ratio: 25.000000 },
        { nome: "Nutri Fiber", kcal_ml: 1.20, cho_g_l: 170.0, lip_g_l: 33, ptn_g_l: 50.00, ep_ratio: 24.000000 },
        { nome: "Nutri Fiber 1.5", kcal_ml: 1.50, cho_g_l: 220.0, lip_g_l: 42, ptn_g_l: 62.00, ep_ratio: 24.193548 },
        { nome: "Nutri Liver", kcal_ml: 1.40, cho_g_l: 230.0, lip_g_l: 39, ptn_g_l: 38.00, ep_ratio: 36.842105 },
        { nome: "Nutri Renal", kcal_ml: 2.00, cho_g_l: 320.0, lip_g_l: 67, ptn_g_l: 33.00, ep_ratio: 60.606061 },
        { nome: "Nutri Renal D", kcal_ml: 2.00, cho_g_l: 280.0, lip_g_l: 66, ptn_g_l: 75.00, ep_ratio: 26.666667 },
        { nome: "Nutricomp Energy HN", kcal_ml: 1.50, cho_g_l: 190.0, lip_g_l: 50, ptn_g_l: 75.00, ep_ratio: 20.000000 },
        { nome: "Nutricomp Energy HN Fiber", kcal_ml: 1.50, cho_g_l: 190.0, lip_g_l: 50, ptn_g_l: 75.00, ep_ratio: 20.000000 },
        { nome: "Nutricomp Stand. Fiber", kcal_ml: 1.00, cho_g_l: 140.0, lip_g_l: 33, ptn_g_l: 38.00, ep_ratio: 26.315789 },
        { nome: "Nutricomp Standard", kcal_ml: 1.00, cho_g_l: 140.0, lip_g_l: 33, ptn_g_l: 38.00, ep_ratio: 26.315789 },
        { nome: "Nutriflex Lipid Plus", kcal_ml: 1.00, cho_g_l: 120.0, lip_g_l: 40, ptn_g_l: 48.00, ep_ratio: 20.833333 },
        { nome: "Nutriflex Lipid Special", kcal_ml: 1.18, cho_g_l: 144.0, lip_g_l: 40, ptn_g_l: 57.44, ep_ratio: 20.543175 },
        { nome: "NutriFlex Plus", kcal_ml: 0.79, cho_g_l: 150.0, lip_g_l: 40, ptn_g_l: 48.00, ep_ratio: 16.458333 },
        { nome: "Nutrison", kcal_ml: 1.00, cho_g_l: 120.0, lip_g_l: 39, ptn_g_l: 40.00, ep_ratio: 25.000000 },
        { nome: "Nutrison advanced Protison", kcal_ml: 1.28, cho_g_l: 160.0, lip_g_l: 38, ptn_g_l: 75.00, ep_ratio: 17.066667 },
        { nome: "Nutrison Energy", kcal_ml: 1.50, cho_g_l: 180.0, lip_g_l: 58, ptn_g_l: 60.00, ep_ratio: 25.000000 },
        { nome: "Nutrison Energy MF", kcal_ml: 1.50, cho_g_l: 180.0, lip_g_l: 58, ptn_g_l: 60.00, ep_ratio: 25.000000 },
        { nome: "Nutrison Multi Fiber", kcal_ml: 1.00, cho_g_l: 120.0, lip_g_l: 39, ptn_g_l: 40.00, ep_ratio: 25.000000 },
        { nome: "Nutrison Protein Plus Energy", kcal_ml: 1.50, cho_g_l: 170.0, lip_g_l: 58, ptn_g_l: 75.00, ep_ratio: 20.000000 },
        { nome: "Nutrison Protein Plus MF", kcal_ml: 1.25, cho_g_l: 140.0, lip_g_l: 49, ptn_g_l: 63.00, ep_ratio: 19.841270 },
        { nome: "Olimel N12", kcal_ml: 0.95, cho_g_l: 73.3, lip_g_l: 35, ptn_g_l: 76.00, ep_ratio: 12.500000 },
        { nome: "Olimel N7", kcal_ml: 1.14, cho_g_l: 140.0, lip_g_l: 40, ptn_g_l: 44.30, ep_ratio: 25.733634 },
        { nome: "Olimel N9", kcal_ml: 1.07, cho_g_l: 110.0, lip_g_l: 40, ptn_g_l: 54.00, ep_ratio: 19.814815 },
        { nome: "Osmolite HiCal", kcal_ml: 1.50, cho_g_l: 204.0, lip_g_l: 49, ptn_g_l: 63.00, ep_ratio: 23.809524 },
        { nome: "Osmolite HN", kcal_ml: 1.00, cho_g_l: 136.0, lip_g_l: 34, ptn_g_l: 40.00, ep_ratio: 25.000000 },
        { nome: "Osmolite plus HN", kcal_ml: 1.20, cho_g_l: 158.0, lip_g_l: 39, ptn_g_l: 56.00, ep_ratio: 21.428571 },
        { nome: "Peptamen HN", kcal_ml: 1.30, cho_g_l: 160.0, lip_g_l: 49, ptn_g_l: 66.00, ep_ratio: 19.696970 },
        { nome: "Peptamen 1,5", kcal_ml: 1.50, cho_g_l: 184.0, lip_g_l: 55, ptn_g_l: 68.00, ep_ratio: 22.058824 },
        { nome: "Peptamen AF", kcal_ml: 1.20, cho_g_l: 110.0, lip_g_l: 55, ptn_g_l: 76.00, ep_ratio: 15.789474 },
        { nome: "Peptamen Intense", kcal_ml: 1.00, cho_g_l: 72.0, lip_g_l: 38, ptn_g_l: 93.00, ep_ratio: 10.752688 },
        { nome: "Peptamen Prebio", kcal_ml: 1.10, cho_g_l: 140.0, lip_g_l: 40, ptn_g_l: 44.00, ep_ratio: 25.000000 },
        { nome: "Peptisorb", kcal_ml: 1.00, cho_g_l: 180.0, lip_g_l: 17, ptn_g_l: 40.00, ep_ratio: 25.000000 },
        { nome: "Perative", kcal_ml: 1.30, cho_g_l: 175.0, lip_g_l: 36, ptn_g_l: 65.00, ep_ratio: 20.000000 },
        { nome: "Reconvan", kcal_ml: 1.00, cho_g_l: 120.0, lip_g_l: 33, ptn_g_l: 55.00, ep_ratio: 18.181818 },
        { nome: "Survimed OPD", kcal_ml: 1.00, cho_g_l: 143.0, lip_g_l: 28, ptn_g_l: 45.00, ep_ratio: 22.222222 }
    ]
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
