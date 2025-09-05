import { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router";
import logoback from "../../assets/backloginimage.webp";
import Input from "../../components/global/Input";
import { fileReducer, formatFullName, formatSsnLast } from "../../lib/helpers";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import axios from "../../axios";
import SubmitButton from "../../components/global/SubmitButton";
import { AppContext } from "../../context/AppContext";
import { personalInfoValues } from "../../init/authValues";

export default function Addpersonalinfo() {
  const [loading, setLoading] = useState(false);
  const { loginContext } = useContext(AppContext);

  const [Fullname, setFullname] = useState("");
  const [Ssnnumber, setSsnnumber] = useState("");
  const [errors, setErrors] = useState({
    fullname: "",
    ssn: "",
    idFront: "",
    idBack: "",
    profileImage: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      fullname: !Fullname.trim() ? "Full name is required" : "",
      ssn: !Ssnnumber.trim()
        ? "SSN is required"
        : Ssnnumber.trim().length !== 4
        ? "SSN must be exactly 4 digits"
        : "",
      idFront: !files.idFront ? "Front ID is required" : "",
      idBack: !files.idBack ? "Back ID is required" : "",
      profileImage: !files.profileImage ? "Profile image is required" : "",
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) return;

    let formData = new FormData();

    formData.append("name", Fullname);
    formData.append("lastFourSSN", Ssnnumber);

    if (files.idFront) {
      formData.append("governmentIdFront", files.idFront);
    }
    if (files.idBack) {
      formData.append("governmentIdBack", files.idBack);
    }
    if (files.profileImage) {
      formData.append("profilePicture", files.profileImage);
    }

    setLoading(true);

    try {
      const response = await axios.post("/users/complete", formData);

      if (response.status === 200) {
        let data = response?.data?.data;

        loginContext(data);
        SuccessToast("Account created successfully");
        navigate("/onboarding/subscription-plans");
      }
    } catch (error) {
      console.log("🚀 ~ Signup ~ error:", error);
      ErrorToast(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const [files, dispatch] = useReducer(fileReducer, personalInfoValues);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);

    if (field === "profileImage") {
      dispatch({ type: "SET_PROFILE", file, preview });
      setErrors((prev) => ({ ...prev, profileImage: "" }));
    } else if (field === "idFront") {
      dispatch({ type: "SET_FRONT", file, preview });
      setErrors((prev) => ({ ...prev, idFront: "" }));
    } else if (field === "idBack") {
      dispatch({ type: "SET_BACK", file, preview });
      setErrors((prev) => ({ ...prev, idBack: "" }));
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f4f8ff] overflow-hidden">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-start p-0 lg:p-12">
        <div className="w-full max-w-md pt-[1.5em]">
          <div className="text-left mb-6">
            {/* <button type="button" onClick={() => navigate(-1)}>
              <FaArrowLeft size={25} />
            </button> */}
            <h2 className="text-[34px] mt-2 font-[600] leading-[48px] tracking-normal capitalize pt-[20px]">
              Add Personal Information
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-4">
              <label
                htmlFor="profilePic"
                className="w-16 h-16 rounded-full border-2 border-dashed border-blue-500 flex items-center justify-center cursor-pointer overflow-hidden"
              >
                {files.profilePreview ? (
                  <img
                    src={files.profilePreview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl text-blue-500">+</span>
                )}
                <input
                  id="profilePic"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => handleFileChange(e, "profileImage")}
                  className="hidden"
                />
              </label>
              <label
                htmlFor="profilePic"
                className="text-blue-600 font-medium cursor-pointer"
              >
                Upload Profile Picture
              </label>
            </div>
            {errors.profileImage && (
              <p className="text-red-500 text-xs">{errors.profileImage}</p>
            )}
            <Input
              label="Full Name"
              type="text"
              value={Fullname}
              onChange={(e) => setFullname(formatFullName(e.target.value))}
              placeholder="Enter Full Name"
            />
            {errors.fullname && (
              <p className="text-red-500 text-xs">{errors.fullname}</p>
            )}
            <Input
              label="Last four digits of SSN"
              type="tel"
              value={Ssnnumber}
              onChange={(e) =>
                setSsnnumber(formatSsnLast(e.target.value, setErrors))
              }
              placeholder="xxxx"
            />
            {errors.ssn && <p className="text-red-500 text-xs">{errors.ssn}</p>}

            {/* Government ID Upload Front */}
            <label
              htmlFor="idFront"
              className={`border-2 border-dashed bg-white border-blue-500 rounded-lg ${
                files.idFrontPreview ? "p-0" : "p-10"
              } text-center cursor-pointer block`}
            >
              {files.idFrontPreview ? (
                <img
                  src={files.idFrontPreview}
                  alt="Profile Preview"
                  className="w-full h-[120px] object-cover"
                />
              ) : (
                <>
                  <div className="text-gray-700 font-medium mb-2">
                    Upload “Government ID Front”
                  </div>
                  <div className="text-gray-400 text-xs mb-1">
                    Upto 20MB JPG, PNG
                  </div>
                </>
              )}
              <input
                id="idFront"
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => handleFileChange(e, "idFront")}
                className="hidden"
              />
            </label>
            {errors.idFront && (
              <p className="text-red-500 text-xs">{errors.idFront}</p>
            )}

            <label
              htmlFor="idBack"
              className={`border-2 border-dashed bg-white border-blue-500 rounded-lg ${
                files.idBackPreview ? "p-0" : "p-10"
              } text-center cursor-pointer block`}
            >
              {files.idBackPreview ? (
                <img
                  src={files.idBackPreview}
                  alt="Profile Preview"
                  className="w-full h-[120px] object-cover"
                />
              ) : (
                <>
                  <div className="text-gray-700 font-medium mb-2">
                    Upload “Government ID Front”
                  </div>
                  <div className="text-gray-400 text-xs mb-1">
                    Upto 20MB JPG, PNG
                  </div>
                </>
              )}

              <input
                id="idBack"
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => handleFileChange(e, "idBack")}
                className="hidden"
              />
            </label>
            {errors.idBack && (
              <p className="text-red-500 text-xs">{errors.idBack}</p>
            )}

            {/* <button
              type="submit"
              className="block w-full px-4 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full font-semibold text-center hover:opacity-90 transition"
            >
              <span>Next</span>
            </button> */}
            <SubmitButton text="Next" loading={loading} type="submit" />
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
