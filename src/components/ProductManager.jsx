import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { allProductsAtom,  userProductsAtom, hiddenDefaultProductsAtom, defaultProductsAtom } from '../store/productsAtoms';
import { useAtom } from 'jotai';
import SEO from './SEO.jsx';
import { ResponsiveBanner } from './AdSense.jsx';

const ProductManager = () => {
  const { t } = useTranslation();
  const [userProducts, setUserProducts] = useAtom(userProductsAtom);
  const [allProducts] = useAtom(allProductsAtom);
  const [hiddenDefaultProducts, setHiddenDefaultProducts] = useAtom(hiddenDefaultProductsAtom);
  const [defaultProducts] = useAtom(defaultProductsAtom);
  
  const [newProduct, setNewProduct] = useState({
    nome: '',
    kcal_ml: '',
    cho_g_l: '',
    lip_g_l: '',
    ptn_g_l: '',
    ep_ratio: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === 'nome' ? value : parseFloat(value) || ''
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
     // Verificar se o produto já existe em qualquer um dos conjuntos
    if (allProducts.some(p => p.nome.toLowerCase() === newProduct.nome.toLowerCase())) {
      showAlertMessage('danger', t('productManager.validation.nameExists'));
      return;
    }
    
    // Validar se todos os campos numéricos são positivos
    if (
      newProduct.kcal_ml <= 0 || 
      newProduct.cho_g_l < 0 || 
      newProduct.lip_g_l < 0 || 
      newProduct.ptn_g_l < 0 ||
      newProduct.ep_ratio < 0
    ) {
      showAlertMessage('danger', t('productManager.validation.invalidValues'));
      return;
    }

    // Adicionar novo produto à lista de produtos do usuário
    setUserProducts([...userProducts, newProduct]);
    
    // Limpar formulário
    setNewProduct({
      nome: '',
      kcal_ml: '',
      cho_g_l: '',
      lip_g_l: '',
      ptn_g_l: '',
      ep_ratio: ''
    });
    
    showAlertMessage('success', t('productManager.validation.productAdded'));
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      // Verificar se é um produto personalizado ou padrão
      const isUserProduct = userProducts.some(p => p.nome === productToDelete.nome);
      const isDefaultProduct = defaultProducts.some(p => p.nome === productToDelete.nome);
      
      if (isUserProduct) {
        // Remover produto personalizado
        const updatedProducts = userProducts.filter(p => p.nome !== productToDelete.nome);
        setUserProducts(updatedProducts);
        showAlertMessage('success', t('productManager.validation.productDeleted'));
      } else if (isDefaultProduct) {
        // Ocultar produto padrão
        const updatedHiddenProducts = [...hiddenDefaultProducts, productToDelete.nome];
        setHiddenDefaultProducts(updatedHiddenProducts);
        showAlertMessage('success', t('productManager.validation.productDeleted'));
      }
      
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const handleRestoreProduct = (productName) => {
    const updatedHiddenProducts = hiddenDefaultProducts.filter(name => name !== productName);
    setHiddenDefaultProducts(updatedHiddenProducts);
    showAlertMessage('success', t('productManager.validation.productDeleted'));
  };

  const showAlertMessage = (variant, message) => {
    setAlert({ show: true, variant, message });
    setTimeout(() => {
      setAlert({ show: false, variant: '', message: '' });
    }, 5000);
  };

  // Filtrar produtos com base na busca
  const filteredProducts = allProducts.filter(product =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <Container>
      <SEO 
        title={t('productManager.title')} 
        description={t('productManager.title')}
        canonical="/gerenciar-produtos"
        keywords="gerenciar produtos, produtos nutricionais, base de dados nutricional, personalizar produtos"
      />
      
      <ResponsiveBanner adSlot="9004267172" requireContent={true} />

      <h1 className="mb-4 text-center">{t('productManager.title')}</h1>

      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
          {alert.message}
        </Alert>
      )}

      <Row className="mb-5">
        <Col md={6}>
          <div className="p-4 shadow-sm rounded bg-light">
            <h2 className="fs-5 mb-3 border-bottom pb-2">{t('productManager.addProduct')}</h2>
            <Form onSubmit={handleAddProduct}>
              <Form.Group className="mb-3">
                <Form.Label>{t('productManager.productName')}</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={newProduct.nome}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>{t('productManager.kcalMl')}</Form.Label>
                <Form.Control
                  type="number"
                  name="kcal_ml"
                  value={newProduct.kcal_ml}
                  onChange={handleInputChange}
                  required
                  min="0.1"
                  step="0.1"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>{t('productManager.cho')}</Form.Label>
                <Form.Control
                  type="number"
                  name="cho_g_l"
                  value={newProduct.cho_g_l}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.1"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>{t('productManager.lip')}</Form.Label>
                <Form.Control
                  type="number"
                  name="lip_g_l"
                  value={newProduct.lip_g_l}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.1"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>{t('productManager.ptn')}</Form.Label>
                <Form.Control
                  type="number"
                  name="ptn_g_l"
                  value={newProduct.ptn_g_l}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.1"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>{t('productManager.epRatio')}</Form.Label>
                <Form.Control
                  type="number"
                  name="ep_ratio"
                  value={newProduct.ep_ratio}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.1"
                />
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit">
                  {t('productManager.addProductButton')}
                </Button>
              </div>
            </Form>
          </div>
        </Col>

        <Col md={6}>
          <div className="p-4 shadow-sm rounded bg-light">
            <h2 className="fs-5 mb-3 border-bottom pb-2">{t('productManager.registeredProducts')}</h2>
            
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder={t('productManager.searchProduct')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            
            <div className="table-responsive">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>{t('productManager.name')}</th>
                    <th>{t('productManager.kcalMl')}</th>
                    <th>{t('productManager.type')}</th>
                    <th>{t('productManager.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => {
                      // Verificar se é um produto personalizado
                      const isUserProduct = userProducts.some(p => p.nome === product.nome);
                      
                      return (
                        <tr key={index}>
                          <td>{product.nome}</td>
                          <td>{product.kcal_ml.toFixed(1)}</td>
                          <td>{isUserProduct ? t('common.custom') : t('productManager.standard')}</td>
                          <td>
                            <Button
                              variant={isUserProduct ? "danger" : "warning"}
                              size="sm"
                              onClick={() => handleDeleteClick(product)}
                            >
                              {isUserProduct ? t('productManager.delete') : t('productManager.hide')}
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        {t('common.noResults')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>

      {/* Seção de produtos ocultos */}
      {hiddenDefaultProducts.length > 0 && (
        <Row className="mb-4">
          <Col>
            <div className="p-4 shadow-sm rounded bg-light">
              <h2 className="fs-5 mb-3 border-bottom pb-2">{t('productManager.hiddenProducts')}</h2>
              <p className="text-muted mb-3">
                {t('productManager.hiddenProductsDescription')}
              </p>
              
              <div className="d-flex flex-wrap gap-2">
                {hiddenDefaultProducts.map((productName, index) => {
                  const product = defaultProducts.find(p => p.nome === productName);
                  return (
                    <div key={index} className="border rounded p-2 bg-white d-flex align-items-center gap-2">
                      <span>{productName}</span>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleRestoreProduct(productName)}
                      >
                        {t('productManager.show')}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
      )}

      {/* Modal de confirmação de exclusão */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {productToDelete && userProducts.some(p => p.nome === productToDelete.nome) 
              ? t('productManager.confirmDelete') 
              : t('productManager.confirmHide')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productToDelete && userProducts.some(p => p.nome === productToDelete.nome) ? (
            <>
              <p>{t('productManager.deleteConfirmation').replace('{{productName}}', productToDelete?.nome)}</p>
              <p className="text-danger">{t('productManager.deleteWarning')}</p>
            </>
          ) : (
            <>
              <p>{t('productManager.hideConfirmation').replace('{{productName}}', productToDelete?.nome)}</p>
              <p className="text-warning">{t('productManager.hideWarning')}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            {t('common.cancel')}
          </Button>
          <Button 
            variant={productToDelete && userProducts.some(p => p.nome === productToDelete.nome) ? "danger" : "warning"} 
            onClick={confirmDelete}
          >
            {productToDelete && userProducts.some(p => p.nome === productToDelete.nome) ? t('productManager.delete') : t('productManager.hide')}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductManager;
