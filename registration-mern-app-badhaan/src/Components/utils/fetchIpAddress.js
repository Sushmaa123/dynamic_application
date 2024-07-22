// src/utils/fetchIpAddress.js
const fetchIpAddress = async () => {
  const response = await fetch("http://localhost:5000/api/ip");
  const data = await response.json();
  return data.ip;
};

export default fetchIpAddress;
