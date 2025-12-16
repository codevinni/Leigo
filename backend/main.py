from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import httpx
import json
import os
from pydantic import BaseModel
from dotenv import load_dotenv

# Carrega variáveis de ambiente do arquivo .env
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RequestParameters(BaseModel):
    proposal_id: int
    job: str


async def get_gemini_response(prompt: str, api_key: str, model: str = "gemini-2.5-flash") -> str:
    """ 
    """

    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel(model)
        response = await model.generate_content_async(prompt)
        
        return response.text.strip()
    
    except Exception as e:
        print(e)
        return ""

async def generate_analysis(proposal_data , news, job: str):
    """
    """

    news_str = json.dumps(news, indent=2, ensure_ascii=False)
    
    API_KEY = os.getenv("GEMINI_API_KEY")

    prompt = f"""
    ATUE COMO: Um especialista em política e economia brasileira, com foco em analisar o impacto de legislações no dia a dia dos cidadãos.
    
    USUÁRIO: {job}
    
    O PROJETO DE LEI:
    - Ementa: {proposal_data['ementa']}
    - Tipo: {proposal_data['tipo']} {proposal_data['numero']}/{proposal_data['ano']}
    
    NOTÍCIAS RECENTES (Contexto):
    {news_str}
    
    TAREFA:
    Analise este projeto de lei em duas etapas:
    1. PRIMEIRO: Explique o impacto GERAL para os brasileiros, independente da profissão
    2. DEPOIS: Explique como isso afeta ESPECIFICAMENTE quem trabalha como {job}
    
    Use linguagem simples e acessível. Se as notícias indicarem polêmica, mencione.
    
    SAÍDA OBRIGATÓRIA (JSON PURO):
    Responda APENAS um JSON válido nesta estrutura (sem markdown):
    {{
        "analisis": {{
            "title": "Manchete curta e direta sobre o tema principal",
            "summary": "Explicação de 3 linhas sobre o que muda PARA O CIDADÃO BRASILEIRO em geral, focando no impacto social/econômico amplo",
            "impact": "POSITIVO, NEGATIVO ou NEUTRO (considerando o impacto na área de {job})",
            "explain": "Explicação específica de como isso afeta profissionalmente quem trabalha como {job}. Se não houver relação direta com a profissão, mencione o impacto pessoal do cidadão que é {job}",
            "analogy": "Uma comparação do dia a dia que qualquer pessoa entenderia"
        }},
        "prompts": {{
            "audio": "Um prompt para um áudio de podcast ilustrando e explicando sobre a ementa e seus impactos",
            "image": "Um prompt bem curto para uma imagem referente ao tema."
        }}
    }}
    """

    res = await get_gemini_response(prompt, API_KEY)
    
    try:
        # Limpeza para evitar a IA mandar ```json```
        clean_json = res.replace("```json", "").replace("```", "").strip()
        return json.loads(clean_json)
    
    except json.JSONDecodeError:
        return {
            "analisis": {
                "title": "Análise Indisponível",
                "summary": proposal_data['ementa'],
                "impact": "Erro ao processar IA",
                "analogy": "-"
            },
            "prompts": {"audio": "Indisponível", "image": "Indisponível"}
        }

async def generate_search_terms(text: str):
    """
    """

    API_KEY = os.getenv("GEMINI_API_KEY")

    prompt = f"""
    Aja como um mecanismo de busca (SEO).
    Resuma a seguinte ementa de lei em um termo de busca de 
    NO MÁXIMO 3 palavras-chave principais para encontrar notícias relacionadas.
    Não use a palavra "PL" ou números. Foque no assunto.
    
    Ementa: {text}
    
    Saída (apenas as palavras):
    """

    term = await get_gemini_response(prompt, API_KEY)
    return term if term else "Proposição Brasil política"

async def get_proposal(id: int):
    """
    """

    async with httpx.AsyncClient(timeout=10.0) as client:
        
        URL_CAMARA = f"https://dadosabertos.camara.leg.br/api/v2/proposicoes/{id}"

        try:
            res = await client.get(URL_CAMARA)
            
            if res.status_code == 404:
                raise HTTPException(status_code=404, detail=f"Proposição com id: {id} não encontrada na API da Câmara")
            
            if res.status_code != 200:
                raise HTTPException(status_code=502, detail="Erro na API da Câmara.")
            
            data = res.json()['dados']

            #return data
            return {
                "tipo": data['siglaTipo'],
                "numero": data['numero'],
                "ano": data['ano'],
                "ementa": data['ementa'],
                "data_apresentacao": data['dataApresentacao'],
                "link_inteiro_teor": data.get('urlInteiroTeor'),
                "autor_uri": data.get('uriAutores')
            }

        except Exception as e:
            raise HTTPException(status_code=503, detail=f"Erro ao obter dados da lei {id} na API da Câmara: {str(e)}")

async def search_news(term: str):
    """
    """

    URL_NEWS = "https://newsapi.org/v2/everything"
    
    params = {
        "q": term, 
        "language": "pt",   
        "sortBy": "relevancy",
        "pageSize": 5,       
        "apiKey": os.getenv("NEWS_API_KEY")
    }

    async with httpx.AsyncClient(timeout=10.0) as client:

        try:
        
            response = await client.get(URL_NEWS, params=params)
            
            if response.status_code != 200:
                return []

            dados = response.json()
            articles = dados.get("articles", [])

            news = []

            for article in articles:
                news.append({
                    "titulo": article.get("title"),
                    "fonte": article["source"].get("name"),
                    "data": article.get("publishedAt")[:10],
                })
            
            return news

        except Exception as e:
            print(f"Erro de conexão com NewsAPI: {e}")
            return []


@app.post("/analyze")
async def analyze_proposal(request: RequestParameters):

    proposal_data = await get_proposal(request.proposal_id)
    term = await generate_search_terms(proposal_data["ementa"])
    news = await search_news(term)
    result = await generate_analysis(proposal_data, news, request.job)
 
    return result