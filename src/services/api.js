const API_BASE_URL = 'https://opravyslavkov.shop/api'; 
const AUTH_HEADER = 'Basic ' + btoa('rbank:TajneHeslo2026');

export const getTransactions = async (page = 1, limit = 15) => {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Authorization': AUTH_HEADER,
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Server vrátil chybu ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error (getTransactions):', error);
    return [];
  }
};
