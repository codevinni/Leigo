import { use, useEffect, useState } from "react";
import { getProjectInfo } from "../services/camaraApi";
import { Link } from "react-router-dom";

function FeedCard({ info }){

    return(
        <div>
            
            {info.siglaTipo} {info.numero}/{info.ano}
            <br />
            {info.ementa}
            <br />
            {info.dataApresentacao} ➡️

            <Link to={`/result/${info.id}`}>
                <button>Análisar</button>
            </Link>

            <br />
            <br />

        </div>
    );
}

export default FeedCard