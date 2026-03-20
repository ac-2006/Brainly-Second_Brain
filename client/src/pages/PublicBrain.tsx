import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { brainService } from "../services/api";

interface Content {
  _id: string;
  title: string;
  type: string;
  content: string;
  tags: string[];
  thumbnail?: string;
  description?: string;
}

interface Brain {
  username: string;
  contents: Content[];
}

const PublicBrain: React.FC = () => {
  const { shareLink } = useParams<{ shareLink: string }>();
  const [brain, setBrain] = useState<Brain | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (shareLink) fetchBrain();
  }, [shareLink]);

  const fetchBrain = async () => {
    try {
      if (!shareLink) throw new Error("No share link provided");
      const response = await brainService.getPublicBrain(shareLink);
      if (response.brain) {
        setBrain(response.brain);
      } else {
        setError("Brain not found");
      }
    } catch (err) {
      setError("Failed to load brain");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          {brain?.username}'s Brain
        </h1>
        <p className="text-gray-400 mb-8">Public Knowledge Base</p>

        <div className="space-y-4">
          {brain?.contents.length === 0 ? (
            <div className="bg-gray-800 p-6 rounded-lg text-center text-gray-400">
              No content shared yet
            </div>
          ) : (
            brain?.contents.map((item) => (
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
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicBrain;
