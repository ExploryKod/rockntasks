import { Link } from "react-router-dom";
import { IoIosLink } from "react-icons/io";
export const Credits = () => {
    return (
        <main className="plain-container max-width-900 center-me padding-x-40">
            <div className="padding-x-10 padding-y-30 flex-btw-container">
                    <h1 className="margin-left-10 text-size-20">Crédits</h1>
                    <Link to="/" className="text-size-14 text-align-center btn-mini">Retour à l'accueil</Link>
            </div>
            <div className="max-sm--padding-20 grid-container-main">
                <div className="b-shadow-1 width-400 padding-20 max-sm--padding-10 bgd-darkpink border-radius-5">
                    <h2 className="text-white text-size-18">Icone de chat: </h2>
                    <p className="text-darkBlue margin-top-10 text-w-600">
                        <IoIosLink className="icon-size-20 margin-right-10" />
                        <a className="text-white" href="https://www.flaticon.com/free-icons/cat" title="cat icons">Cat icons created by Freepik - Flaticon</a>
                    </p>
                </div>
                <div className="b-shadow-1 width-400 padding-20  max-sm--padding-10 bgd-darkBlue border-radius-5">
                    <h2 className="text-white text-size-18">Deux cercles (loader) : </h2>
                    <p className="text-white margin-top-10 text-w-600">
                        <IoIosLink className="icon-size-20 margin-right-10" />
                        <a className="text-white" href="https://loading.io/icon/" title="cat icons">loader created by loading.io</a>
                    </p>
                </div>
            </div>
        </main>
    )
}

