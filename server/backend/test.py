
import sys
import pdfplumber
import requests
from datetime import datetime as timestamp

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "gpt-oss:120b-cloud" # - 6.59s 1st run "llama3:latest" # 10.51s 1st run # 6.84s 2nd run
DEFAULT_PDF = "ABIZ3530_Syllabus_Fall_2025.pdf"


def pdf_to_text(pdf_path: str, max_chars: int = 12000) -> str:
    parts = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            text = text.strip()
            if text:
                parts.append(text)
    full_text = "\n\n".join(parts)
    return full_text[:max_chars]  # keep short for quick testing


def ask_ollama(prompt: str) -> str:
    payload = {
        "model": MODEL,
        "prompt": prompt,
        "stream": False,
        "options": {"temperature": 0}
    }
    r = requests.post(OLLAMA_URL, json=payload, timeout=120)
    r.raise_for_status()
    return r.json()["response"]


def main():
    pdf_path = sys.argv[1] if len(sys.argv) >= 2 else DEFAULT_PDF

    try:
        text = pdf_to_text(pdf_path)

    except FileNotFoundError:
        print(f"❌ File not found: {pdf_path}")
        print("Make sure the PDF is in the same folder as this script, or pass a full path.")
        return

    if not text.strip():
        print("❌ No text extracted from PDF (might be scanned images).")
        return

    prompt = f"""
You will be given a course outline text.

Extract and present clearly (plain text):
0) Term and Year
1) Class code + class name
2) Professor name + email
3) Class time (days, start-end, location)
4) Assignments (name + weight if available) dates if available
5) Exams (name + weight if available) with dates if available
6) Important dates (e.g., add/drop, withdrawal deadlines)

If you can't find something, say "Not found".

COURSE OUTLINE TEXT:
{text}
""".strip()

    output = ask_ollama(prompt)

    # print("\n========== PDF (first 12k chars) ==========\n")
    # print(text)
    print("\n========== OLLAMA OUTPUT ==========\n")
    print(output)
    print("\n===================================\n")


if __name__ == "__main__":
    start = timestamp.now()
    main()
    end = timestamp.now()
    elapsed = end - start
    print("Running with OLLAMA model:", MODEL)
    print(f"⏱️ Elapsed time: {elapsed.total_seconds():.2f} seconds")
