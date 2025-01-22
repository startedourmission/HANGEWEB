# Korean Ink Painting Style Transfer Web Service

A web service that transforms images into Korean ink painting (수묵화) style using deep learning models. Built with React/Next.js frontend and Flask backend.

## Features

- Upload and transform images into Korean ink painting style
- Multiple style transfer models support
- Real-time preview and comparison
- Responsive design for both desktop and mobile
- Image processing pipeline with pre/post processing
- Error handling and input validation

## Tech Stack

### Frontend
- React
- Next.js
- Tailwind CSS
- Axios for API calls

### Backend
- Flask
- PyTorch
- Pillow for image processing
- NumPy

## Project Structure

```
├── frontend/
│   ├── components/
│   │   ├── ImageUploader.js
│   │   ├── StylePreview.js
│   │   └── TransformationControls.js
│   ├── pages/
│   │   └── index.js
│   └── styles/
│       └── globals.css
├── backend/
│   ├── app.py
│   ├── models/
│   │   └── style_transfer.py
│   └── utils/
│       └── image_processing.py
└── docker/
    ├── Dockerfile.frontend
    └── Dockerfile.backend
```

## Getting Started

### Prerequisites
- Node.js 16+
- Python 3.8+
- PyTorch
- Docker (optional)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ink-painting-web.git
cd ink-painting-web
```

2. Set up frontend
```bash
cd frontend
npm install
npm run dev
```

3. Set up backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Docker Setup

1. Build images
```bash
docker-compose build
```

2. Run services
```bash
docker-compose up
```

## API Endpoints

### POST /api/transform
Transform an image into ink painting style

Request:
- Method: POST
- Content-Type: multipart/form-data
- Body: 
  - image: File
  - model: String (model name)

Response:
```json
{
  "status": "success",
  "image_url": "string"
}
```

### GET /api/models
Get available transformation models

Response:
```json
{
  "models": [
    {
      "id": "string",
      "name": "string",
      "description": "string"
    }
  ]
}
```

## Configuration

Environment variables:
```env
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:5000

# Backend
FLASK_ENV=development
MAX_CONTENT_LENGTH=16777216  # 16MB max file size
ALLOWED_EXTENSIONS=png,jpg,jpeg
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Based on the research paper: "Attention-based Style Transfer Model for Ink Painting Style"
- Trained on Korean Traditional Ink Painting Dataset from AI Hub
