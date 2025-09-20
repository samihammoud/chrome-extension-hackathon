import os, time, requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# CORS configuration for development (be more permissive for Chrome extensions)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# ---- Config ----
CANVAS_BASE = os.getenv("CANVAS_BASE_URL", "").rstrip("/")
BACKEND_URL  = os.getenv("BACKEND_URL", "")  # Default to empty string for testing
BACKEND_AUTH = os.getenv("BACKEND_AUTH")  # e.g., "Bearer <key>"

# ---- Helpers: Simple token validation ----
def validate_tokens(canvas_tokens: dict, google_tokens: dict) -> bool:
    """Check if at least one valid token is provided"""
    canvas_valid = bool(canvas_tokens and canvas_tokens.get("access_token"))
    google_valid = bool(google_tokens and google_tokens.get("access_token"))
    return canvas_valid or google_valid

# ---- Routes ----
@app.get("/api/health")
def health():
    return jsonify({"ok": True})

@app.post("/api/ask")
def ask():
    # 1) Read user input and tokens from request
    body = request.get_json(force=True, silent=True) or {}
    question = body.get("question", "").strip()
    context = body.get("context", {})
    canvas_tokens = body.get("canvas_tokens", {})
    google_tokens = body.get("google_tokens", {})
    tokens = body.get("tokens", {})
    
    if not question:
        return jsonify({"error":"missing_question"}), 400

    # 2) Validate that at least one token is provided
    if not validate_tokens(canvas_tokens, google_tokens):
        return jsonify({"error":"no_tokens_available","message":"Canvas or Google Drive authentication required"}), 401

    # 3) Check if we're in test mode (no backend URL configured)
    if not BACKEND_URL:
        # Test mode: simulate backend response
        test_response = {
            "status": "success",
            "message": "Test mode - simulating backend response",
            "user_question": question,
            "user_context": context,
            "tokens": {
                "canvas": {
                    "available": bool(canvas_tokens.get("access_token")),
                    "base_url": CANVAS_BASE if canvas_tokens.get("access_token") else None
                },
                "google_drive": {
                    "available": bool(google_tokens.get("access_token"))
                }
                
            },
            "simulated_answer": f"Test response: You asked '{question}'. This is a simulated backend response for testing purposes.",
            "timestamp": int(time.time())
        }
        return jsonify(test_response)

    # 4) Build payload to your team's backend with both tokens
    outbound = {
        "question": question,
        "context": context,
        "tokens": {}
    }
    
    # Add Canvas token if available
    if canvas_tokens.get("access_token"):
        outbound["tokens"]["canvas"] = {
            "access_token": canvas_tokens["access_token"],
            "base_url": CANVAS_BASE
        }
    
    # Add Google Drive token if available
    if google_tokens.get("access_token"):
        outbound["tokens"]["google_drive"] = {
            "access_token": google_tokens["access_token"]
        }

    headers = {"Content-Type": "application/json"}
    if BACKEND_AUTH:
        headers["Authorization"] = BACKEND_AUTH

    try:
        resp = requests.post(BACKEND_URL, json=outbound, headers=headers, timeout=60)
    except requests.RequestException as e:
        return jsonify({"error":"backend_unreachable","details": str(e)}), 502

    if not resp.ok:
        return jsonify({"error":"backend_error","status": resp.status_code, "body": resp.text}), 502

    # 5) Pass the backend response back to the extension
    return (resp.text, 200, {"Content-Type": "application/json"})

if __name__ == "__main__":
    # Listen on all interfaces so other computers can connect
    app.run(host='0.0.0.0', port=5001, debug=True)
