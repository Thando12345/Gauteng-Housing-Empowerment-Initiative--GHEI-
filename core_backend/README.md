# GHEI Backend

This is the backend component of the Gauteng Housing Empowerment Initiative (GHEI) project. For comprehensive documentation, please refer to the [main project documentation](../GHEI_PROJECT_DOCUMENTATION.md).

## Quick Start

```bash
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

## Technology Stack
- Django/Django REST Framework
- PostgreSQL
- NumPy/Pandas for data analysis
- JWT Authentication
- CORS handling

## Development Guidelines
1. Follow the project's Git workflow as described in the main documentation
2. Write comprehensive docstrings for all functions and classes
3. Implement proper error handling and logging
4. Maintain security best practices
5. Write and maintain unit tests

## Security Measures
- JWT-based authentication
- CORS policy implementation
- Input validation and sanitization
- Secure database operations
- Regular security audits

For detailed information about the project structure, security measures, and contribution guidelines, please refer to the main project documentation.