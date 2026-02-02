import axiosInstance from './interceptors';

const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post('/users/login-user', {
      email,
      password,
    }, { withCredentials: true });  // ✅ Ensure credentials (cookies) are sent
    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Network error occurred');
  }
};

const signupUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/users/register', userData, { withCredentials: true });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response) {
      return error.response.data;
    }
    throw new Error('Network error occurred');
  }
};

const logoutUser = async () => {
  console.log("Logout function called...");
  try {
    const response = await axiosInstance.post('/users/logout-user', {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response) {
      throw error.response.data;
    }
  }
};

const sentotp = async (email) => {
  try {
    const response = await axiosInstance.post('/users/forget-password', { email }, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
};

const verify_otp = async (otp) => {
  try {
    const response = await axiosInstance.post('/users/verify-otp', { otp }, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
};

const Reset_Password = async (newPassword) => {
  try {
    const response = await axiosInstance.post('/users/reset-password', { newPassword }, { withCredentials: true });
    return response;
  } catch (error) {
    throw error;
  }
};

export { loginUser, signupUser, logoutUser, sentotp, verify_otp, Reset_Password };
