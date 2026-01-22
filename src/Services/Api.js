const API_URL = 'https://lead-be-i3xm.onrender.com/api';

// Auth APIs
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

// Lead APIs
export const getAllLeads = async (token) => {
  const response = await fetch(`${API_URL}/leads`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.json();
};

export const createLead = async (token, leadData) => {
  const response = await fetch(`${API_URL}/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(leadData),
  });
  return response.json();
};

export const updateLead = async (token, leadId, leadData) => {
  const response = await fetch(`${API_URL}/leads/${leadId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(leadData),
  });
  return response.json();
};

export const deleteLead = async (token, leadId) => {
  const response = await fetch(`${API_URL}/leads/${leadId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.json();
};