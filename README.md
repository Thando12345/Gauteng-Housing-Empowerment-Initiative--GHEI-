# Gauteng Housing Empowerment Initiative (GHEI)

The Gauteng Housing Empowerment Initiative (GHEI) is a comprehensive platform designed to facilitate and streamline housing initiatives in the Gauteng province. This repository contains both the frontend and backend components of the project.

## Project Structure

```
.
├── core_backend/         # Django backend application
│   └── ghei_backend/    # Core backend modules
└── ghei-frontend/       # React frontend application
    └── src/             # Frontend source code
```

## Quick Start Guide

### Backend Setup

```bash
cd core_backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver
```

### Frontend Setup

```bash
cd ghei-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Technology Stack

### Backend
- Django/Django REST Framework
- PostgreSQL
- NumPy/Pandas for data analysis
- JWT Authentication
- CORS handling

### Frontend
- React + Vite
- Tailwind CSS
- ESLint
- React Router DOM
- HeroIcons

## Contributing

We welcome contributions to the GHEI project! Here's how you can contribute:

1. **Fork the Repository**
   - Click the "Fork" button on the top right of this repository
   - Clone your fork locally

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Write clean, documented code
   - Follow the project's coding standards
   - Add/update tests as needed

4. **Test Your Changes**
   - Run existing tests
   - Add new tests for new features
   - Ensure all tests pass

5. **Submit a Pull Request**
   - Push your changes to your fork
   - Submit a pull request to the main repository
   - Provide a clear description of your changes
   - Reference any related issues

## Development Guidelines

### General
- Follow Git Flow branching strategy
- Write comprehensive documentation
- Maintain code quality standards
- Implement proper error handling
- Write unit tests for new features

### Backend Specific
- Write comprehensive docstrings
- Follow Django best practices
- Implement proper error handling and logging
- Maintain security best practices
- Regular security audits

### Frontend Specific
- Document all new components
- Follow React best practices
- Use Tailwind CSS for styling
- Maintain responsive design
- Ensure accessibility standards

## Security Measures

- JWT-based authentication
- CORS policy implementation
- Input validation and sanitization
- Secure database operations
- Regular security audits
- HTTPS enforcement
- XSS protection
- CSRF protection

## License

This project is licensed under the MIT License - see the LICENSE file for details.