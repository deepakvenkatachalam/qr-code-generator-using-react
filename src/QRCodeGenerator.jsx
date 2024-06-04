import React, { useState } from 'react';
import QRCode from 'qrcode';
import './QRCodeGenerator.css';

function QRCodeGenerator() {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [QRCodeDataURL, setQRCodeDataURL] = useState('');

  const generateQRCode = async () => {
    const student = {
      name: name,
      rollNumber: rollNumber,
      department: department,
      year: year,
      contactNumber: contactNumber
    };

    const dataURL = await QRCode.toDataURL(JSON.stringify(student));
    setQRCodeDataURL(dataURL);
  

  try {
    const dataURL = await QRCode.toDataURL(student, {
      errorCorrectionLevel: 'H',
      width: 500
    });
    setQRCodeDataURL(dataURL);
  
    // Create a temporary anchor element to trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = `${name.toLowerCase().replace(' ', '_')}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  } catch (err) {
    console.error('Error generating QR code:', err);
  }
  
};
  return (
        <div className="qr-generator-container">
          <h2>Generate QR Code</h2>
          <div className="form-container">
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
              Roll Number:
              <input type="text" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />
            </label>
            <label>
              Department:
              <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
            </label>
            <label>
              Year:
              <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
            </label>
            <label>
              Contact Number:
              <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
            </label>
            <button onClick={generateQRCode}>Generate QR Code</button>
          </div>
          {QRCodeDataURL && (
            <div className="qr-code-container">
              <img src={QRCodeDataURL} alt="QR Code" />
            </div>
          )}
        </div>
      );
}

export default QRCodeGenerator;
