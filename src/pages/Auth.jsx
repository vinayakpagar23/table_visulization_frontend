import {useContext} from "react";
import Login from "./Login";
import Register from "./Register";
import { AuthContext } from "../context/authContext";

const Auth =()=>{
    const {toggle} =useContext(AuthContext);
    return(
        <>
        {
            toggle?<Login/>:<Register/>
        }
        </>
    )
}

export default Auth;