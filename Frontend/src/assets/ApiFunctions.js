import axiosInstance from "../ApiManager"

export const editMemberNew = async (values) => {
    const res = await axiosInstance.put(`/api/gym/member`, values)
    return res.data;
}

