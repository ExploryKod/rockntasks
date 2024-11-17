import {React, useEffect } from 'react';
import { useContext } from 'react';
import { ListContext } from '../context/list.context';
import CartSummary from "./cartSummary";

const TaskList = () => {
    const { listItems } = useContext(ListContext);
    useContext(ListContext);

    useEffect(() => {
    
        let totalNutrition = [];
        listItems.forEach((listItem) => {
          const { category_id } = listItem;
          totalNutrition.push(category_id);
    
        });       
  
    }, [listItems]);
  
    

    return (
        <section className={"checkout-container"}>
        {(listItems && listItems?.length > 0) ? (
            <>
                <article className="table-container">
                    <div className="table">

                            <div className="table-header">
                                <div>Tâche</div>
                                <div>Identifiant</div>
                                <div>Quantité</div>
                                <div>Statut</div>
                                <div>Actions</div>
                            </div>

                        {listItems && listItems?.map((listItem) => (
                            <div key={listItem.id}>
                                 <CartSummary cartItem={listItem} />
                            </div>
                        ))}
                    </div>
                    <div className="result-container"> 
                        <a className="button button--secondary paiement-btn" href="/commitment">Je m'engage</a>
                        <span className='total'>TOTAL: X tâches</span>
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
