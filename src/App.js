import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Calculator from './components/Calculator';
import ProductManager from './components/ProductManager';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar bg="primary" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Calculadora Nutricional v.4 <small className="text-light">CC BY-NC-ND 4.0</small>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Calculadora</Nav.Link>
                <Nav.Link as={Link} to="/gerenciar-produtos">Gerenciar Produtos</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <main className="flex-grow-1 py-4">
          <Routes>
            <Route path="/" element={<Calculator />} />
            <Route path="/gerenciar-produtos" element={<ProductManager />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
