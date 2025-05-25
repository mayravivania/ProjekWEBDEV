 const Summarizer = ({ 
  inputText, 
  setInputText, 
  summary, 
  handleSummarize, 
  handleReset, 
}) => { 
return ( 
<> 
<p className="mb-4 text-lg">Masukkan teks untuk diringkas:</p> 
<div className="flex flex-col sm:flex-row gap-4"> 
<textarea 
value={inputText} 
onChange={(e) => setInputText(e.target.value)} 
          className="w-full p-3 border border-gray-300 rounded-lg 
focus:outline-none focus:ring-2 focus:ring-blue-500" 
          rows="5" 
          placeholder="Masukkan teks di sini" 
        ></textarea> 
<div className="flex flex-col gap-2"> 
<button 
onClick={handleSummarize} 
className="px-6 py-2 bg-blue-600 text-white rounded hover:bg
blue-700 transition" 
          > 
            Ringkas 
</button> 
<button 
onClick={handleReset} 
className="px-6 py-2 bg-red-500 text-white rounded hover:bg
red-600 transition" 
          > 
            Reset 
</button> 
</div> 
</div> 
<section className="mt-8 bg-white p-4 rounded shadow"> 
<h2 className="text-xl font-semibold mb-2">Hasil Ringkasan</h2> 
<p className="text-gray-700"> 
          {summary || 
            "Hasil ringkasan teks akan muncul di sini setelah proses ringkasan selesai."} 
</p> 
</section> 
</> 
  ); 
}; 
export default Summarizer; 