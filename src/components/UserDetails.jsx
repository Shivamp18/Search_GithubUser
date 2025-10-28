import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function UserDetails({ mode, userData }) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/user/${userData.login}`);
  };

  if (!userData) return null;

  return (
    <div
      className={`flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between rounded-2xl p-6 md:p-10 my-10 mx-auto max-w-3xl w-[95%] transition-colors duration-300 border-2 ${
        mode === "dark"
          ? "bg-gray-800 border-white text-white"
          : "bg-white border-gray-300 text-gray-900"
      }`}
    >
      <img
        src={userData.avatar_url}
        alt="Avatar"
        className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full border border-gray-400 object-cover mb-6 md:mb-0"
      />

      <div className="flex-1 text-center md:text-left px-2 md:px-6">
        <h2
          className={`font-bold text-xl sm:text-2xl md:text-3xl mb-3 ${
            mode === "dark" ? "text-white" : "text-black"
          }`}
        >
          {userData.name || "No name available"}
        </h2>

        <div className="flex flex-col md:flex-row md:gap-10 justify-center md:justify-start mb-3">
          <p>
            <span
              className={`text-base font-semibold ${
                mode === "dark" ? "text-blue-200" : "text-blue-700"
              }`}
            >
              Followers:
            </span>{" "}
            <span
              className={`font-bold text-base ${
                mode === "dark" ? "text-blue-200" : "text-blue-700"
              }`}
            >
              {userData.followers}
            </span>
          </p>

          <p>
            <span
              className={`text-base font-semibold ${
                mode === "dark" ? "text-red-200" : "text-red-700"
              }`}
            >
              Following:
            </span>{" "}
            <span
              className={`font-bold text-base ${
                mode === "dark" ? "text-red-200" : "text-red-700"
              }`}
            >
              {userData.following}
            </span>
          </p>
        </div>

        <p
          className={`text-sm sm:text-base md:text-lg font-medium ${
            mode === "dark" ? "text-green-100" : "text-green-700"
          }`}
        >
          {userData.bio || "No bio available"}
        </p>
      </div>

      <div className="mt-4 md:mt-0 flex justify-center md:justify-end w-full md:w-auto">
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 text-sm sm:text-base transition-all duration-200"
        >
          <FaEye className="text-sm sm:text-lg" /> Repositories
        </button>
      </div>
    </div>
  );
}

export default UserDetails;
