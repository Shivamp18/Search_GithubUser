import { useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import UserDetails from "../components/UserDetails";
import ErrorMessage from "../components/ErrorMessage";
import DarkMode from "../components/ToggleDarkMode";

function HomePage({ mode, toggleTheme,  userData, setUserData }) {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode},
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
      <div className={`min-h-screen flex flex-col items-center py-10 transition-colors duration-300 ${
        mode === "dark" ? "#ffffff" : "#000000"
      }`}>
        <h1
          className={`font-bold text-5xl py-12 mt-4 ${
           mode === "dark" ? "#ffffff" : "#000000"
          }`}
        >
          Search Github User
        </h1>

        <DarkMode mode={mode}  toggleTheme={toggleTheme}  />

        <form className="flex gap-0.5" onSubmit={fetchUserData}>
          <input
            type="text"
            value={userName}
            placeholder="Enter Github username"
            onChange={(event) => {
              setUserName(event.target.value);
              setError("");
            }}
            className={`border border-gray-300 rounded-l px-4 py-2 ${
           mode === "dark" ? "#ffffff" : "#000000"
          }`}
          />
          <button
            className="border border-gray-300 px-4 py-2 bg-green-300 rounded-r cursor-pointer font-semibold"
            type="submit"
          >
            Search
          </button>
        </form>

        <ErrorMessage message={error} />
        {userData && <UserDetails userData={userData} />}
      </div>
    </ThemeProvider>
  );
}

export default HomePage;
