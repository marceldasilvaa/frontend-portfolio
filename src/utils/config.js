export const api = import.meta.env.VITE_API_URL;
export const uploads =
  "https://myhyuthmduqbjjvlibdc.supabase.co/storage/v1/object/public/portfolio";

export const getImageUrl = (path) => {
  if (!path) return "";

  if (path.startsWith("http")) return path;

  return `${uploads}/${path}`;
};

export const requestConfig = (method, data, token = null, image = null) => {
  let config;

  if (image) {
    config = {
      method,
      body: data,
      headers: {},
    };
  } else if (method === "DELETE" || data === null) {
    config = {
      method,
      headers: {},
    };
  } else {
    config = {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};
