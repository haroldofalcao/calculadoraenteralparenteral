import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Calculator from './components/Calculator.jsx';
import ProductManager from './components/ProductManager.jsx';
import Footer from './components/Footer.jsx';
import SEO from './components/SEO.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <SEO />
        <div className="d-flex flex-column min-vh-100">
        <Navbar bg="primary" variant="dark" expand="lg">
          <Container>
              <Navbar.Brand as={Link} to="/">
              Calculadora Nutricional para Adultos v.4 <small className="text-light">CC BY-NC-ND 4.0</small>
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
    </HelmetProvider>
  );
}

export default App;
