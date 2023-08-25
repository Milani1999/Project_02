import axios from 'axios';

export const fetchSubjects = async () => {
  try {
    const response = await axios.get('/api/subjects');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
