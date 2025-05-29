import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal, Alert } from 'react-bootstrap';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
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

  // Atualizar localStorage quando produtos mudam
  useEffect(() => {
    localStorage.setItem('nutritionalProducts', JSON.stringify(products));
  }, [products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === 'nome' ? value : parseFloat(value) || ''
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    
    // Validar se o nome do produto já existe
    if (products.some(p => p.nome.toLowerCase() === newProduct.nome.toLowerCase())) {
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

    // Adicionar novo produto
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    
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
      const updatedProducts = products.filter(p => p.nome !== productToDelete.nome);
      setProducts(updatedProducts);
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
  const filteredProducts = products.filter(product =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h1 className="mb-4 text-center">Gerenciar Produtos</h1>

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
                    filteredProducts.map((product, index) => (
                      <tr key={index}>
                        <td>{product.nome}</td>
                        <td>{product.kcal_ml.toFixed(1)}</td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteClick(product)}
                          >
                            Excluir
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">
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
