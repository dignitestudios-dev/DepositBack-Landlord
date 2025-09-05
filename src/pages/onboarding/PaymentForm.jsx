import { useContext, useState } from "react";
import {
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "../../axios";
import { useNavigate } from "react-router";
import { AppContext } from "../../context/AppContext";
import { ErrorToast } from "../../components/global/Toaster";
import { RiLoader5Line } from "react-icons/ri";

const ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#1A202C",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSize: "16px",
      "::placeholder": {
        color: "#CBD5E0",
      },
    },
    invalid: {
      color: "#E53E3E",
      iconColor: "#E53E3E",
    },
  },
};

const PaymentForm = ({ planData, setShowModal }) => {
  const navigate = useNavigate();
  const { loginContext } = useContext(AppContext);

  console.log("🚀 ~  ~ planData:", planData);

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  console.log("🚀 ~ PaymentForm ~ error:", error);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const cardNumberElement = elements.getElement(CardNumberElement);

    // Create payment method using stripe
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
    });
    console.log("🚀 ~ handleSubmit ~ error:", error);

    if (error) {
      setError(error.message);
      ErrorToast(error.message);
      setLoading(false);
    } else {
      try {
        const response = await axios.post("/finance/cards", {
          paymentMethodId: paymentMethod.id,
        });

        console.log("🚀 ~ Stripe ~ response:", response);
        if (response.status === 200) {
          const response = await axios.post(
            "/subscription/stripeSubscription",
            {
              sku: planData?.sku,
            }
          );
          console.log("🚀 ~ handleSubmit ~ response:", response);
          if (response.status === 200) {
            loginContext(response?.data);
            setShowModal(true);
          }
        }
      } catch (apiError) {
        ErrorToast(apiError?.response?.data?.message);
        console.error("the error is ===", apiError);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h2 className="text-[24px] font-[600]  ">Payment Details</h2>
      <div className="flex justify-between items-center p-6 mt-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white h-[79px] rounded-3xl ">
        <h2 className="text-[18px] font-[600] text-white ">
          {planData?.name} ({planData?.type})
        </h2>
        <p className="text-[20px] text-white font-[600] ">
          ${planData?.price}{" "}
          <span className="text-[16px] font-[400] ">
            {planData?.type === "Yearly Plan" ? "/year" : "/month"}
          </span>{" "}
        </p>
      </div>
      {/* <div className="flex justify-between items-center border-b border-b-[#D9D9D9]  pb-4 my-5">
        <h2 className="text-[14px] font-[500]  ">
          Non-Refundable Application Fee -{" "}
        </h2>
        <p className="text-[14px] font-[700] ">{planData?.price}</p>
      </div> */}
      <div className="flex justify-between items-center   pb-4 my-5">
        <h2 className="text-[14px] font-[500]  ">Total Amount </h2>
        <p className="text-[14px] font-[500] ">${planData?.price}</p>
      </div>

      <form>
        <div className="bg-white rounded-3xl p-6 space-y-4 w-full xl:max-w-[880px] md:max-w-[550px]">
          <div>
            <label className="block text-sm font-medium mb-1">
              Card Number
            </label>
            <div className="border border-gray-300 rounded-md px-4 py-2 bg-white">
              <CardNumberElement options={ELEMENT_OPTIONS} />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Expiry</label>
              <div className="border border-gray-300 rounded-md px-4 py-2 bg-white">
                <CardExpiryElement options={ELEMENT_OPTIONS} />
              </div>
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">CVC</label>
              <div className="border border-gray-300 rounded-md px-4 py-2 bg-white">
                <CardCvcElement options={ELEMENT_OPTIONS} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-4 gap-4">
          <div>
            <button
              type={"button"}
              onClick={() => navigate(-1)}
              className="rounded-full w-full font-[500] bg-slate-200 border-gray-100  text-[16px] h-[49px] "
            >
              <div className="flex justify-center items-center">
                <span className="mr-1">Back</span>
              </div>
            </button>
          </div>
          <div>
            <button
              disabled={loading}
              onClick={(e) => handleSubmit(e)}
              className="block w-full px-4 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full font-semibold text-center hover:opacity-90 transition"
            >
              <div className="flex justify-center items-center">
                <span className="mr-1">Pay Now</span>
                {loading && <RiLoader5Line className="animate-spin text-lg" />}
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
