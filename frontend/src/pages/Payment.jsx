import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookingDetails, createStripeCheckout } from "../services/api";

function Payment() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("booking_id");

  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentData, setPaymentData] = useState({
    payment_method: "card"
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await getBookingDetails(bookingId);
        setTotalPrice(response.data.total);
      } catch (error) {
        console.error("Erreur récupération montant :", error);
      }
    };

    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId]);

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createStripeCheckout({
        amount: totalPrice,
        booking_id: bookingId
      });

      console.log("Réponse Stripe :", response.data);

      window.location.href = response.data.url;
    } catch (error) {
      console.error(
        "Erreur Stripe frontend :",
        error.response?.data || error
      );
    }
  };

  return (
    <main className="payment-container">
      <h2>Paiement</h2>

      <div className="payment-card">
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <p>Montant à payer : {totalPrice} €</p>
          </div>

          <div className="form-group">
            <label>Méthode de paiement : </label>
            
            <select
              name="payment_method"
              value={paymentData.payment_method}
              onChange={handleChange}
            >
              <option value="card">Carte bancaire</option>
              <option value="paypal">Paypal</option>
            </select>
          </div>

          <button type="submit">
            Payer
          </button>
        </form>
      </div>
    </main>
  );
}

export default Payment;