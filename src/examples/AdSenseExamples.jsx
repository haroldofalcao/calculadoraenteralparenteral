// Exemplo de implementação ideal para componentes que usam anúncios

import React, { useState, useEffect } from 'react';
import { ResponsiveBanner, InFeedAd } from './AdSense.jsx';

const ExamplePageWithAds = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [results, setResults] = useState(null);

  // Simular carregamento de dados
  useEffect(() => {
    const loadData = async () => {
      // Simular carregamento
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setDataLoaded(true);
    };

    loadData();
  }, []);

  // Renderizar skeleton durante carregamento
  if (!dataLoaded) {
    return (
      <div className="content-skeleton">
        <div className="placeholder">Carregando...</div>
        {/* NÃO incluir anúncios aqui */}
      </div>
    );
  }

  return (
    <div>
      {/* Banner no topo - só após conteúdo carregar */}
      <ResponsiveBanner adSlot="exemplo-slot" requireContent={true} />

      {/* Conteúdo principal */}
      <main>
        <h1>Página com Conteúdo Adequado</h1>
        <p>
          Este é um exemplo de página que segue as políticas do AdSense. O conteúdo é substancial,
          relevante e oferece valor real aos usuários. Os anúncios só são exibidos após o conteúdo
          estar completamente carregado.
        </p>

        {/* Mais conteúdo para garantir densidade adequada */}
        <section>
          <h2>Seção de Conteúdo</h2>
          <p>
            Conteúdo adicional que fornece informações úteis e relevantes. É importante ter pelo
            menos 300 caracteres de conteúdo real antes de exibir qualquer anúncio na página.
          </p>
        </section>
      </main>

      {/* Anúncio no meio do conteúdo - apenas se há resultados */}
      {results && <InFeedAd adSlot="exemplo-infeed-slot" requireContent={true} showLabel={true} />}

      {/* Mais conteúdo */}
      <section>
        <h2>Conteúdo Adicional</h2>
        <p>Mais informações úteis para o usuário.</p>
      </section>
    </div>
  );
};

// ❌ EXEMPLO DE IMPLEMENTAÇÃO INCORRETA
const BadExamplePage = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {/* ❌ ERRO: Anúncio no topo sempre presente */}
      <ResponsiveBanner adSlot="bad-example" />

      {loading ? (
        <div>
          {/* ❌ ERRO: Anúncio durante loading */}
          <div className="spinner-border">Carregando...</div>
          <InFeedAd adSlot="loading-ad" />
        </div>
      ) : (
        <main>
          <h1>Pouco conteúdo</h1>
          {/* ❌ ERRO: Conteúdo insuficiente */}
        </main>
      )}
    </div>
  );
};

// ✅ EXEMPLO DE IMPLEMENTAÇÃO CORRETA
const GoodExamplePage = () => {
  const [contentReady, setContentReady] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      // Carregar dados primeiro
      const result = await fetchData();
      setData(result);

      // Aguardar um pouco para garantir que tudo foi renderizado
      setTimeout(() => {
        setContentReady(true);
      }, 1000);
    };

    loadContent();
  }, []);

  if (!contentReady) {
    return (
      <div className="content-skeleton">
        <div className="placeholder-glow">
          <div className="placeholder col-7"></div>
          <div className="placeholder col-4"></div>
        </div>
        {/* ✅ CORRETO: Sem anúncios durante loading */}
      </div>
    );
  }

  return (
    <div>
      <main>
        {/* ✅ CORRETO: Conteúdo substancial primeiro */}
        <h1>Título da Página</h1>
        <p>
          Conteúdo detalhado e útil que oferece valor real aos usuários. Esta página contém
          informações relevantes e substanciais que justificam a presença de anúncios publicitários.
        </p>

        {data && (
          <section>
            <h2>Dados Carregados</h2>
            <p>Informações específicas baseadas nos dados carregados.</p>
            {/* Mais conteúdo... */}
          </section>
        )}
      </main>

      {/* ✅ CORRETO: Anúncios só após conteúdo estar pronto */}
      {contentReady && (
        <>
          <ResponsiveBanner adSlot="top-banner" requireContent={true} />

          {data && <InFeedAd adSlot="content-ad" requireContent={true} showLabel={true} />}
        </>
      )}
    </div>
  );
};

export { GoodExamplePage, BadExamplePage, ExamplePageWithAds };
