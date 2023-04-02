import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Particles } from "../particles";

function InputName(){
    const [user, setUser] = useState()
    const location = useLocation()
    const navigate = useNavigate()
    const addUser = (e) =>{
       // e.preventDefault();
        sessionStorage.setItem("user", user)
        navigate(location.pathname)
    }
    return(
        <div className="main">
        <Particles />
        <div className="dashboard-header">
            <div></div>
            <div>
                <img className='logo2' src='/images/ksustify.png' alt='logo' />
            </div>
            <div></div> 
        </div>
        <div className="dashboard-body">
            <div></div>
            <div className="d-body-main">
                <div className="meetings">
                    <div className="new-meeting">
                        <form onSubmit={addUser}>
                            <label>Enter Username: </label>
                            <input type="text"  required onChange={(e) =>setUser(e.target.value)} />
                            <p>
                             <button type="submit" role="submit">Continue</button>
                            </p>
                            
                        </form>
                    </div>
                    
                
            </div>
            </div>
            <div></div>
        </div>
    </div>
    )
}
export default InputName;