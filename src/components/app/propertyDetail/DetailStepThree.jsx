import { useState } from "react";
import Modal from "../../global/Modal";
import UvModal from "./UvModal";
import Addmorepropertymodal from "../../global/Addmorepropertymodal";
import BuyUvModal from "./BuyUvModal";

const DetailStepThree = ({ nextStep }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="bg-[#F9FAFA] mt-20 rounded-xl shadow-lg p-8">
      <div className="h-[250px]">
        <p className="text-black pb-3 pt-3 ">
          UV (Ultraviolet) light is a form of electromagnetic radiation that is
          invisible to the human eye. It is commonly used in verification and
          tracking processes because certain materials react to UV exposure by
          glowing or becoming visible. This makes UV light highly effective for
          detecting marks, validating authenticity and enhancing security in
          various applications without affecting the visible appearance of an
          item.
        </p>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={() => setShowModal(true)}
          className="px-[10em] py-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium"
        >
          Verify UV Light
        </button>
      </div>
      <UvModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setModalOpen(true);
        }}
        data={{
          title: "Do you have a UV light?",
          description: "Confirm that you have the UV light or not.",
          iconBgColor: "bg-blue-600", // Optional
        }}
      />
      <BuyUvModal
        isOpen={modalOpen}
        onAction={() => {
          setModalOpen(false);
        }}
        onSecondaryAction={() => {
          nextStep();
        }}
        data={{
          title: "Do you have a UV light?",
          description: "Confirm that you have the UV light or not.",
          iconBgColor: "bg-blue-600",
        }}
      />
    </div>
  );
};

export default DetailStepThree;
