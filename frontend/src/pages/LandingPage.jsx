import { Link } from "react-router-dom";

function LandingPage(){

    return(
        <>
            Bem-vindo
            <br />
            <Link to="/feed">
                <button>Descomplicar</button>
            </Link>
        </>
    );
}

export default LandingPage;