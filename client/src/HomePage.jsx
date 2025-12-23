import React, { useState } from "react";
import DropOutlineCard from "@/components/DropOutlineCard";
import LoadingPopup from "@/components/LoadingPopup";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileAdded = (file) => setSelectedFile(file);

  const handleExtract = async () => {
    if (!selectedFile) return;

    setLoadingOpen(true);

    try {
      // TODO: upload file to backend here
      // const formData = new FormData();
      // formData.append("file", selectedFile);
      // const token = localStorage.getItem("token");
      // await axios.post("/api/files/upload", formData, {
      //   headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      // });

      // For now, just let LoadingPopup finish then navigate via onComplete
    } catch (e) {
      console.error(e);
      setLoadingOpen(false);
    }
  };

  const handleLoadingComplete = () => {
    setLoadingOpen(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f5f7f5]">
      <LoadingPopup isOpen={loadingOpen} onComplete={handleLoadingComplete} />

      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-16">
        {/* Hero */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Smart Study Planning Starts
          </h1>
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Here
          </h1>

          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Upload your course outline — we&apos;ll extract deadlines and build a personalized
            <br className="hidden sm:block" />
            study plan instantly.
          </p>
        </div>

        {/* Upload Card Wrapper */}
        <div className="mt-12 w-full max-w-4xl">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            {/* DropOutlineCard handles file validation + shows Extract button */}
            <DropOutlineCard onFileAdded={handleFileAdded} onSubmit={handleExtract} />

            {/* Optional debug */}
            {selectedFile ? (
              <div className="mt-4 text-center text-xs text-gray-500">
                Selected: <span className="font-medium">{selectedFile.name}</span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Footer notes */}
        <div className="mt-10 flex flex-col items-center gap-3 text-gray-600">
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <span className="text-[#2d6a4f] text-lg">☆</span>
            <span className="text-[#2d6a4f] text-lg">☆</span>
            <span className="text-[#2d6a4f] text-lg">☆</span>
            <span className="text-[#2d6a4f] text-lg">☆</span>
            <span className="text-[#2d6a4f] text-lg">★</span>
            <span>Trusted by students and educators.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-1 text-sm sm:text-base">
            <span>By uploading a file, you agree to our</span>
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Use
            </a>
            <span>and</span>
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
