import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="container mt-5">
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">Oops! Algo deu errado</h4>
              <p>
                Ocorreu um erro inesperado. Por favor, recarregue a página ou tente novamente.
              </p>
              <hr />
              <button 
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                Recarregar Página
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
