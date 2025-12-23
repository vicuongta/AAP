import { useRef, useState } from "react";
import { UploadCloud, X, FileText, FileImage, FileType2 } from "lucide-react";

const MAX_BYTES = 20 * 1024 * 1024; // 20MB

export default function DropOutlineCard({ onFileAdded, onSubmit }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const openPicker = () => inputRef.current?.click();

  const getFileIcon = (type) => {
    if (type === "application/pdf") return <FileType2 className="h-7 w-7 text-red-500" />;
    if (type.includes("wordprocessingml")) return <FileText className="h-7 w-7 text-blue-500" />;
    if (type.includes("image")) return <FileImage className="h-7 w-7 text-green-600" />;
    return <FileText className="h-7 w-7 text-gray-500" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleExtract = () => onSubmit?.();

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    const allowedExt = [".pdf", ".docx", ".jpg", ".jpeg", ".png"];
    const allowedMime = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ];

    const ext = selectedFile.name.toLowerCase().slice(selectedFile.name.lastIndexOf("."));

    if (!allowedExt.includes(ext) || !allowedMime.includes(selectedFile.type)) {
      setError("Invalid file type. Please upload PDF, DOCX, JPG, or PNG.");
      return;
    }

    if (selectedFile.size > MAX_BYTES) {
      setError("File size exceeds 20MB limit.");
      return;
    }

    setFile(selectedFile);
    onFileAdded?.(selectedFile);
    setError("");
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files?.[0];
    handleFile(selectedFile);
    e.target.value = null;
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0];
    handleFile(droppedFile);
  };

  const removeFile = () => {
    setFile(null);
    onFileAdded?.(null);
    setError("");
  };

  return (
    <div className="mx-auto w-full max-w-[820px]">
      {/* OUTER dashed frame (green) */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={[
          "rounded-3xl border-2 border-dashed p-6 sm:p-8 transition",
          // green dashed border like your screenshot
          dragActive ? "border-[#2d6a4f] bg-[#2d6a4f]/5" : "border-[#93b7a3] bg-transparent",
        ].join(" ")}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.jpg,.jpeg,.png"
          onChange={handleChange}
          className="hidden"
        />

        {/* INNER panel (light green) */}
        <div
          onClick={!file ? openPicker : undefined}
          className={[
            "rounded-3xl border bg-[#f3faf6] px-6 py-10 sm:px-10 sm:py-14 text-center",
            "shadow-sm transition",
            !file ? "cursor-pointer" : "cursor-default",
            dragActive ? "border-[#2d6a4f]/40" : "border-[#d6e6dc]",
          ].join(" ")}
        >
          {!file ? (
            <div className="flex flex-col items-center gap-3">
              {/* Keep existing icon, just style it like the screenshot */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fbbc1b] shadow-sm">
                <UploadCloud className="h-7 w-7 text-white" />
              </div>

              <div className="text-lg font-semibold text-gray-900">Drop your outline here</div>

              <div className="text-xs text-gray-500">
                PDF, DOCX, JPG/PNG — up to 20 MB
              </div>

              {/* Browse button TO-DO: Link to pdf extract*/} 
              {/* <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openPicker();
                }}
                className="mt-2 rounded-lg bg-[#0b5d42] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0a4e37]"
              >
                Extract Files
              </button> */}
            </div>
          ) : (
            <div className="mx-auto max-w-[620px]">
              <div className="flex items-center gap-3 rounded-2xl bg-white/70 p-4 text-left">
                {getFileIcon(file.type)}

                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-gray-900">{file.name}</div>
                  <div className="text-xs text-gray-500">{formatFileSize(file.size)}</div>
                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  className="rounded-full p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                  aria-label="Remove file"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleExtract}
                className="mt-4 w-full rounded-2xl bg-[#0b5d42] py-4 font-bold text-white transition hover:bg-[#0a4e37]"
              >
                Extract Deadlines
              </button>
            </div>
          )}

          {error ? (
            <div className="mx-auto mt-5 max-w-[620px] rounded-xl bg-red-50 p-3 text-center text-sm text-red-600">
              {error}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}