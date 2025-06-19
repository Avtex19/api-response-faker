import axios from "axios";

export const fakeAxios = axios.create({
    baseURL: "http://localhost:3000",
})
export default fakeAxios