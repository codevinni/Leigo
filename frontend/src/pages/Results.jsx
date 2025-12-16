import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectInfo, getAnalisisResult } from "../services/camaraApi";
import './Results.css';

function Results({ currentJob }) {

    const { id } = useParams();
    const [proposal, setProposal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        const job = currentJob || localStorage.getItem("job");

        const loadProject = async () => {

            const project = await getProjectInfo(id);
            setProposal(project);
        }

        const analysis = async () => {

            await loadProject()

            try {
                const result = await getAnalisisResult(id, job);
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        analysis();

    }, [id, currentJob])

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

    // Retorna a classe CSS baseada no impacto
    const getImpactClass = (impact) => {
        if (!impact) return 'neutro';
        const normalizedImpact = impact.toLowerCase();
        if (normalizedImpact.includes('positivo')) return 'positivo';
        if (normalizedImpact.includes('negativo')) return 'negativo';
        return 'neutro';
    };

    if (loading) {
        return (
            <div className="results-loading">
                <div className="results-loading-spinner"></div>
                <p>Analisando proposição...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="results-error">
                <div className="results-error-icon">⚠️</div>
                <h2 className="results-error-title">Erro ao carregar análise</h2>
                <p className="results-error-message">{error}</p>
                <Link to={'/feed'} className="results-back-btn">
                    Voltar para o Feed
                </Link>
            </div>
        );
    }

    if (!proposal || !data || !data.analisis) {
        return (
            <div className="results-error">
                <div className="results-error-icon">📋</div>
                <h2 className="results-error-title">Dados não encontrados</h2>
                <p className="results-error-message">
                    Não foi possível carregar os dados da proposição.
                </p>
                <Link to={'/feed'} className="results-back-btn">
                    Voltar para o Feed
                </Link>
            </div>
        );
    }

    const { analisis } = data;
    const impactClass = getImpactClass(analisis.impact);

    return (
        <div className="results-page">
            <div className="results-container">

                {/* Cabeçalho da Proposição */}
                <div className="results-header">
                    <div className="results-breadcrumb">
                        <Link to="/feed">← Voltar ao Feed</Link>
                    </div>

                    <h1 className="results-proposal-id">
                        {proposal.siglaTipo} {proposal.numero}/{proposal.ano}
                    </h1>

                    <p className="results-proposal-date">
                        {formatDate(proposal.dataApresentacao)}
                    </p>

                    <h2 className="results-proposal-title">
                        {analisis.title}
                    </h2>

                    <p className="results-proposal-summary">
                        {analisis.summary}
                    </p>
                </div>

                {/* Slider de Impacto */}
                <div className="results-impact">
                    <p className="results-impact-label">Impactos na sua área</p>

                    <div className={`results-impact-slider ${impactClass}`}>
                    </div>

                    <p className={`results-impact-text ${impactClass}`}>
                        {analisis.impact}
                    </p>
                </div>

                {/* Explicação */}
                {analisis.explain && (
                    <div className="results-section">
                        <h3 className="results-section-title">Como isso afeta sua profissão</h3>
                        <p className="results-section-content">
                            {analisis.explain}
                        </p>
                    </div>
                )}

                {/* Analogia */}
                {analisis.analogy && (
                    <div className="results-section">
                        <h3 className="results-section-title">Analogia</h3>
                        <p className="results-section-content">
                            {analisis.analogy}
                        </p>
                    </div>
                )}

                {/* Controles de Áudio */}
                <div className="results-audio-controls">
                    <button
                        className="results-audio-btn"
                        aria-label="Play audio"
                        title="Ouvir análise em áudio (em breve)"
                    >
                        ▶️
                    </button>
                    <button
                        className="results-audio-btn secondary"
                        aria-label="Audio settings"
                        title="Configurações de áudio (em breve)"
                    >
                        🎧
                    </button>
                </div>

                {/* Botão Voltar */}
                <Link to={'/feed'} className="results-back-btn">
                    Voltar para o Feed
                </Link>
            </div>
        </div>
    );
}

export default Results;