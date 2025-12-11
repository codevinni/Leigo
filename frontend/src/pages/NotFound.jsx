import { Link } from 'react-router-dom';

function NotFound(){
    
    return(
        <>
            Page not found
            
            <Link to="/">
                <button>Voltar para o início</button>
            </Link>
        </>
    );

}

export default NotFound;