import sys
import json
import requests
from datetime import datetime
from pathlib import Path
import pdfplumber

# Config
OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "gpt-oss:120b-cloud"
TEMPERATURE = 0
TIMEOUT_SECONDS = 120

PLACEHOLDER_BLOCK = "INPUT_TEXT_START\n<course outline text will appear here>\nINPUT_TEXT_END"


def pdf_to_text(pdf_path: str) -> str:
    """Extract text from PDF file."""
    try:
        parts = []
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                text = page.extract_text() or ""
                text = text.strip()
                if text:
                    parts.append(text)
        full_text = "\n\n".join(parts)
        return full_text
    except FileNotFoundError:
        raise FileNotFoundError(f"PDF file not found: {pdf_path}")
    except Exception as e:
        raise RuntimeError(f"Error reading PDF: {e}")


def load_prompt_template(template_path: str) -> str:
    """Load prompt template from file."""
    try:
        with open(template_path, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        raise FileNotFoundError(f"Prompt template file not found: {template_path}")
    except Exception as e:
        raise RuntimeError(f"Error reading prompt template: {e}")


def build_prompt(prompt_template: str, outline_text: str) -> str:
    """Build final prompt by injecting outline text into template."""
    if PLACEHOLDER_BLOCK in prompt_template:
        return prompt_template.replace(
            PLACEHOLDER_BLOCK,
            "INPUT_TEXT_START\n" + outline_text + "\nINPUT_TEXT_END"
        )
    
    return (
        prompt_template.rstrip()
        + "\n\nINPUT_TEXT_START\n"
        + outline_text
        + "\nINPUT_TEXT_END\n"
    )


def ask_ollama(prompt: str) -> str:
    """Send prompt to Ollama API and return response."""
    payload = {
        "model": MODEL,
        "prompt": prompt,
        "stream": False,
        "options": {"temperature": TEMPERATURE}
    }
    
    try:
        r = requests.post(OLLAMA_URL, json=payload, timeout=TIMEOUT_SECONDS)
        r.raise_for_status()
        data = r.json()
        
        if "response" not in data:
            raise RuntimeError(f"Unexpected Ollama response keys: {list(data.keys())}")
        
        return data["response"]
    except requests.exceptions.ConnectionError:
        raise ConnectionError(f"Could not connect to Ollama at {OLLAMA_URL}. Is it running?")
    except requests.exceptions.Timeout:
        raise TimeoutError(f"Request timed out after {TIMEOUT_SECONDS} seconds")
    except requests.exceptions.RequestException as e:
        raise RuntimeError(f"Error calling Ollama API: {e}")


def salvage_json(raw: str) -> dict:
    """Extract and parse JSON from response, handling malformed output."""
    # Try direct parse first
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        pass

    # Try to extract JSON from surrounding text
    start_idx = raw.find("{")
    end_idx = raw.rfind("}")
    if start_idx != -1 and end_idx != -1 and end_idx > start_idx:
        possible_json = raw[start_idx:end_idx + 1]
        try:
            return json.loads(possible_json)
        except json.JSONDecodeError:
            pass

    raise ValueError("Could not salvage valid JSON from the response.")


def main():
    """Main execution function."""
    if len(sys.argv) < 3:
        print("Usage: python extract.py <pdf_path> <prompt_template_path>")
        print("  pdf_path: Path to the PDF file to extract text from")
        print("  prompt_template_path: Path to the prompt template file")
        sys.exit(1)

    pdf_path = sys.argv[1]
    prompt_template_path = sys.argv[2]

    try:
        print(f"Extracting text from PDF: {pdf_path}")
        outline_text = pdf_to_text(pdf_path)
        print(f"Extracted {len(outline_text)} characters")
        
        print(f"Loading prompt template: {prompt_template_path}")
        prompt_template = load_prompt_template(prompt_template_path)
        
        print("Building prompt...")
        prompt = build_prompt(prompt_template, outline_text)
        
        print(f"Sending request to Ollama ({MODEL})...")
        response = ask_ollama(prompt)
        
        print("Parsing JSON response...")
        json_data = salvage_json(response)
        
        print("\n" + "="*50)
        print("RESULT:")
        print("="*50)
        print(json.dumps(json_data, indent=2))
        
    except Exception as e:
        print(f"\nError: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    start_time = datetime.now()
    main()
    end_time = datetime.now()
    print(f"\nTotal time: {end_time - start_time}")