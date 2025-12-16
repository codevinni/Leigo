const ENDPOINT = "https://dadosabertos.camara.leg.br/api/v2"

function formatDate(data) {
    return data.toISOString().split('T')[0];
}

export async function searchRecentProjects() {

    const today = new Date();
    const oldDate = new Date();
    oldDate.setDate(today.getDate() - 30);

    const startDate = formatDate(oldDate);
    const endDate = formatDate(today);

    // Códigos de temas disponíveis na API, como Economia, Tecnologia e etc.
    const themes = [40, 52, 58, 67, 56, 46, 61, 43, 37, 54, 66, 64, 48];
    const types = ["PEC", "PL", "PLP"]; // Tipos de porposições

    const themesParam = themes.map(t => `${t}`).join(',');
    const typesParam = types.map(t => `${t}`).join(',');

    const url = `${ENDPOINT}/proposicoes?siglaTipo=${typesParam}&codTema=${themesParam}&dataApresentacaoInicio=${startDate}&dataApresentacaoFim=${endDate}&ordem=DESC&ordenarPor=id&itens=30`;

    try {
        const response = await fetch(url);
        const json = await response.json();
        return json.dados;
    } catch (error) {
        console.error("Erro API Câmara:", error);
        return [];
    }
};

export async function getProjectInfo(id) {

    const url = `${ENDPOINT}/proposicoes/${id}`;

    try {
        const response = await fetch(url);
        const json = await response.json();
        return json.dados;
    } catch (error) {
        console.error("Erro API Câmara:", error);
        return null;
    }
}

export async function getAnalisisResult(id, job) {

    const API = "https://leigo-fastapi-rest.vercel.app/analyze"

    try {
        const response = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                proposal_id: parseInt(id),
                job: job
            })
        });

        if (!response.ok)
            throw new Error("Erro na comunicação com o backend");

        const result = await response.json();
        return result;

    } catch (err) {
        console.error("Erro inesperado:", err);
        throw err;
    }
}
