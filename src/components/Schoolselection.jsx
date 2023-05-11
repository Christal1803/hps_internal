import React from 'react'
import { useNavigate } from "react-router";
import ognisko from "../assets/images/dashboard/ognisko.png";
import reveur from "../assets/images/dashboard/reveur.png";
import hufflepuf from "../assets/images/dashboard/hufflepuf.png";
import ubunto from "../assets/images/dashboard/ubunto.png";

function Schoolselection() {
    let navigate = useNavigate();
  const MovetoDashboard = () => {
    let path = `/dashboard`;
    navigate(path);
  };



    

  return (
    <div>
        <div className='houses'>
            <div className='houses-wrapper'>
                <div className='houses__cards'>
                    <div className='houses__card' onClick={MovetoDashboard}>
                        <div className='houses__card-image'>
                            <img src={ognisko}/>
                        </div>
                        <div className='houses__card-footer'>
                            <p>St.marys</p>
                        </div>
                        <div className='houses__card-count'>
                            <p><b>1</b></p>
                        </div>
                    </div>

                    <div className='houses__card'>
                        <div className='houses__card-image'>
                            <img src={reveur}/>
                        </div>
                        <div className='houses__card-footer'>
                            <p>St.marys</p>
                        </div>
                        <div className='houses__card-count'>
                            <p><b>1</b></p>
                        </div>
                    </div>


                    <div className='houses__card'>
                        <div className='houses__card-image'>
                            <img src={hufflepuf}/>
                        </div>
                        <div className='houses__card-footer'>
                            <p>St.marys</p>
                        </div>
                        <div className='houses__card-count'>
                            <p><b>1</b></p>
                        </div>
                    </div>


                    <div className='houses__card'>
                        <div className='houses__card-image'>
                            <img src={ubunto}/>
                        </div>
                        <div className='houses__card-footer'>
                            <p>St.marys</p>
                        </div>
                        <div className='houses__card-count'>
                            <p><b>1</b></p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Schoolselection
