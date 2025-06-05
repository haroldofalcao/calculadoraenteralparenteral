import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal, Alert } from 'react-bootstrap';
import { allProductsAtom,  userProductsAtom } from '../store/productsAtoms';
import { useAtom } from 'jotai';
import SEO from './SEO.jsx';
import { ResponsiveBanner } from './AdSense.jsx';

const ProductManager = () => {
  const [userProducts, setUserProducts] = useAtom(userProductsAtom);
  const [allProducts] = useAtom(allProductsAtom);
  
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
      showAlertMessage('danger', 'Já existe um produto com este nome.');
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
      showAlertMessage('danger', 'Todos os valores numéricos devem ser positivos.');
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
    
    showAlertMessage('success', 'Produto adicionado com sucesso!');
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      const updatedProducts = userProducts.filter(p => p.nome !== productToDelete.nome);
      setUserProducts(updatedProducts);
      setShowDeleteModal(false);
      setProductToDelete(null);
      showAlertMessage('success', `Produto "${productToDelete.nome}" excluído com sucesso!`);
    }
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
        title="Gerenciar Produtos Nutricionais - Calculadora Nutricional" 
        description="Gerencie e adicione produtos nutricionais personalizados para seus cálculos. Ferramenta para personalizar sua base de dados nutricional."
        canonical="/gerenciar-produtos"
        keywords="gerenciar produtos, produtos nutricionais, base de dados nutricional, personalizar produtos"
      />
      
      <ResponsiveBanner adSlot="9004267172" />

      <h1 className="mb-4 text-center">Gerenciar Produtos Nutricionais</h1>

      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
          {alert.message}
        </Alert>
      )}

      <Row className="mb-5">
        <Col md={6}>
          <div className="p-4 shadow-sm rounded bg-light">
            <h2 className="fs-5 mb-3 border-bottom pb-2">Adicionar Novo Produto</h2>
            <Form onSubmit={handleAddProduct}>
              <Form.Group className="mb-3">
                <Form.Label>Nome do Produto</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={newProduct.nome}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Kcal/mL</Form.Label>
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
                <Form.Label>CHO (g/L)</Form.Label>
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
                <Form.Label>LIP (g/L)</Form.Label>
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
                <Form.Label>PTN (g/L)</Form.Label>
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
                <Form.Label>EP Ratio</Form.Label>
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
                  Adicionar Produto
                </Button>
              </div>
            </Form>
          </div>
        </Col>

        <Col md={6}>
          <div className="p-4 shadow-sm rounded bg-light">
            <h2 className="fs-5 mb-3 border-bottom pb-2">Produtos Cadastrados</h2>
            
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Buscar produto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            
            <div className="table-responsive">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Kcal/mL</th>
                    <th>Ações</th>
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
                          <td>{isUserProduct ? 'Personalizado' : 'Padrão'}</td>
                          <td>
                            {isUserProduct && (
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteClick(product)}
                              >
                                Excluir
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        Nenhum produto encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>

      {/* Modal de confirmação de exclusão */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tem certeza que deseja excluir o produto <strong>{productToDelete?.nome}</strong>?</p>
          <p className="text-danger">Esta ação não pode ser desfeita.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductManager;
