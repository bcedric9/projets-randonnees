import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createPayment, getBookingDetails } from "../services/api";

function Payment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

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
      await createPayment({
        amount: totalPrice,
        payment_method: paymentData.payment_method,
        booking_id: bookingId
      });

      navigate("/profile");
    } catch (error) {
      console.error("Erreur paiement :", error.response?.data || error);
    }
  };

  return (
    <main>
      <h1>Paiement</h1>

      <p>Montant à payer : {totalPrice} €</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Méthode de paiement</label>
          <select
            name="payment_method"
            value={paymentData.payment_method}
            onChange={handleChange}
          >
            <option value="card">Carte bancaire</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        <button type="submit">Payer</button>
      </form>
    </main>
  );
}

export default Payment;