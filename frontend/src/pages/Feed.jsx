import { useEffect, useState } from "react";
import FeedCard from "../components/FeedCard";
import { searchRecentProjects } from "../services/camaraApi";
import './Feed.css';

function Feed() {

    const [leis, setLeis] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadProjects = async () => {
            const projects = await searchRecentProjects()
            setLeis(projects);
            setLoading(false);
        }

        loadProjects()

    }, [])

    return (
        <div className="feed-page">
            <div className="feed-header">
                <h1 className="feed-header-title">Principais Proposições</h1>
                <p className="feed-header-subtitle">
                    Acompanhe as propostas legislativas mais recentes
                </p>
            </div>

            <div className="feed-container">
                {loading ? (
                    <div className="feed-loading">
                        <div className="feed-loading-spinner"></div>
                        <p className="feed-loading-text">Carregando proposições...</p>
                    </div>
                ) : leis.length === 0 ? (
                    <div className="feed-empty">
                        <div className="feed-empty-icon">📋</div>
                        <p className="feed-empty-text">Nenhuma proposição encontrada</p>
                        <p className="feed-empty-subtitle">Tente novamente mais tarde</p>
                    </div>
                ) : (
                    <div className="feed-grid">
                        {leis.map((lei) => <FeedCard key={lei.id} info={lei} />)}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Feed;