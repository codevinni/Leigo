import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectInfo } from "../services/camaraApi";

function Results(){

    const { id } = useParams();
    const [lei, setLei] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        const loadProject = async () =>{

            const project = await getProjectInfo(id) ;

            setLei(project);
            setLoading(false);
        }

        loadProject();

    },[id])

    if(loading){
        return (
            <> Carregando Análise... </>
        );
    }

    return(
        <>
            Resultados
            <br />
            <br />
            {lei.ementa}
            <br />
            <br />
            Dados da IA...

            {
                <Link to={'/feed'}>
                    <button>Voltar</button>
                </Link>

            }
        </>
    );
}

export default Results;