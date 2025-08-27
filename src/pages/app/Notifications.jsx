// import moment from "moment";
import { Fragment, useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import moment from "moment";
import axios from "../../axios";
import { ErrorToast } from "../../components/global/Toaster";

const Notifications = () => {
  const { notification, isLoading, setUpdate } = useContext(AppContext);

  const convertText = (string = "") => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const [selectTab, setSelectTab] = useState("all");
  const handleSelect = (val) => {
    setSelectTab(val);
  };

  const [unReadLoadingId, setUnReadLoadingId] = useState(null);

  const filteredTasks = notification?.filter((item) => {
    if (selectTab === "all") return true;
    if (selectTab === "read") {
      return item.isRead === true;
    }
    if (selectTab === "unread") {
      return item.isRead === false;
    }
    return true;
  });

  const handleMarkAsRead = async (id) => {
    try {
      setUnReadLoadingId(id);
      const response = await axios.post("/notification/read", {
        notificationId: id,
      });
      if (response.status === 200) {
        setUpdate((prev) => !prev);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setUnReadLoadingId(null);
    }
  };

  return (
    <Fragment>
      <div className="max-w-[1260px] mx-auto px-6 ">
        <h1 className="text-[24px] font-semibold py-4">Notifications</h1>
        <div className="rounded-lg shadow-customShadow bg-white p-8">
          {/* <div className="h-14 w-full flex justify-between items-center">
            <div className="w-[90%] h-full border-b-2 border-gray-100">
              <div className="flex justify-start items-center h-full gap-4">
                <button
                  onClick={() => handleSelect("all")}
                  className={` ${
                    selectTab === "all"
                      ? "text-primary-color font-bold"
                      : "text-gray-500"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => handleSelect("read")}
                  className={` ${
                    selectTab === "read"
                      ? "text-primary-color font-bold"
                      : "text-gray-500"
                  } `}
                >
                  Read
                </button>
                <button
                  onClick={() => handleSelect("unread")}
                  className={` ${
                    selectTab === "unread"
                      ? "text-primary-color font-bold"
                      : "text-gray-500"
                  } `}
                >
                  Unread
                </button>
              </div>
            </div> */}

          {/* <div className="w-[10%]"> */}
          {/* <button className="bg-primary-color text-white text-xs px-4 py-1 rounded-lg h-8 w-24 font-medium">
            Clear All
          </button> */}
          {/* </div> */}
          {/* </div> */}

          {isLoading ? (
            <div className="mt-4 h-[430px] overflow-y-auto">
              {Array(4)
                .fill()
                .map((_, index) => (
                  <div key={index}>
                    <div className="flex items-center w-[85%] py-3 border-gray-100">
                      <div className="bg-white flex p-2 max-w-[95%]">
                        <div className="py-3 px-2">
                          <div className="w-[100px] h-[20px] bg-gray-200 rounded animate-pulse mb-2"></div>
                          <div className="w-[180px] h-[20px] bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                      <div className="w-[7%] flex flex-col items-center">
                        <div className="w-[50px] h-[10px] bg-gray-200 rounded animate-pulse mb-2"></div>
                      </div>
                    </div>
                    <hr className="h-px my-2 ml-20 w-[90%] bg-gray-100 border" />
                  </div>
                ))}
            </div>
          ) : (
            <div>
              {filteredTasks?.length > 0 ? (
                <div className=" h-[430px] overflow-y-auto ">
                  {filteredTasks?.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center w-[95%]  border-gray-100">
                        <div className="bg-white flex p-2 min-w-[84%] max-w-[90%]">
                          {/* <div className="py-3 px-2 mt-1">
                  <img
                    src={task.image}
                    alt="profile"
                    className="w-[55px] h-[55px] rounded-full mx-2"
                  />
                </div> */}

                          <div className="py-3 px-2">
                            <h1 className="text-[16px] font-bold">
                              {convertText(item?.title)}
                            </h1>
                            <p className="text-[16px] text-primary-text ">
                              {item?.description}
                            </p>
                          </div>
                        </div>

                        <div className="w-[20%] flex flex-col items-center">
                          <p className="text-xs mb-2">
                            {moment(item?.createdAt).format(
                              "MM-DD-YYYY - h:mm:ss A"
                            )}
                          </p>
                          {/* {unReadLoadingId === item._id ? (
                        <p className="text-xs text-gray-500">Loading...</p>
                      ) : (
                        <span className="flex items-center pt-1">
                          <p className="text-green-600 pr-1">Mark As Read</p>
                          <input
                            type="checkbox"
                            className="w-5 h-5 accent-[#62466b] rounded cursor-pointer"
                            onChange={() => handleMarkAsRead(item?._id)}
                          />
                        </span>
                      )} */}
                        </div>
                      </div>
                      <hr className="h-px my-2 ml-2 w-[90%] bg-gray-100 border" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-[430px]">No record found</div>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Notifications;
