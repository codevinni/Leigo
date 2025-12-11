import { useEffect, useState } from "react";
import Card from "../components/Card";

function Feed(){

    const [leis, setLeis] = useState([]);
    const [loading, setLoading] = useState(true);
    const arrayL = ["Lei 1", "Lei 2", "Lei 3"];

    useEffect(()=>{
        setLeis(arrayL);
        setLoading(false);
    }, [])
    
    if(loading){
        return (
            <> Carregando PLs... </>
        );
    }
    
    return (
        <>
            {
                leis.map((lei) => <Card key={lei} data={lei}/>)
            }
        </>
    );
}

export default Feed;