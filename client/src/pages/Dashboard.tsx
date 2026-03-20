import React, { useState, useEffect } from "react";
import { useContent } from "../hooks/useContent";
import { brainService } from "../services/api";
import { getToken } from "../utils/auth";
import Header from "../components/Header";

interface Content {
  _id: string;
  title: string;
  type: string;
  content: string;
  tags: string[];
  thumbnail?: string;
  description?: string;
}

const Dashboard: React.FC = () => {
  const { addContent, getContent, deleteContent, loading } = useContent();
  const [contents, setContents] = useState<Content[]>([]);
  const [shareLink, setShareLink] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    type: "note",
    content: "",
    tags: "",
  });

  useEffect(() => {
    fetchContents();
    fetchShareLink();
  }, []);

  const fetchContents = async () => {
    const data = await getContent();
    if (data) setContents(data);
  };

  const fetchShareLink = async () => {
    const token = getToken();
    if (token) {
      const response = await brainService.getShareLink(token);
      if (response.shareLink) {
        setShareLink(response.shareLink);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    const result = await addContent(
      formData.title,
      formData.type,
      formData.content,
      tags
    );
    if (result) {
      setFormData({ title: "", type: "note", content: "", tags: "" });
      fetchContents();
    }
  };

  const handleDelete = async (contentId: string) => {
    await deleteContent(contentId);
    fetchContents();
  };

  const copyToClipboard = () => {
    const link = `${window.location.origin}/public/${shareLink}`;
    navigator.clipboard.writeText(link);
    alert("Share link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg sticky top-20">
              <h3 className="text-xl font-bold text-white mb-4">Add Content</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value="note">Note</option>
                  <option value="link">Link</option>
                </select>
                <textarea
                  name="content"
                  placeholder={formData.type === "link" ? "Paste link URL" : "Write your note"}
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="text"
                  name="tags"
                  placeholder="Tags (comma separated)"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Add Content"}
                </button>
              </form>

              {shareLink && (
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <h4 className="text-lg font-bold text-white mb-2">Share Link</h4>
                  <div className="bg-gray-700 p-3 rounded mb-2 break-all text-sm text-gray-300">
                    {window.location.origin}/public/{shareLink}
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition"
                  >
                    Copy Link
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-4">
              {contents.length === 0 ? (
                <div className="bg-gray-800 p-6 rounded-lg text-center text-gray-400">
                  No content yet. Add your first content!
                </div>
              ) : (
                contents.map((item) => (
                  <div
                    key={item._id}
                    className="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden"
                  >
                    {item.type === "link" && item.thumbnail && (
                      <div className="w-full h-40 bg-gray-700 overflow-hidden">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white">{item.title}</h3>
                          <span className="inline-block mt-2 px-2 py-1 bg-blue-600 text-white text-xs rounded">
                            {item.type}
                          </span>
                          {item.description && item.type === "link" && (
                            <p className="text-gray-400 mt-2 text-sm line-clamp-2">
                              {item.description}
                            </p>
                          )}
                          {item.type === "note" && (
                            <p className="text-gray-400 mt-3">{item.content}</p>
                          )}
                          {item.type === "link" && (
                            <a
                              href={item.content}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 mt-2 inline-block break-all text-sm"
                            >
                              {item.content}
                            </a>
                          )}
                          {item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {item.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
