import axios from "axios";

export const fetchStaffData = async (staffId) => {
  try {
    const response = await axios.get(`/api/staff/${staffId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching staff details");
  }
};
