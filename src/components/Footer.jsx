import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-auto">
      <Container>
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          &copy; {new Date().getFullYear()} Calculadora Nutricional v.5 <small>CC BY-NC-ND 4.0</small> | 
          <a href="mailto:haroldofalcao@gmail.com"> Haroldo Falcão Ramos da Cunha</a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
