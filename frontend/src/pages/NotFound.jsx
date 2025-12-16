import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {

    return (
        <div className="notfound-page">
            <div className="notfound-icon">🔍</div>
            <h1 className="notfound-title">Página não encontrada</h1>
            <p className="notfound-subtitle">
                A página que você está procurando não existe ou foi movida.
            </p>

            <Link to="/" className="notfound-btn">
                Voltar para o início
            </Link>
        </div>
    );

}

export default NotFound;