import { useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import UserDetails from "../components/UserDetails";
import ErrorMessage from "../components/ErrorMessage";
import DarkMode from "../components/ToggleDarkMode";

function HomePage({ mode, toggleTheme, userData, setUserData }) {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
      }),
    [mode]
  );

  const fetchUserData = async (event) => {
    try {
      event.preventDefault();
      setError("");
      const response = await fetch(`https://api.github.com/users/${userName}`);
      const data = await response.json();
     if (data.message === "Not Found") {
        setError("User not found");
        setUserData(null);
      } else {
        setUserData(data);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className={`min-h-screen flex flex-col items-center px-4 sm:px-6 md:px-12 lg:px-20 py-8 transition-colors duration-300 ${
          mode === "dark" ? "text-white bg-gray-900" : "text-black bg-gray-50"
        }`}
      >
        {/* Header */}
        <h1
          className={`font-bold text-3xl sm:text-4xl md:text-5xl py-8 sm:py-12 text-center ${
            mode === "dark" ? "text-white" : "text-black"
          }`}
        >
          Search GitHub User
        </h1>

        <div className="mb-6">
          <DarkMode mode={mode} toggleTheme={toggleTheme} />
        </div>

        <form
          className="flex flex-row items-center gap-2 sm:gap-0 mb-6 w-full max-w-lg"
          onSubmit={fetchUserData}
        >
          <input
            type="text"
            value={userName}
            placeholder="Enter GitHub username"
            onChange={(event) => {
              setUserName(event.target.value);
              setError("");
            }}
            className={`border-2 border-gray-300 w-full sm:w-auto flex-1 rounded-lg-l sm:rounded-l px-4 py-2 ${
              mode === "dark"
                ? "text-white placeholder-gray-200 bg-gray-800 border-gray-200 focus:ring-gray-400"
                : "text-black placeholder-gray-500 bg-white border-gray-300 focus:ring-gray-400"
            }`}
          />
          <button
            className="border-2 border-gray-300 sm:w-auto px-6 py-2 cursor-pointer bg-green-400 hover:bg-green-500 text-black font-semibold rounded-lg-r sm:rounded-r transition-all duration-200"
            type="submit"
          >
            Search
          </button>
        </form>

        <div className="w-full max-w-lg">
          <ErrorMessage message={error} />
        </div>

        <div className="w-full max-w-5xl mt-8">
          {userData && <UserDetails userData={userData} mode={mode} />}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default HomePage;
