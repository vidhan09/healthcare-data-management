import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [patientId, setPatientId] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const API_BASE_URL = "http://127.0.0.1:5000"; // Replace with your backend URL
  const [error, setError] = useState(null);


  // Function to fetch patient details
 
  const fetchPatientDetails = async () => {
    // Check if patientId is valid
    if (!patientId.trim()) {
      setError('Please enter a valid Patient ID');
      return;
    }
    setError(null); // Clear previous errors

    try {
      const response = await axios.get(`${API_BASE_URL}/data/${patientId}`);
      console.log(response.data); // Log the entire response for debugging
      if (response.data) {
        setPatientData(response.data); // Directly set the data since it matches the API response
      } else {
        alert("Patient data not found or invalid response format");
      }
    } catch (error) {
      console.error("Error fetching patient details:", error);
      alert(
        "Error fetching patient details: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  // Function to upload a document
  const uploadDocument = async () => {
    if (!file || !patientId) {
      alert("Please select a file and enter a valid patient ID.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("patient_id", patientId);

    try {
      const response = await axios.post(`${API_BASE_URL}/patient/document`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadMessage(response.data.message);
    } catch (error) {
      alert("Error uploading document: " + error.response.data.message);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
  <img
    src="https://upload.wikimedia.org/wikipedia/en/4/4c/Official_Logo_of_IIT%28BHU%29%2CVaranasi%2CIndia%2C2013.png"
    alt="IIT BHU Logo"
    className="logo"
  />
  <h1 className="header-title">IIT BHU Healthcare Management System</h1>
</header>


      <div className="container">
        {/* Fetch Patient Details */}
        <div className="section">
          <h2>View Patient Details</h2>
          <input
            type="text"
            placeholder="Enter Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="input-field"
          />
          <button onClick={fetchPatientDetails} className="button">
            Get Details
          </button>
          {patientData && (
            <div className="patient-info">
              <h3>Patient Information:</h3>
              <p><b>Name:</b> {patientData.Name}</p>
      <p><b>Age:</b> {patientData.Age}</p>
    <p><b>Medical Condition:</b> {patientData.MedicalCondition}</p>
    <p><b>Admission Type:</b> {patientData.AdmissionType}</p>
    <p><b>Billing Amount:</b> ${patientData.BillingAmount.toFixed(2)}</p>
    <p><b>Blood Type:</b> {patientData.BloodType}</p>
    <p><b>Date of Admission:</b> {patientData.DateofAdmission}</p>
    <p><b>Discharge Date:</b> {patientData.DischargeDate}</p>
    <p><b>Doctor:</b> {patientData.Doctor}</p>
    <p><b>Hospital:</b> {patientData.Hospital}</p>
    <p><b>Insurance Provider:</b> {patientData.InsuranceProvider}</p>
    <p><b>Medication:</b> {patientData.Medication}</p>
    <p><b>Room Number:</b> {patientData.RoomNumber}</p>
    <p><b>Test Results:</b> {patientData.TestResults}</p>
            </div>
          )}
        </div>

        {/* Upload Document */}
        <div className="section">
          <h2>Upload Document</h2>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="input-file"
          />
          <button onClick={uploadDocument} className="button">
            Upload
          </button>
          {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
