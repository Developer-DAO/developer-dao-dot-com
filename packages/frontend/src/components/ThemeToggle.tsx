import { Moon, Sun } from "react-feather";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="absolute top-0 right-0 mt-3 mr-3 mr-2 mb-2 rounded-full bg-black px-5 py-2.5 dark:bg-white"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <Moon size={24} color="white" />
      ) : (
        <Sun size={24} color="black" />
      )}
    </button>
  );
};

export default ThemeToggle;
