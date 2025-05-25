import { useState } from "react";
import { FaMagic, FaRedo } from "react-icons/fa"; // Ikon untuk tombol
import { Document, Page, Text, StyleSheet, pdf } from "@react-pdf/renderer"; // Mengimpor dari react-pdf
import axios from "axios"; // Untuk membuat request API

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
  },
});

const Summarizer = ({
  inputText,
  setInputText,
  summary,
  setSummary,
  handleReset,
  loading,
  setLoading, // Terima setLoading dari App.jsx
  history,
  setHistory, // Terima setHistory dari App.jsx
}) => {
  const [model, setModel] = useState("deepseek/deepseek-chat-v3-0324:free"); // Pilihan model AI
  const [summaryLength, setSummaryLength] = useState("medium"); // Panjang ringkasan

  // Fungsi untuk mengunduh hasil ringkasan sebagai PDF
  const handleExportPDF = async () => {
    if (!summary.trim()) {
      console.error("Tidak ada ringkasan yang dapat diekspor.");
      return; // Jangan lanjutkan jika ringkasan kosong
    }

    const doc = (
      <Document>
        <Page style={styles.page}>
          <Text style={styles.header}>Ringkasan Teks</Text>
          <Text style={styles.text}>{summary}</Text> {/* Pastikan ringkasan ditampilkan di sini */}
        </Page>
      </Document>
    );

    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ringkasan.pdf"; // Nama file PDF yang akan diunduh
    a.click();
  };

  // Fungsi untuk merangkum teks dengan pilihan model dan panjang
  const handleSummarizeWithOptions = async () => {
    if (inputText.trim() === "") {
      console.error("Teks input kosong!"); // Log jika input kosong
      return; // Hentikan jika input kosong
    }

    setSummary(""); // Reset hasil ringkasan
    setLoading(true); // Aktifkan status loading

    try {
      // Membuat request POST ke API untuk mendapatkan ringkasan
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: model, // Menggunakan model yang dipilih
          messages: [
            {
              role: "user",
              content: `Summarize the following text in a ${summaryLength} length summary: \n\n${inputText}`,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`, // Pastikan API key benar
          },
        }
      );

      console.log("API Response:", response); // Log response dari API untuk debugging

      // Menyimpan hasil ringkasan jika API berhasil memberikan data
      if (response.data && response.data.choices && response.data.choices[0]) {
        const newSummary = response.data.choices[0].message.content;
        setSummary(newSummary); // Menampilkan ringkasan

        // Menyimpan ringkasan ke riwayat
        const newHistory = [...history, newSummary];
        setHistory(newHistory);
        localStorage.setItem("summaryHistory", JSON.stringify(newHistory)); // Simpan riwayat ke localStorage
      } else {
        console.error("API tidak mengembalikan data yang diharapkan.");
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
    } finally {
      setLoading(false); // Matikan status loading setelah proses selesai
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg mt-6 ${loading ? "bg-gray-200" : ""} summarizer-container`}>
      <p className="text-lg mb-4">Masukkan teks untuk diringkas:</p>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)} // Update teks saat input berubah
        className="w-full p-4 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4 textarea"
        rows="6"
        placeholder="Masukkan teks di sini"
      ></textarea>

      {/* Pilihan Panjang Ringkasan */}
      <select
        className="p-2 border-2 border-blue-300 rounded-lg mb-4"
        onChange={(e) => setSummaryLength(e.target.value)}
      >
        <option value="long">Panjang</option>
        <option value="medium">Sedang</option>
        <option value="short">Pendek</option>
      </select>

      {/* Pilihan Model AI */}
      <select
        className="p-2 border-2 border-blue-300 rounded-lg mb-4"
        onChange={(e) => setModel(e.target.value)} // Pilih model AI dari dropdown
      >
        <option value="deepseek/deepseek-chat-v3-0324:free">DeepSeek V3</option>
        <option value="meta-llama/llama-3.3-70b-instruct:free">Llama 3.3 70B (Meta)</option>
        <option value="google/gemini-2.0-flash-exp:free">Gemini Flash 2.0 (Google)</option>
      </select>

      <div className="flex gap-4 justify-center mt-4">
        {/* Tombol Ringkas */}
        <button
          onClick={handleSummarizeWithOptions} // Panggil fungsi ringkas
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center gap-2"
        >
          <FaMagic /> Ringkas
        </button>

        {/* Tombol Reset */}
        <button
          onClick={handleReset} // Panggil fungsi reset
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition flex items-center gap-2"
        >
          <FaRedo /> Reset
        </button>

        {/* Tombol Export ke PDF */}
        <button
          onClick={handleExportPDF} // Panggil fungsi untuk ekspor ke PDF
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition flex items-center gap-2"
        >
          Export PDF
        </button>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="spinner"></div>
            <span className="ml-3">Memproses ringkasan...</span>
          </div>
        ) : (
          <p>{summary || "Hasil ringkasan teks akan muncul di sini setelah proses ringkasan selesai."}</p>
        )}
      </div>
    </div>
  );
};

export default Summarizer;