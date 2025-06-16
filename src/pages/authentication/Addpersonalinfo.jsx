import { useState } from "react";
import { useNavigate } from "react-router";
import logoback from "../../assets/backloginimage.webp";
import Input from "../../components/global/Input";
import { FaArrowLeft } from "react-icons/fa";

export default function Addpersonalinfo() {
  const [Fullname, setFullname] = useState("");
  const [Ssnnumber, setSsnnumber] = useState("");
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Successfully Submit...");
    navigate("/onboarding/subscription-plans", { state: { email: "example@email.com" } }); // Fix 'email' reference
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f4f8ff] overflow-hidden">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-start p-0 lg:p-12">
        <div className="w-full max-w-md pt-[4em]">
          <div className="text-left mb-6">
            <button type="button" onClick={() => navigate(-1)} >
              <FaArrowLeft size={25} />
            </button>
            <h2 className="text-[34px] mt-2 font-[600] leading-[48px] tracking-normal capitalize pt-[20px]">
              Add Personal Information
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-4">
              <label htmlFor="profilePic" className="w-16 h-16 rounded-full border-2 border-dashed border-blue-500 flex items-center justify-center cursor-pointer overflow-hidden">
                {previewUrl ? (
                  <img src={previewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl text-blue-500">+</span>
                )}
                <input
                  id="profilePic"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <label htmlFor="profilePic" className="text-blue-600 font-medium cursor-pointer">Upload Profile Picture</label>
            </div>


            <Input
              label="Full Name"
              type="text"
              value={Fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Enter Full Name"
            />
            <Input
              label="Last four digits of SSN"
              type="tel"
              value={Ssnnumber}
              onChange={(e) => setSsnnumber(e.target.value)}
              placeholder="xxx"
            />

            {/* Government ID Upload Front */}
            <label htmlFor="idFront" className="border-2 border-dashed bg-white border-blue-500 rounded-lg p-10 text-center cursor-pointer block">
              <div className="text-gray-700 font-medium mb-2">Upload “Government ID Front”</div>
              <div className="text-gray-400 text-xs mb-1">Upto 20MB JPG, PNG</div>
              <input
                id="idFront"
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => setIdFront(e.target.files[0])}
                className="hidden"
              />
              {idFront && <p className="text-xs text-green-600 mt-2">{idFront.name}</p>}
            </label>

            <label htmlFor="idBack" className="border-2 border-dashed bg-white border-blue-500 rounded-lg p-10 text-center cursor-pointer block">
              <div className="text-gray-700 font-medium mb-2">Upload “Government ID Back”</div>
              <div className="text-gray-400 text-xs mb-1">Upto 20MB JPG, PNG</div>
              <input
                id="idBack"
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => setIdBack(e.target.files[0])}
                className="hidden"
              />
              {idBack && <p className="text-xs text-green-600 mt-2">{idBack.name}</p>}
            </label>

            <button
              type="submit"
              className="block w-full px-4 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full font-semibold text-center hover:opacity-90 transition"
            >
              <span>Next</span>
            </button>
          </form>
        </div>
      </div>

      {/* Right Section - Background Image */}
      <div className="hidden lg:block lg:w-1/2 h-screen">
        <img
          src={logoback}
          alt="Background"
          className="w-full h-[56em] object-cover rounded-bl-[4em] rounded-tl-[2em]"
        />
      </div>
    </div>
  );
}
