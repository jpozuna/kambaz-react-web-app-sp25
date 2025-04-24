import axios from "axios";

// 🔧 Constants
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
export const findCoursesForUser = async (userId: string) => {
    const response = await axiosWithCredentials.get(`${USERS_API}/${userId}/courses`);
    return response.data;
};

export const enrollIntoCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
    return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
    return response.data;
};


// ✅ Axios instance with credentials
const axiosWithCredentials = axios.create({
    baseURL: USERS_API,
    withCredentials: true,
});

// ✅ Create a course (fix: should be POST, not GET)
export const createCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.post(`/current/courses`, course);
    return data;
};

// ✅ Fetch courses
export const findMyCourses = async () => {
    const { data } = await axiosWithCredentials.get(`/current/courses`);
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

export const findAllUsers = async () => {
    const response = await axiosWithCredentials.get(USERS_API);
    return response.data;
};

export const findUsersByRole = async (role: string) => {
    const response = await axiosWithCredentials.get(`${USERS_API}?role=${role}`);
    return response.data;
};

export const findUsersByPartialName = async (name: string) => {
    const response = await axiosWithCredentials.get(`${USERS_API}?name=${name}`);
    return response.data;
};

export const findUserById = async (id: string) => {
    const response = await axios.get(`${USERS_API}/${id}`);
    return response.data;
};

export const deleteUser = async (userId: string) => {
    const response = await axios.delete( `${USERS_API}/${userId}` );
    return response.data;
};

export const createUser = async (user: any) => {
    const response = await axiosWithCredentials.post(`${USERS_API}`, user);
    return response.data;
};


