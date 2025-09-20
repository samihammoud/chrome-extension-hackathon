# CanvasAgent Chrome Extension

**for IEEE OC Computer Society AI Dev Hack 2025**

**Team Members:**

- Andrew Bahsoun
- Sami Hammoud
- Landon Kauer
- Max Richter

A Chrome extension that integrates with Canvas LMS and Google Drive to provide AI-powered assistance for educational content.

## Architecture

This project consists of two main parts:

1. **Chrome Extension** (React + TypeScript + Vite)
2. **Flask Backend API** (Python + Flask)

## Features

- ⚡️ **Vite** for fast development and building
- ⚛️ **React 18** with TypeScript
- 🎨 **Material-UI** for beautiful components
- 🔧 **ESLint** for code quality
- 📦 **Chrome Extension Manifest V3** ready
- 🚀 **Hot reload** during development
- 🔐 **Canvas OAuth2** integration
- 📚 **Google Drive** API integration
- 🤖 **AI-powered** content processing

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+
- npm or yarn

### Installation

1. Clone this repository
2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Set up backend environment:

   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. Configure environment variables:
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your Canvas and API credentials
   ```

### Development

1. Start the Flask backend:

   ```bash
   cd backend
   source venv/bin/activate
   python app.py
   ```

   The API will be available at `http://localhost:5001`

2. Start the frontend development server:

   ```bash
   npm run dev
   ```

3. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `build` folder

### Building

Build the extension for production:

```bash
npm run build
```

The built extension will be in the `build` folder.

## Project Structure

```
├── src/                    # Chrome Extension Frontend
│   ├── components/         # React components
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API services
│   ├── background.ts      # Service worker
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── backend/               # Flask API Backend
│   ├── app.py            # Main Flask application
│   ├── requirements.txt  # Python dependencies
│   ├── .env.example      # Environment variables template
│   └── venv/             # Python virtual environment
├── public/
│   ├── manifest.json     # Chrome extension manifest
│   └── vite.svg         # Extension icon
└── README.md
```

## API Endpoints

The Flask backend provides these endpoints:

- `GET /api/health` - Health check
- `POST /api/test` - Simple test (no auth required)
- `POST /api/ask-test` - Test with simulated tokens
- `POST /api/ask` - **Main endpoint** (requires tokens in request body)
- `GET /auth/canvas/start` - Start Canvas OAuth flow
- `GET /auth/canvas/callback` - Canvas OAuth callback

## Request Format

```json
{
  "question": "What are my assignments?",
  "context": { "course": "CS101" },
  "canvas_tokens": {
    "access_token": "canvas_token_123",
    "refresh_token": "canvas_refresh_123",
    "expires_in": 3600
  },
  "google_tokens": {
    "access_token": "google_token_456",
    "refresh_token": "google_refresh_456",
    "expires_in": 3600
  }
}
```

## Environment Variables

Configure these in `backend/.env`:

- `ALLOWED_EXTENSION_ORIGIN`: set to your extension's origin in prod
- `CANVAS_*`: your Canvas developer key + base URL + redirect URI
- `BACKEND_URL` and `BACKEND_AUTH`: where to forward the question and tokens

## Security Notes

- Tokens are never stored on the server (frontend manages them)
- Use HTTPS in production
- Lock CORS to your exact extension origin in production

## Development Tips

- The extension will automatically reload when you make changes
- Use the Chrome DevTools to debug your extension
- Check the `manifest.json` for permissions and configuration
- The Flask backend handles OAuth flows and token management

## License

MIT
