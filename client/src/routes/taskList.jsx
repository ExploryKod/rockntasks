import {React } from 'react';
import { useContext } from 'react';
import { ListContext } from '../context/list.context';
import ListSummary from "../components/todo/listSummary";

const TaskList = () => {
    const { listItems } = useContext(ListContext);
    useContext(ListContext);

    console.log("summary", listItems)

    return (
        <section className={"checkout-container"}>
        {(listItems && listItems?.length > 0) ? (
            <>
                <article className="table-container">
                    <div className="table">

                            <div className="table-header">
                                <div>Tâche</div>
                                <div>Objet</div>
                                <div>Priorité</div>
                                <div>Date</div>
                                <div>Actions</div>
                            </div>

                        {listItems && listItems?.map((listItem) => (
                            <div key={listItem.id}>
                                 <ListSummary listItem={listItem} />
                            </div>
                        ))}
                    </div>
                    <div className="result-container"> 
                        <a className="button button--secondary paiement-btn" href="/commitment">Je m'engage</a>
                    </div>
                </article>
               </>

            ): (<article className={"container-center-child container-center-child--column"}>
                <p className="category-text">Il n'y a pas de tâches dans votre liste.</p>
                </article>)}
        </section>
    );
};

export default TaskList;
