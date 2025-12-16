import { Link } from "react-router-dom";
import './FeedCard.css';

function FeedCard({ info }) {

    // Formata a data para o padrão brasileiro
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <div className="feed-card">
            <div className="feed-card-header">
                <h3 className="feed-card-title">
                    {info.siglaTipo} {info.numero}/{info.ano}
                </h3>
                <span className="feed-card-date">
                    {formatDate(info.dataApresentacao)}
                </span>
            </div>

            <p className="feed-card-summary">
                {info.ementa}
            </p>

            <div className="feed-card-footer">
                <Link to={`/result/${info.id}`} className="feed-card-link">
                    <button className="feed-card-btn">Analisar</button>
                </Link>
            </div>
        </div>
    );
}

export default FeedCard