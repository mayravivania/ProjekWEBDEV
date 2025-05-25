import { FaTrashAlt } from "react-icons/fa"; // Mengimpor ikon untuk delete

const History = ({ history, handleDelete }) => {
  return (
    <section className="mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Riwayat Ringkasan</h2>
      {history.length === 0 ? (
        <p className="text-gray-700">Tidak ada riwayat ringkasan.</p>
      ) : (
        <ul className="list-disc list-inside text-gray-700">
          {history.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-purple-50 p-3 rounded-lg hover:bg-purple-100 transition"
            >
              <span>{item}</span>
              <button
                onClick={() => handleDelete(index)}
                className="ml-4 px-3 py-1 bg-red-400 text-white rounded hover:bg-red-500 transition flex items-center gap-2"
              >
                <FaTrashAlt /> Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default History;