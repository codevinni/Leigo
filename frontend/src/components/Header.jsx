import './Header.css';

function Header({ job, onclickFunction }) {

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-logo">
                    <img src="/leigo.png" alt="Leigo.AI Logo" className="header-logo-img" />
                    <span>Leigo.AI</span>
                </div>

                <div className="header-user-section">
                    {job && (
                        <div className="header-job-info">
                            <span className="header-job-label">{job}</span>
                        </div>
                    )}

                    <button
                        className="header-btn-edit"
                        onClick={onclickFunction}
                        aria-label={job ? "Editar profissão" : "Definir profissão"}
                    >
                        <span className="header-btn-icon">✏️</span>
                        <span>{job ? "Editar" : "Definir Perfil"}</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;