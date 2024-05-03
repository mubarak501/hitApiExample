import "./styles.css";
import React, { useState } from "react";

export default function App() {
  const [countryName, setCountryName] = useState("");
  const [flagUrl, setFlagUrl] = useState(""); // Initialize as string
  const [errorMessage, setErrorMessage] = useState("");

  const xhoqFlag = () => {
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const flagUrl = data[0].flags.svg;
          setFlagUrl(flagUrl); // Set flagUrl as string
        } else {
          setFlagUrl(""); // Reset flagUrl to empty string
          setErrorMessage("This country is not available at this time.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("Error fetching data!");
      });
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      xhoqFlag();
    }
  };
  return (
    <div>
      <div className="searchBar">
        <input
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={xhoqFlag} style={{ margin: "10px" }}>
          Search
        </button>
      </div>
      <div className="imageContainer">
        {flagUrl ? ( // If flagUrl is not empty
          <img className="image" src={flagUrl} alt="Flag" />
        ) : (
          <p>This country is not available at this time.</p>
        )}
      </div>
    </div>
  );
}
