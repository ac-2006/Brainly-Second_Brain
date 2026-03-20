const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const authService = {
  signup: async (username: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    return response.json();
  },

  signin: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },
};

export const contentService = {
  addContent: async (
    title: string,
    type: string,
    content: string,
    tags: string[],
    token: string
  ) => {
    const response = await fetch(`${API_BASE_URL}/content/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, type, content, tags }),
    });
    return response.json();
  },

  getContent: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/content`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  deleteContent: async (contentId: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/content/${contentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
};

export const brainService = {
  getShareLink: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/brain/share-link`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  togglePublic: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/brain/toggle-public`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  getPublicBrain: async (shareLink: string) => {
    const response = await fetch(`${API_BASE_URL}/brain/public/${shareLink}`, {
      method: "GET",
    });
    return response.json();
  },
};
