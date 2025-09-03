import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from "../../../axios";

const NotificationSettings = () => {
  const [notification, setNotification] = useState(false); // checkbox state
  const [notificationPopup, setNotificationPopup] = useState(false); // success popup
  const [loading, setLoading] = useState(false); // button loading
  const [initialLoading, setInitialLoading] = useState(true); // initial GET request

  // ✅ Fetch current notification settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('/settings');
        if (res.data?.success && res.data.data) {
          setNotification(res.data.data.notification);
        }
      } catch (error) {
        console.error("Failed to fetch notification settings", error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // ✅ Handle toggle submit
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/settings', {
        notification: notification,
      });

      if (res.status === 200 || res.data?.success) {
        setNotificationPopup(true);
      }
    } catch (error) {
      console.error('Failed to update notification setting', error);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <div className="p-6">Loading settings...</div>;

  return (
    <>
      <div className="p-6">
        <h3 className="text-2xl font-[600] mb-6">Notification Settings</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between bg-[#F9FAFA] px-4 py-3 rounded-lg shadow-sm">
            <span className="text-sm font-medium">Enable Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notification}
                onChange={() => setNotification(!notification)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500" />
            </label>
          </div>
        </div>

        <div className="mt-[10em] flex justify-center">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white px-[10em] py-3 rounded-full font-medium shadow hover:from-blue-600 hover:to-blue-800 transition disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>

      {notificationPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
            <button
              onClick={() => setNotificationPopup(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={18} />
            </button>

            <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white p-6 w-fit mx-auto rounded-full mb-3">
              <FaCheck size={24} />
            </div>

            <h2 className="font-semibold text-2xl mb-1">Notification Updated</h2>
            <p className="text-sm text-gray-600">
              Your notification settings have been updated successfully.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationSettings;
