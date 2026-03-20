import { useState } from "react";
import { contentService } from "../services/api";
import { getToken } from "../utils/auth";

export const useContent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addContent = async (
    title: string,
    type: string,
    content: string,
    tags: string[]
  ) => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) throw new Error("Not authenticated");
      const response = await contentService.addContent(
        title,
        type,
        content,
        tags,
        token
      );
      return response;
    } catch (err) {
      setError("Failed to add content");
    } finally {
      setLoading(false);
    }
  };

  const getContent = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) throw new Error("Not authenticated");
      const response = await contentService.getContent(token);
      return response.contents;
    } catch (err) {
      setError("Failed to fetch content");
    } finally {
      setLoading(false);
    }
  };

  const deleteContent = async (contentId: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) throw new Error("Not authenticated");
      const response = await contentService.deleteContent(contentId, token);
      return response;
    } catch (err) {
      setError("Failed to delete content");
    } finally {
      setLoading(false);
    }
  };

  return { addContent, getContent, deleteContent, loading, error };
};
