import React, { useState } from 'react';
import config from "../config/config.tsx";
import {Link, useNavigate} from 'react-router-dom';
import { useLoggedStore } from '../StateManager/userStore.ts';
import useFlashMessage from '../Hook/useFlashMessage.tsx';
import '../Styles/_flashMessage.scss';
import { usePasswordMeter } from "../Hook/usePasswordMeter.tsx";

const Connexion = () => {
  const serverHost: string = config.serverHost;
  console.log("serverhost ", serverHost)
  const [toggle, setToggle] = useState(true);
  const [formData, setFormData] = useState({password: "", username: ""})
  const [registerData, setRegisterData] = useState({username: "", password: "", status: ""})
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toastMessage } = useFlashMessage('')
  const navigate = useNavigate();
  const { setToken, setUsername, setAdminStatus } = useLoggedStore();
  const { isError, onPasswordChange } = usePasswordMeter()

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleRegisterSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    console.log('serverhost', serverHost)    
    try {
      const response = await fetch(`${serverHost}/auth/register`, {
        method: 'POST',
        mode: "no-cors",
        body: new URLSearchParams({
          ...registerData
        })
      });

      if (response.ok) {
        const data = await response.json();
        toastMessage(data.message);
        setIsLoading(false);
        setToggle(!toggle)
      } else if (response.status !== 500) {
        const errorData = await response.json();
        console.error("échec de l'inscription:", errorData);
        setIsLoading(false);
        toastMessage(errorData.message);
      } else {
        setIsLoading(false);
        toastMessage('')
      }
    } catch(error) {
      console.error('log failed:', error);
      setIsLoading(false);
      // CORS error or network error are being catched here
      toastMessage('Il y a eu une erreur dans la requête: la connexion est mauvaise ou le serveur est indisponible')
    }
  };

  const handleLoginSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('serverhost', serverHost)    
    try {
      const response = await fetch(`${serverHost}/auth/logged`, {
        method: 'POST',
        body: new URLSearchParams({
          ...formData
        })
      });

      if (response.ok) {

        const data = await response.json();
        if(data.token) {
          setToken(data.token);
          setUsername(formData.username);
          setAdminStatus(data.admin);
          setIsLoading(false);
        } else {
          setToken('');
          setIsLoading(false);
        }
        navigate(data.redirectUrl || '/');
      } else {
        const errorData = await response.json();
        toastMessage(errorData.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('log failed:', error);
      toastMessage(`Le connexion a échoué: ${error}`);
      setIsLoading(false);
    }
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    if(e.target.name === "password") {
      onPasswordChange(e);
    }

    setRegisterData(prevState => {
        return {
            ...prevState,
            [e.target.name]: e.target.value
        }
    }) 
}

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => {
        return {
            ...prevState,
            [e.target.name]: e.target.value
        }
    })
}

return (
  <main className="page-connexion">
    <div className="outer-connexion">
      <div className="inner-connexion">
        {!toggle ? (
          <div className="container-inscription">
            <form className="form-container" onSubmit={handleRegisterSubmit} method="post">
              <div className="form-elem">
                <label htmlFor="username-register"></label>
                <input type="text" name="username" id="username-register" placeholder="Votre pseudo" onChange={handleRegisterChange} required  />
              </div>
              <div className="form-elem">
                <label htmlFor="email-register"></label>
                <input type="email" name="email" id="email-register" placeholder="Votre email" onChange={handleRegisterChange} required  />
              </div>
              <div className="form-elem">
                <label htmlFor="password-register"></label>
                <input type="text" name="password" id="password-register" placeholder="Choisir un mot de passe" onChange={handleRegisterChange} required />
                <div className="margin-top-5 padding-20">
                  {(isError && isError != "") && <p className={`text-red`}>{isError}</p>}
                </div>
              </div>

             
              <div className="form-elem">
                <button className="button-container" type="submit">
                  Créer son compte
                </button>
              </div>
              <div className="form-elem">
                <p> Déjà inscris ? <span className="to-connexion-link" onClick={handleToggle}>Se connecter</span>
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="container-connexion">
            <div className="form-container">
              <form method="post" onSubmit={handleLoginSubmit}>
                <div className="form-elem">
                  <label htmlFor="username" className="connexion__username"></label>
                  <input type="text" name="username" id="username" placeholder="Votre pseudo" onChange={handleChange} required />
                </div>
                <div className="form-elem">
                  <input type="text" name="password" id="password" placeholder="Mot de passe" onChange={handleChange} required />
                </div>
                <input type="hidden" name="status" id="status" value="user" onChange={handleRegisterChange} />
                <div className="form-elem">
                  <button type="submit" className="button-container">
                    {isLoading ? (<span className={"loading-dots"}>Chargement...</span>) : (<span>Se connecter</span>)}
                  </button>
                </div>
                <div className="form-elem">
                <p>
                  <span className="to-connexion-link" onClick={handleToggle}>Créer son compte</span>
                </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
    <div className="connexion__credits">
      <Link to="/credits">Crédits</Link>
    </div>
  </main>
);
};

export default Connexion;