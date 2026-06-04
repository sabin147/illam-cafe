# ☕ Illam Cafe

A full-stack web application for managing a coffee and tea shop. Built with a modern tech stack featuring a robust ASP.NET Core API backend and a React frontend.

## 🎯 Overview

Illam Cafe is a comprehensive CRUD (Create, Read, Update, Delete) application designed to manage cafe operations including inventory, menu items, and customer interactions. The application features a clean separation of concerns with a RESTful API backend and a responsive frontend.

## 🏗️ Project Structure

```
illam-cafe/
├── IllamCafeApi/          # .NET Core REST API
│   ├── Controllers/       # API endpoint controllers
│   ├── Models/            # Data models
│   ├── DTOs/              # Data Transfer Objects
│   ├── Data/              # Database context and migrations
│   ├── Program.cs         # API configuration and startup
│   ├── appsettings.json   # Configuration files
│   └── cafe.db            # SQLite database
└── illam-cafe-frontend/   # React frontend application
    ├── src/               # React components and pages
    ├── dist/              # Production build output
    ├── index.html         # Main HTML entry point
    ├── package.json       # Dependencies and scripts
    ├── vite.config.js     # Vite bundler configuration
    └── node_modules/      # Dependencies
```

## 💻 Tech Stack

### Backend
- **Runtime**: .NET 10.0
- **Framework**: ASP.NET Core Web API
- **Database**: SQLite
- **ORM**: Entity Framework Core
- **Documentation**: Swagger/OpenAPI
- **CORS**: Enabled for cross-origin requests

### Frontend
- **Library**: React 18.2
- **Bundler**: Vite 5.0
- **Router**: React Router v6
- **Language**: JavaScript (ES Modules)

## 🚀 Getting Started

### Prerequisites
- **.NET SDK** 10.0 or higher
- **Node.js** 16.0 or higher
- **npm** 8.0 or higher

### Backend Setup

1. Navigate to the API directory:
   ```bash
   cd IllamCafeApi
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Apply migrations (if needed):
   ```bash
   dotnet ef database update
   ```

4. Run the API:
   ```bash
   dotnet run
   ```

The API will start at `https://localhost:5001` and Swagger documentation will be available at the root URL.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd illam-cafe-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

## 📡 API Documentation

The API includes integrated Swagger/OpenAPI documentation. Once the backend is running:

- **Swagger UI**: `https://localhost:5001/`
- **OpenAPI JSON**: `https://localhost:5001/swagger/v1/swagger.json`

### Key Features
- RESTful endpoints for cafe management
- SQLite database for data persistence
- CORS enabled for frontend integration
- Comprehensive API documentation
- Error handling with proper HTTP status codes

## 🔧 Configuration

### Backend Configuration
- `appsettings.json` - Production settings
- `appsettings.Development.json` - Development settings
- Database: SQLite (`cafe.db`)

### Frontend Configuration
- `vite.config.js` - Vite bundler settings
- Environment variables can be managed via `.env` files

## 📦 Dependencies

### Backend
- Microsoft.EntityFrameworkCore.Sqlite (10.0.8)
- Microsoft.EntityFrameworkCore.Tools (10.0.8)
- Swashbuckle.AspNetCore (6.5.0)

### Frontend
- react (18.2.0)
- react-dom (18.2.0)
- react-router-dom (6.22.0)
- vite (5.0.0)

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created by [sabin147](https://github.com/sabin147)

## 📞 Support

For questions or issues, please open an [issue](https://github.com/sabin147/illam-cafe/issues) on the GitHub repository.

---

**Happy coding! ☕☕**
