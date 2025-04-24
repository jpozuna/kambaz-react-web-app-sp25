import axios from "axios";

// 🔧 Constants
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

// ✅ Axios instance with credentials
const axiosWithCredentials = axios.create({
    baseURL: USERS_API,
    withCredentials: true,
});

// ✅ Create a course (fix: should be POST, not GET)
export const createCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
    return data;
};

// ✅ Fetch courses
export const findMyCourses = async () => {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
    return data;
};

// ✅ Signin
export const signin = async (credentials: any) => {
    const { data } = await axiosWithCredentials.post(`/signin`, credentials);
    return data;
};

// ✅ Profile
export const profile = async () => {
    console.log("📤 Sending request to /profile");
    const { data } = await axiosWithCredentials.post(`/profile`);
    console.log("✅ Got profile response", data);
    return data;
};

// ✅ Signup
export const signup = async (user: any) => {
    const { data } = await axiosWithCredentials.post(`/signup`, user);
    return data;
};

// ✅ Signout
export const signout = async () => {
    const { data } = await axiosWithCredentials.post(`/signout`);
    return data;
};

// ✅ Update user
export const updateUser = async (user: any) => {
    const { data } = await axiosWithCredentials.put(`/${user._id}`, user);
    return data;
};


