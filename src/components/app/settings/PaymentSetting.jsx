import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import axios from "../../../axios";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { ErrorToast, SuccessToast } from "../../global/Toaster";
import { loadStripe } from "@stripe/stripe-js";
import { GoTrash } from "react-icons/go";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);

const PaymentSettingContent = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardsLoading, setCardsLoading] = useState(false);

  const handleAddCard = async () => {
    if (!stripe || !elements) return ErrorToast("Stripe not loaded yet bro 😅");

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      ErrorToast(error.message);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/finance/cards", {
        paymentMethodId: paymentMethod.id,
      });
      SuccessToast(res?.data?.message || "Card Added Successfully");
      cardElement.clear();

      getCards();
    } catch (err) {
      ErrorToast(err?.response?.data?.message || "Error adding card");
    } finally {
      setLoading(false);
    }
  };

  const getCards = async () => {
    setCardsLoading(true);
    try {
      const response = await axios.get("/finance/cards");
      if (response?.status === 200) {
        const cardData = response?.data?.data;

        setCards(cardData);
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message || "Error fetching cards");
    } finally {
      setCardsLoading(false);
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  const handleDeleteCard = async (id) => {
    try {
      const res = await axios.delete(`/finance/cards/${id}`);
      SuccessToast(res?.data?.message || "Card deleted");
      getCards();
    } catch (error) {
      ErrorToast(error?.response?.data?.message || "Error deleting card");
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-[600] mb-0">Payment Method</h3>
      <p className="mt-1 mb-10">Select or Add a Payment Method.</p>

      {/* ✅ Saved Cards Section */}
      <div className="space-y-4 ml-[7em] mr-[7em]">
        {cardsLoading ? (
          <p>Loading cards...</p>
        ) : !cards ? (
          <p className="text-gray-500 italic">No saved cards found</p>
        ) : (
          <div
            key={cards?.id}
            className="w-full p-3 bg-[#F0F4FF] border rounded-2xl flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <span className="font-[500] capitalize">
                {cards?.brand} •••• {cards?.last4}
              </span>
            </div>
            <button onClick={() => handleDeleteCard(cards?.id)}>
              <GoTrash color="red" className="text-lg" />
            </button>
          </div>
        )}
      </div>

      {/* ✅ Add New Card */}
      <div className="mt-10 ml-[7em] mr-[7em]">
        <h4 className="text-xl font-semibold mb-3">Add a new card</h4>
        <div className="border p-3 rounded-xl mb-4">
          <CardElement />
        </div>
        <button
          onClick={handleAddCard}
          disabled={!stripe || loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          {loading ? "Adding..." : "Add Card"}
        </button>
      </div>
    </div>
  );
};

const PaymentSetting = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentSettingContent />
    </Elements>
  );
};

export default PaymentSetting;
