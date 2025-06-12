import React, { useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { calculatorSchema } from '../schemas/calculatorSchema';
import { calculateResults } from '../utils/calculationUtils';
import { allProductsAtom } from '../store/productsAtoms';
import { useAtom } from 'jotai';
import SEO from './SEO.jsx';
import { InFeedAd, ResponsiveBanner, ResultsAd } from './AdSense.jsx';
import AdSenseCompliantPage from './AdSenseCompliantPage.jsx';

const Calculator = () => {
  const { t } = useTranslation();
  const [allProducts] = useAtom(allProductsAtom);
  const [results, setResults] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
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
      otherModule: '',
    },
  });

  // Observar o método de cálculo para renderização condicional
  const calculationMethod = watch('calculationMethod');

  const onSubmit = (data) => {
    setLoading(true);

    // Encontrar o produto selecionado
    const selectedProduct = allProducts.find((p) => p.nome === data.product);

    if (!selectedProduct) {
      alert(t('nenpt.validation.invalidProduct'));
      setLoading(false);
      return;
    }

    // Calcular resultados
    const calculatedResults = calculateResults(data, selectedProduct);
    setResults(calculatedResults);

    setLoading(false);
  };

  return (
    <main>
      <Container>
        <SEO
          title="Calculadora de Terapia Nutricional - Enteral e Parenteral"
          description="Calcule a terapia nutricional ideal com nossa calculadora especializada. Ferramenta profissional para nutricionistas e profissionais da saúde."
          canonical="/"
          keywords="calculadora nutricional, terapia nutricional, nutrição enteral, nutrição parenteral, cálculo nutricional, nutricionista"
          structuredDataType="MedicalWebPage"
          structuredData={{
            audience: {
              '@type': 'MedicalAudience',
              audienceType: 'healthcare professionals',
            },
          }}
        />

        {/* Banner de topo - só exibe após o conteúdo estar carregado */}
        <AdSenseCompliantPage minContentLength={800}>
          <ResponsiveBanner
            adSlot="5804222918"
            requireContent={true}
            style={{ marginBottom: '30px' }}
          />
        </AdSenseCompliantPage>

        <h1 className="mb-4 text-center">{t('nenpt.title')}</h1>
        <Alert variant="info" className="mb-4">
          <i className="bi bi-info-circle-fill me-2"></i>
          <strong>{t('common.warning')}:</strong> {t('nenpt.warning')}
        </Alert>
        <Form onSubmit={handleSubmit(onSubmit)} className="mb-5 p-4 shadow-sm rounded bg-light">
          <h2 className="fs-5 mb-3 border-bottom pb-2">{t('nenpt.patientData')}</h2>
          <Row className="mb-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label>{t('nenpt.weight')}</Form.Label>
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
                <Form.Label>{t('nenpt.height')}</Form.Label>
                <Controller
                  name="height"
                  control={control}
                  render={({ field }) => (
                    <Form.Control type="number" min="0" isInvalid={!!errors.height} {...field} />
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
                <Form.Label>{t('nenpt.age')}</Form.Label>
                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <Form.Control type="number" min="0" isInvalid={!!errors.age} {...field} />
                  )}
                />
                {errors.age && (
                  <Form.Control.Feedback type="invalid">{errors.age.message}</Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>{t('nenpt.sex')}</Form.Label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Form.Select isInvalid={!!errors.gender} {...field}>
                      <option value="masculino">{t('nenpt.male')}</option>
                      <option value="feminino">{t('nenpt.female')}</option>
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

          <h2 className="fs-5 mb-3 border-bottom pb-2 mt-4">{t('nenpt.calculationMethod')}</h2>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>{t('nenpt.caloricMethod')}</Form.Label>
                <Controller
                  name="calculationMethod"
                  control={control}
                  render={({ field }) => (
                    <Form.Select isInvalid={!!errors.calculationMethod} {...field}>
                      <option value="harris-benedict">{t('nenpt.harrisBenedict')}</option>
                      <option value="pocket-formula">{t('nenpt.pocketFormula')}</option>
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
                  <Form.Label>{t('nenpt.kcalPerKgDay')}</Form.Label>
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

          {/* Anúncio no meio do formulário - discreto */}
          <AdSenseCompliantPage minContentLength={600}>
            <InFeedAd
              adSlot="nenpt-form-ad"
              requireContent={true}
              showLabel={true}
              variant="subtle"
              style={{ margin: '30px 0' }}
            />
          </AdSenseCompliantPage>

          <h2 className="fs-5 mb-3 border-bottom pb-2 mt-4">{t('nenpt.formulaData')}</h2>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>{t('nenpt.formulaProduct')}</Form.Label>
                <Controller
                  name="product"
                  control={control}
                  render={({ field }) => (
                    <Form.Select isInvalid={!!errors.product} {...field}>
                      <option value="">{t('nenpt.selectProduct')}</option>
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
                <Form.Label>{t('nenpt.prescribedVolume')}</Form.Label>
                <Controller
                  name="volume"
                  control={control}
                  render={({ field }) => (
                    <Form.Control type="number" min="0" isInvalid={!!errors.volume} {...field} />
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

          <h2 className="fs-5 mb-3 border-bottom pb-2 mt-4">{t('nenpt.optionalData')}</h2>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t('nenpt.infusionTime')}</Form.Label>
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
                <Form.Label>{t('nenpt.proteinModule')}</Form.Label>
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
                <Form.Label>{t('nenpt.otherModule')}</Form.Label>
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
              {loading ? t('common.loading') : t('nenpt.calculateButton')}
            </Button>
          </div>
        </Form>

        {results && (
          <div className="results-section mb-5">
            <h2 className="fs-4 mb-3">{t('nenpt.results.title')}</h2>
            <Row>
              {watch('weight') && watch('height') && (
                <Col md={4} className="mb-3">
                  <Card>
                    <Card.Body>
                      {' '}
                      <Card.Title className="text-muted fs-6">{t('nenpt.results.bmi')}</Card.Title>
                      <Card.Text className="fs-4 text-primary">
                        {results.imc.toFixed(1)} kg/m²
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              )}
              <Col md={4} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title className="text-muted fs-6">
                      {t('nenpt.results.caloricGoal')}
                    </Card.Title>
                    <Card.Text className="fs-4 text-primary">
                      {results.geb.toFixed(1)} kcal
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title className="text-muted fs-6">
                      {t('nenpt.results.caloriesProvided')}
                    </Card.Title>
                    <Card.Text className="fs-4 text-primary">
                      {results.totalCalories.toFixed(1)} kcal
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={4} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title className="text-muted fs-6">
                      {t('nenpt.results.proteinProvided')}
                    </Card.Title>
                    <Card.Text className="fs-4 text-primary">
                      {results.totalProtein.toFixed(1)} g
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title className="text-muted fs-6">
                      {t('nenpt.results.carbsProvided')}
                    </Card.Title>
                    <Card.Text className="fs-4 text-primary">
                      {results.totalCarbs.toFixed(1)} g
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title className="text-muted fs-6">
                      {t('nenpt.results.lipidsProvided')}
                    </Card.Title>
                    <Card.Text className="fs-4 text-primary">
                      {results.totalLipids.toFixed(1)} g
                    </Card.Text>
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
                        <Card.Title className="text-muted fs-6">
                          {t('nenpt.results.proteinPerKg')}
                        </Card.Title>
                        <Card.Text className="fs-4 text-primary">
                          {results.proteinPerKg.toFixed(2)} g/kg
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Card>
                      <Card.Body>
                        <Card.Title className="text-muted fs-6">
                          {t('nenpt.results.caloriesPerKg')}
                        </Card.Title>
                        <Card.Text className="fs-4 text-primary">
                          {results.caloriesPerKg.toFixed(1)} kcal/kg
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </>
              )}
              <Col md={4} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title className="text-muted fs-6">
                      {t('nenpt.results.volumePerHour')}
                    </Card.Title>
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
                    <Card.Title className="text-muted fs-6">
                      {t('nenpt.results.carbsDistribution')}
                    </Card.Title>
                    <Card.Text className="fs-4 text-primary">
                      {results.carbsPercentage.toFixed(1)}%
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title className="text-muted fs-6">
                      {t('nenpt.results.lipidsDistribution')}
                    </Card.Title>
                    <Card.Text className="fs-4 text-primary">
                      {results.lipidsPercentage.toFixed(1)}%
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title className="text-muted fs-6">
                      {t('nenpt.results.proteinDistribution')}
                    </Card.Title>
                    <Card.Text className="fs-4 text-primary">
                      {results.proteinPercentage.toFixed(1)}%
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        )}
        {/* Anúncio após os resultados - só quando há resultados válidos */}
        {results && (
          <AdSenseCompliantPage minContentLength={1200}>
            <ResultsAd adSlot="1864977909" />
          </AdSenseCompliantPage>
        )}
      </Container>
    </main>
  );
};

export default Calculator;
