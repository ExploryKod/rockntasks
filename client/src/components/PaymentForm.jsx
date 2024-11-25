import React, { useState } from "react";
import { LockKeyhole } from "lucide-react"
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
 
const PAYMENT_SUCESS_URL = `${process.env.REACT_APP_CLIENT_URL}/success`;
 
const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
 
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
 
        setIsLoading(true);
        setMessage("Payment in Progress");
 
        const resp = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: PAYMENT_SUCESS_URL,
            },
        });
 
        if (resp.error) setMessage("Some Error Occurred !!");
        setIsLoading(false);
    };
 
    return (
        <div className="stripe-paiement-container">
            <form onSubmit={handleSubmit}>
                    <div className="stripe-form-header">
                        <h1 className="category-title">
                            Payer votre commande
                        </h1>
                        <div className="stripe-text">
                            <span>Paiement sécurisé avec notre partenaire </span>    
                            <a href="https://stripe.com/">
                                <svg fill="none" height="48" viewBox="0 0 70 48" width="70" xmlns="http://www.w3.org/2000/svg"><rect fill="#fff" height="47" rx="5.5" stroke="#d9d9d9" width="69" x=".5" y=".5"/><path clip-rule="evenodd" d="m37.6109 16.2838-3.5559.7632v-2.883l3.5559-.749zm7.3948 1.597c-1.3884 0-2.2809.65-2.7767 1.1023l-.1842-.8762h-3.1167v16.478l3.5417-.749.0142-3.9994c.51.3674 1.2608.8903 2.5075.8903 2.5358 0 4.845-2.035 4.845-6.5149-.0142-4.0983-2.3517-6.3311-4.8308-6.3311zm-.8501 9.7369c-.8358 0-1.3317-.2967-1.6717-.6642l-.0141-5.243c.3683-.4098.8783-.6924 1.6858-.6924 1.2892 0 2.1817 1.4414 2.1817 3.2927 0 1.8937-.8784 3.3069-2.1817 3.3069zm16.8444-3.2645c0-3.6178-1.7567-6.4724-5.1142-6.4724-3.3716 0-5.4116 2.8546-5.4116 6.4442 0 4.2537 2.4083 6.4018 5.865 6.4018 1.6858 0 2.9608-.3816 3.9241-.9186v-2.8264c-.9633.4805-2.0683.7773-3.4708.7773-1.3742 0-2.5925-.4805-2.7483-2.1481h6.9275c0-.0778.0051-.2545.0109-.4582v-.0002-.0001-.0001-.0001c.008-.277.0174-.6037.0174-.7991zm-6.9984-1.3425c0-1.5969.9775-2.2611 1.87-2.2611.8642 0 1.785.6642 1.785 2.2611zm-19.9468-4.8897h3.5559v12.3656h-3.5559zm-4.0372 0 .2267 1.0458c.8358-1.5263 2.4933-1.2154 2.9466-1.0458v3.2504c-.4391-.1555-1.8558-.3533-2.6916.7349v8.3803h-3.5417v-12.3656zm-6.8569-3.0667-3.4567.7349-.0141 11.3198c0 2.0915 1.5725 3.6319 3.6691 3.6319 1.1617 0 2.0117-.2119 2.4792-.4663v-2.8688c-.4533.1837-2.6917.8338-2.6917-1.2578v-5.0169h2.6917v-3.0101h-2.6917zm-8.3723 5.8932c-.7509 0-1.2042.2119-1.2042.7631 0 .6018.7802.8665 1.7481 1.1949 1.5779.5354 3.6548 1.24 3.6636 3.8502 0 2.5297-2.0259 3.9853-4.9725 3.9853-1.2184 0-2.5501-.2403-3.8676-.8055v-3.3635c1.19.6501 2.6917 1.1306 3.8676 1.1306.7933 0 1.36-.212 1.36-.8621 0-.6665-.8458-.9712-1.8668-1.339-1.555-.5602-3.5166-1.2669-3.5166-3.6213 0-2.5014 1.9125-3.9994 4.7884-3.9994 1.1758 0 2.3375.1837 3.5133.6501v3.321c-1.0767-.5794-2.4367-.9044-3.5133-.9044z" fill="#6461fc" fill-rule="evenodd"/></svg>
                            </a>
                        </div>
                        <div className="stripe-text stripe-text--col">
                            <small>Ce site n'est pas réel.<br/> Vous pouvez tester en choisissant la fausse mastercard sur Stripe&nbsp;: </small>
                            <a className="button button--small" href="https://docs.stripe.com/testing#cards">Tester une carte</a>
                        </div>
                        </div>
                        <PaymentElement />
                        <div className="container-center-child container-center-child--row">
                            <button
                                className="button button--secondary icon-button"
                                disabled={isLoading || !stripe || !elements}
                            >
                                <LockKeyhole />
                                {isLoading ? "Loading..." : "Payer"}
                            </button>
                        </div>
                        {message && <div>{message}</div>}
            </form>
        </div>
    );
};
 
export default PaymentForm;