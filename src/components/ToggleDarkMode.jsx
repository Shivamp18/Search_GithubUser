import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

function DarkMode({ mode, toggleTheme }) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={mode === "dark"}
          onChange={toggleTheme}
          color="primary"
        />
      }
      label={mode === "light" ? "Light Mode" : "Dark Mode"}
    />
  );
}

export default DarkMode;
