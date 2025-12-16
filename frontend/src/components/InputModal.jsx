import { useState } from "react";
import './InputModal.css';

function InputModal({ onSave, onClose, currentJob }) {

    const [input, setInput] = useState(currentJob || "");

    const handleSave = () => {
        if (input.trim()) {
            onSave(input.trim());
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && input.trim()) {
            handleSave();
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">Sua área de atuação</h2>
                <p className="modal-subtitle">
                    Informe sua profissão para análises personalizadas
                </p>

                <input
                    type="text"
                    className="modal-input"
                    placeholder="Ex: Desenvolvedor de Software"
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    value={input}
                    autoFocus
                />

                <div className="modal-actions">
                    {currentJob && (
                        <button
                            className="modal-btn modal-btn-cancel"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                    )}
                    <button
                        className="modal-btn modal-btn-save"
                        onClick={handleSave}
                        disabled={!input.trim()}
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InputModal;