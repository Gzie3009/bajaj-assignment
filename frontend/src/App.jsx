import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [inputData, setInputData] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [error, setError] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  // Handle filter selection
  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedFilters([...selectedFilters, value]);
    } else {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== value));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate JSON input
    try {
      const parsedData = JSON.parse(inputData);
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error("Invalid input. 'data' must be an array.");
      }
    } catch (err) {
      setError("Invalid JSON input. Please check your input.");
      toast.error("Invalid JSON input. Please check your input."); // Show error toast
      return;
    }

    // Call the backend API
    try {
      const apiResponse = await fetch("http://localhost:3000/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: inputData,
      });

      if (!apiResponse.ok) {
        throw new Error("Failed to fetch data from the API.");
      }

      const data = await apiResponse.json();
      setResponse(data);
      setError("");
      toast.success("Data processed successfully!"); // Show success toast
    } catch (err) {
      setError("An error occurred while processing the request.");
      toast.error("An error occurred while processing the request."); // Show error toast
    }
  };

  // Render filtered response
  const renderFilteredResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_alphabet } = response;

    return (
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        {selectedFilters.includes("numbers") && (
          <p className="mb-2">
            <strong>Numbers:</strong> {numbers.join(", ")}
          </p>
        )}
        {selectedFilters.includes("alphabets") && (
          <p className="mb-2">
            <strong>Alphabets:</strong> {alphabets.join(", ")}
          </p>
        )}
        {selectedFilters.includes("highest_alphabet") && (
          <p className="mb-2">
            <strong>Highest Alphabet:</strong> {highest_alphabet.join(", ")}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer /> {/* Add ToastContainer here */}
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">
          22bcs10998
        </h1>{" "}
        {/* Replace with your roll number */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="json-input"
              className="block text-sm font-medium text-gray-700"
            >
              Enter JSON Data:
            </label>
            <textarea
              id="json-input"
              value={inputData}
              onChange={handleInputChange}
              placeholder='Example: { "data": ["M", "1", "334", "4", "B"] }'
              rows={5}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Submit
          </button>
        </form>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        {response && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Filters</h3>
            <div className="mt-2 space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="numbers"
                  onChange={handleFilterChange}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Numbers</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="alphabets"
                  onChange={handleFilterChange}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Alphabets</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="highest_alphabet"
                  onChange={handleFilterChange}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Highest Alphabet
                </span>
              </label>
            </div>
          </div>
        )}
        {response && renderFilteredResponse()}
      </div>
    </div>
  );
}

export default App;
