import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserRepos from "./pages/UserRepos";
import { useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const [mode, setMode] = useState("light");
  const [userData, setUserData] = useState(null);

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
      }),
    [mode]
  );

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              mode={mode}
              toggleTheme={toggleTheme}
              userData={userData}
              setUserData={setUserData}
            />
          }
        />
        <Route
          path="/user/:username"
          element={<UserRepos mode={mode} userData={userData} />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
