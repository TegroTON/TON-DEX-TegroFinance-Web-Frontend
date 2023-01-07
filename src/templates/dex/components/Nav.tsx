import { Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

export function NavComponent() {
    const location = useLocation();

    return (
        <>
            <Nav justify variant="pills" className="content-nav-pills mb-3 mb-lg-4 d-flex" defaultActiveKey="/">
                <Nav.Item>
                    <Link className={`nav-link btn ${location.pathname === '/' ? 'active' : ''}`} to="/">Exchange</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className={`nav-link btn ${location.pathname.slice(0, 10) === '/liquidity' ? 'active' : ''}`} to="/liquidity">Liquidity</Link>
                </Nav.Item>
            </Nav>
        </>
    );
}
