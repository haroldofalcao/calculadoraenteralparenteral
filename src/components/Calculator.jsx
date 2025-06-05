import React, { useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { calculatorSchema } from '../schemas/calculatorSchema';
import { calculateResults } from '../utils/calculationUtils';
import { allProductsAtom } from '../store/productsAtoms';
import { useAtom } from 'jotai';
import SEO from './SEO.jsx';
import { InFeedAd, ResponsiveBanner } from './AdSense.jsx';

const Calculator = () => {
  const [allProducts] = useAtom(allProductsAtom);
  const [results, setResults] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const { 
    control, 
    handleSubmit, 
    watch, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      weight: '',
      height: '',
      age: '',
      gender: 'masculino',
      calculationMethod: 'harris-benedict',
      kcalPerKg: '25',
      product: '',
      volume: '',
      infusionTime: '',
      proteinModule: '',
      otherModule: ''
    }
  });

  // Observar o método de cálculo para renderização condicional
  const calculationMethod = watch('calculationMethod');

  const onSubmit = (data) => {
    setLoading(true);

    // Encontrar o produto selecionado
    const selectedProduct = allProducts.find(p => p.nome === data.product);
    
    if (!selectedProduct) {
      alert('Por favor, selecione um produto válido.');
      setLoading(false);
      return;
    }

    // Calcular resultados
    const calculatedResults = calculateResults(data, selectedProduct);
    setResults(calculatedResults);
    
    setLoading(false);
  };

  useEffect(() => {
  console.log(errors, 'errors')
  }, [errors])

  return (
    <Container>
      <SEO 
        title="Calculadora de Terapia Nutricional - Enteral e Parenteral" 
        description="Calcule a terapia nutricional ideal com nossa calculadora especializada. Ferramenta profissional para nutricionistas e profissionais da saúde."
        canonical="/"
        keywords="calculadora nutricional, terapia nutricional, nutrição enteral, nutrição parenteral, cálculo nutricional, nutricionista"
        structuredDataType="MedicalWebPage"
        structuredData={{
          audience: {
            "@type": "MedicalAudience",
            "audienceType": "healthcare professionals"
          }
        }}
      />
      
      {/* Banner de topo */}
      <ResponsiveBanner adSlot="5804222918" />
      
      <h1 className="mb-4 text-center">Calculadora de Terapia Nutricional v.4</h1>
      <Alert variant="info" className="mb-4">
        <i className="bi bi-info-circle-fill me-2"></i>
        <strong>Atenção:</strong> Esta calculadora é específica para uso em adultos. Não utilize para cálculos nutricionais em pacientes pediátricos.
      </Alert>
      <Form onSubmit={handleSubmit(onSubmit)} className="mb-5 p-4 shadow-sm rounded bg-light">
        <h2 className="fs-5 mb-3 border-bottom pb-2">Dados do Paciente</h2>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Peso (kg)</Form.Label>
              <Controller
                name="weight"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type="number"
                    min="0"
                    step="0.1"
                    isInvalid={!!errors.weight}
                    {...field}
                  />
                )}
              />
              {errors.weight && (
                <Form.Control.Feedback type="invalid">
                  {errors.weight.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Altura (cm)</Form.Label>
              <Controller
                name="height"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type="number"
                    min="0"
                    isInvalid={!!errors.height}
                    {...field}
                  />
                )}
              />
              {errors.height && (
                <Form.Control.Feedback type="invalid">
                  {errors.height.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Idade (anos)</Form.Label>
              <Controller
                name="age"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type="number"
                    min="0"
                    isInvalid={!!errors.age}
                    {...field}
                  />
                )}
              />
              {errors.age && (
                <Form.Control.Feedback type="invalid">
                  {errors.age.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Sexo</Form.Label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Form.Select
                    isInvalid={!!errors.gender}
                    {...field}
                  >
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                  </Form.Select>
                )}
              />
              {errors.gender && (
                <Form.Control.Feedback type="invalid">
                  {errors.gender.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
        </Row>

        <h2 className="fs-5 mb-3 border-bottom pb-2 mt-4">Método de Cálculo</h2>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Método para Meta Calórica</Form.Label>
              <Controller
                name="calculationMethod"
                control={control}
                render={({ field }) => (
                  <Form.Select
                    isInvalid={!!errors.calculationMethod}
                    {...field}
                  >
                    <option value="harris-benedict">Equação de Harris-Benedict</option>
                    <option value="pocket-formula">Fórmula de Bolso (kcal/kg/d)</option>
                  </Form.Select>
                )}
              />
              {errors.calculationMethod && (
                <Form.Control.Feedback type="invalid">
                  {errors.calculationMethod.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            {calculationMethod === 'pocket-formula' && (
              <Form.Group>
                <Form.Label>kcal/kg/dia</Form.Label>
                <Controller
                  name="kcalPerKg"
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      type="number"
                      min="0"
                      step="0.1"
                      isInvalid={!!errors.kcalPerKg}
                      {...field}
                    />
                  )}
                />
                {errors.kcalPerKg && (
                  <Form.Control.Feedback type="invalid">
                    {errors.kcalPerKg.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            )}
          </Col>
        </Row>

        <h2 className="fs-5 mb-3 border-bottom pb-2 mt-4">Dados da Fórmula</h2>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Fórmula/Produto</Form.Label>
              <Controller
                name="product"
                control={control}
                render={({ field }) => (
                  <Form.Select
                    isInvalid={!!errors.product}
                    {...field}
                  >
                    <option value="">Selecione um produto</option>
                    {allProducts.map((product, index) => (
                      <option key={index} value={product.nome}>
                        {product.nome}
                      </option>
                    ))}
                  </Form.Select>
                )}
              />
              {errors.product && (
                <Form.Control.Feedback type="invalid">
                  {errors.product.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Volume Prescrito (mL)</Form.Label>
              <Controller
                name="volume"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type="number"
                    min="0"
                    isInvalid={!!errors.volume}
                    {...field}
                  />
                )}
              />
              {errors.volume && (
                <Form.Control.Feedback type="invalid">
                  {errors.volume.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
        </Row>

        <h2 className="fs-5 mb-3 border-bottom pb-2 mt-4">Dados Opcionais</h2>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Tempo de Infusão (h)</Form.Label>
              <Controller
                name="infusionTime"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type="number"
                    min="0"
                    isInvalid={!!errors.infusionTime}
                    {...field}
                  />
                )}
              />
              {errors.infusionTime && (
                <Form.Control.Feedback type="invalid">
                  {errors.infusionTime.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Módulo de Proteína (g)</Form.Label>
              <Controller
                name="proteinModule"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type="number"
                    min="0"
                    isInvalid={!!errors.proteinModule}
                    {...field}
                  />
                )}
              />
              {errors.proteinModule && (
                <Form.Control.Feedback type="invalid">
                  {errors.proteinModule.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Outro Módulo (Kcal)</Form.Label>
              <Controller
                name="otherModule"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type="number"
                    min="0"
                    isInvalid={!!errors.otherModule}
                    {...field}
                  />
                )}
              />
              {errors.otherModule && (
                <Form.Control.Feedback type="invalid">
                  {errors.otherModule.message}
                </Form.Control.Feedback>
              )}
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
            {watch('weight') && watch('height') && (
              <Col md={4} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title className="text-muted fs-6">IMC</Card.Title>
                    <Card.Text className="fs-4 text-primary">{results.imc.toFixed(1)} kg/m²</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )}
            <Col md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title className="text-muted fs-6">
                    Gasto Energético Basal {calculationMethod === 'harris-benedict' 
                      ? '(Harris-Benedict)' 
                      : `(Fórmula de bolso ${watch('kcalPerKg')} kcal/kg)`}
                  </Card.Title>
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
            {watch('weight') && (
              <>
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
              </>
            )}
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
      {/* Anúncio após os resultados */}
      {results && (
        <InFeedAd adSlot="1864977909" />
      )}
      
    </Container>
  );
};

export default Calculator;
