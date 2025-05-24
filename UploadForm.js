import React, { useState } from 'react';
import axios from 'axios';
import ChartDisplay from './ChartDisplay';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { Authorization: token },
      });
      setData(res.data.data);
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <div className="p-4">
      <input type="file" accept=".xlsx,.xls" onChange={(e) => setFile(e.target.files[0])} />
      <button className="bg-blue-500 text-white p-2 rounded" onClick={handleUpload}>Upload</button>

      {data && (
        <div className="mt-4">
          <label>Select X Axis:
            <select onChange={(e) => setXAxis(e.target.value)}>
              <option value="">--Select--</option>
              {Object.keys(data[0]).map((key) => <option key={key}>{key}</option>)}
            </select>
          </label>
          <label className="ml-4">Select Y Axis:
            <select onChange={(e) => setYAxis(e.target.value)}>
              <option value="">--Select--</option>
              {Object.keys(data[0]).map((key) => <option key={key}>{key}</option>)}
            </select>
          </label>

          {xAxis && yAxis && (
            <ChartDisplay data={data} xAxis={xAxis} yAxis={yAxis} />
          )}
        </div>
      )}
    </div>
  );
};

export default UploadForm;
