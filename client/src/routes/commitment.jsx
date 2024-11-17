import { Salad, Smile  } from 'lucide-react'
const Commitment = () => {
    return (
        <div className="stripe-paiement-container">
            <h1 className="category-title">Super ! Votre coach a bien reçu vos engagements santé</h1>
            <p  className="category-text">Vous allez recevoir des alertes de rappel quelques heures avant l'engagement par sms ou email selon ce que vous avez conclu avec votre coach.</p>
            <p  className="category-text">Votre coach reviendra vers vous par téléphone ou email quelques heures aprés vos engagements pour échanger sur votre expérience.</p>
            <div className="container-center-child container-center-child--row">
                <Salad size={150} color={'teal'}/>
                <Smile size={150} color={'orange'} />
            </div>
        </div>
    );
}
 
export default Commitment;