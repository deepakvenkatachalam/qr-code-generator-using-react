import React, { useState } from 'react';
import './QRCodeImageReader.css';

const QRCodeImageReader = () => {
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const downloadQRCode = () => {
    if (image) {
      const link = document.createElement('a');
      link.href = image;
      link.download = 'qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="qrcode-image-reader" onDrop={handleDrop} onDragOver={handleDragOver}>
      <h2>QR Code Image Reader</h2>
      <div className="file-input-container">
        <label htmlFor="fileInput">
          <img src="upload-icon.png" alt="Upload Icon" />
          Drag and drop image file here, or click to select one
        </label>
        <input id="fileInput" type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      {image && (
        <div className="image-container">
          <img src={image} alt="QR Code" />
          <button onClick={downloadQRCode}>Download QR Code</button>
        </div>
      )}
    </div>
  );
};

export default QRCodeImageReader;
