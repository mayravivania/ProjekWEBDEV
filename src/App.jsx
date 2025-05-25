import { useState, useEffect } from "react";  // Tambahkan useEffect
import Header from "./components/Header";
import Summarizer from "./components/Summarizer";
import History from "./components/History";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);  // Tambahkan state loading
  const [theme, setTheme] = useState("light"); // Menambahkan state untuk tema

  // Mengambil riwayat ringkasan dari localStorage saat pertama kali aplikasi dimuat
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("summaryHistory")) || [];
    setHistory(storedHistory);

    // Mengecek tema yang tersimpan di localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Jika tidak ada tema yang tersimpan, gunakan tema default
      setTheme("light");
    }
  }, []);  // Hanya jalankan saat pertama kali aplikasi dimuat

  // Fungsi untuk mengganti tema (dark mode / light mode)
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);  // Simpan pilihan tema di localStorage
  };

  const handleDelete = (index) => {
    const newHistory = history.filter((_, i) => i !== index);
    setHistory(newHistory);
    localStorage.setItem("summaryHistory", JSON.stringify(newHistory));
  };

  const handleReset = () => {
    setInputText("");
    setSummary("");
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-blue-900 text-white" : "bg-gradient-to-b from-blue-400 to-blue-600 text-white"} font-sans`}>
      <Header title="AI Summarizer" />
      <div className="max-w-3xl mx-auto p-4">
        <button 
          onClick={toggleTheme} 
          className="absolute top-4 right-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
        <Summarizer
          inputText={inputText}
          setInputText={setInputText}
          summary={summary}
          setSummary={setSummary}
          handleReset={handleReset}
          loading={loading}  // Kirimkan loading ke Summarizer
          setLoading={setLoading}  // Kirimkan setLoading ke Summarizer
          history={history}
          setHistory={setHistory}  // Kirimkan setHistory ke Summarizer
        />
        <History history={history} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default App;