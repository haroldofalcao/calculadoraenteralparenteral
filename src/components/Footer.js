import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-auto">
      <Container>
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2025 Calculadora Nutricional v.4 <small>CC BY-NC-ND 4.0</small> | Haroldo Falcão Ramos da Cunha
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
