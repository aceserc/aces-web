import axios from "axios";
import API from ".";

export const handleGetTags = async (
  type: string
): Promise<{ name: string; tags: string[] }> => {
  return new Promise((resolve) => {
    axios
      .get(`${API.tags}?type=${type}`, { withCredentials: true })
      .then((res) => {
        resolve(res.data?.data);
      })
      .catch(() => {
        resolve({ name: type, tags: [] });
      });
  });
};
