/**
 * API Service for interacting with Node.js Express backend
 */

const API_BASE_URL = '/api';

export const fetchTopology = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/topology`);
    if (!response.ok) throw new Error('Failed to fetch topology');
    return await response.json();
  } catch (error) {
    console.warn('Backend API offline or unreachable, using local fallback:', error.message);
    return null;
  }
};

export const fetchStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/status`);
    if (!response.ok) throw new Error('Failed to fetch status');
    return await response.json();
  } catch (error) {
    console.warn('Backend API offline or unreachable, using local fallback:', error.message);
    return null;
  }
};
