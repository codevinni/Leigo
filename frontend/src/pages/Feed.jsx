import { useEffect, useState } from "react";
import FeedCard from "../components/FeedCard";
import { searchRecentProjects } from "../services/camaraApi";

function Feed(){

    const [leis, setLeis] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        const loadProjects = async() => {
            const projects = await searchRecentProjects()
            setLeis(projects);
            setLoading(false);
        }

        loadProjects()

    }, [])
    
    if(loading){
        return (
            <> Carregando PLs... </>
        );
    }
    
    return (
        <>
            {
                leis.map((lei) => <FeedCard key={lei.id} info={lei}/>)
            }
        </>
    );
}

export default Feed;