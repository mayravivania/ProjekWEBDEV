 import { useState, useEffect } from "react"; 
import Header from "./components/Header"; 
import Summarizer from "./components/Summarizer"; 
import History from "./components/History"; 
const App = () => { 
const [inputText, setInputText] = useState(""); 
const [summary, setSummary] = useState(""); 
const [history, setHistory] = useState([]); 
// Ambil riwayat dari localStorage saat komponen pertama kali dimuat 
  useEffect(() => { 
const storedHistory = 
JSON.parse(localStorage.getItem("summaryHistory")) || []; 
    setHistory(storedHistory); 
  }, []); 
const handleSummarize = () => { 
if (inputText.trim() === "") return; 
// Simulasi ringkasan: output sama dengan input 
    setSummary(inputText); 
     const newHistory = [...history, inputText]; 
    setHistory(newHistory); 
    localStorage.setItem("summaryHistory", JSON.stringify(newHistory)); 
  }; 
const handleReset = () => { 
    setInputText(""); 
    setSummary(""); 
  }; 
const handleDelete = (index) => { 
const newHistory = history.filter((_, i) => i !== index); 
    setHistory(newHistory); 
    localStorage.setItem("summaryHistory", JSON.stringify(newHistory)); 
  }; 
return ( 
<div className="bg-gray-100 font-sans min-h-screen"> 
<Header title="AI Summarizer" /> 
<main className="max-w-3xl mx-auto p-4"> 
<Summarizer 
inputText={inputText} 
setInputText={setInputText} 
summary={summary} 
handleSummarize={handleSummarize} 
handleReset={handleReset} 
        /> 
<History history={history} handleDelete={handleDelete} /> 
</main> 
</div> 
  ); 
}; 
export default App; 