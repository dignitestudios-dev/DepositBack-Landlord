import React, { useContext, useState } from 'react';
import { FaCheck, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import Input from '../../global/Input';
import axios from "../../../axios";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router'; // Step 1
import { AppContext } from '../../../context/AppContext';


const DeleteAccount = () => {
  const { logoutContext } = useContext(AppContext);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [accountDeleted, setAccountDeleted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Step 2


 const handleDelete = async (e) => {
    e.preventDefault();

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const res = await axios.post('/auth/delete', {
        password: password,
      });

      if (res.data?.success) {
        setAccountDeleted(true);
        setPassword('');

        Cookies.remove("token");
        Cookies.remove("user");        // User info if stored
        localStorage.clear();
        sessionStorage.clear();

        // Optional delay to let modal show before redirect
        setTimeout(() => {
          logoutContext();
        }, 1000);
      } else {
        setError(res.data?.message || 'Something went wrong.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete account. Try again.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <div className="p-6">
        <h3 className="text-2xl font-[600] mb-6">Delete Account</h3>
        <p className="-mt-4 mb-10 text-red-600">
          Warning: This action is permanent and cannot be undone.
        </p>

        <form onSubmit={handleDelete} className="space-y-6 max-w-md mx-auto">
          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

          <div className="relative">
            <Input
              label="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              type={showPassword ? 'text' : 'password'}
              className="bg-[#F3F8FF]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-10 pt-1 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition disabled:opacity-60 w-full"
          >
            {loading ? 'Deleting...' : 'Delete Account'}
          </button>
        </form>
      </div>

      {/* ✅ Success Popup */}
      {accountDeleted && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
            <button
              onClick={() => setAccountDeleted(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={18} />
            </button>

            <div className="bg-red-600 text-white p-6 w-fit mx-auto rounded-full mb-3">
              <FaCheck size={24} />
            </div>

            <h2 className="font-semibold text-2xl mb-1">Account Deleted!</h2>
            <p className="text-sm text-gray-600">
              Your account has been successfully deleted.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteAccount;
