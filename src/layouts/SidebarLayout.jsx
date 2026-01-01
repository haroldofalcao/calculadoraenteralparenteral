import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

/**
 * SidebarLayout - Layout com duas colunas para otimização de anúncios
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Conteúdo principal
 * @param {React.ReactNode} props.sidebar - Conteúdo da barra lateral (opcional)
 * @param {boolean} props.reverse - Se true, inverte a ordem (Sidebar na esquerda)
 */
const SidebarLayout = ({ children, sidebar, reverse = false }) => {
    return (
        <Container>
            <Row className={reverse ? 'flex-row-reverse' : ''}>
                {/* Conteúdo Principal */}
                <Col xs={12} lg={8}>
                    {children}
                </Col>

                {/* Barra Lateral / Sidebar */}
                <Col xs={12} lg={4}>
                    <div
                        className="sticky-sidebar mt-4 mt-lg-0"
                        style={{
                            position: 'sticky',
                            top: '20px',
                            zIndex: 100,
                        }}
                    >
                        {sidebar}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default SidebarLayout
