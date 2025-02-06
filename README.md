# NodeJS Express Application

A robust NodeJS application built with Express.js framework, featuring Docker integration for both development and production environments.

## Features

- Express.js web framework
- Docker containerization
- Development and Production environments
- GitLab CI/CD integration
- Docker Compose for service orchestration

## Prerequisites

- Node.js (v14 or higher)
- Docker
- Docker Compose

## Project Structure

## Getting Started

### Development Environment

To run the application in development mode:

```bash
docker-compose -f docker-compose.dev.yml up
```

### Production Environment

To run the application in production mode:

```bash
docker-compose -f docker-compose.prod.yml up
```

### Basic Docker Commands

```bash
# Build the Docker image
docker build -t nodejs-app .

# Run the container
docker run -p 3000:3000 nodejs-app

# Stop all running containers
docker-compose down
```

## CI/CD Pipeline

This project includes GitLab CI/CD configuration for automated testing and deployment. The pipeline includes:

- Build stage
- Test stage
- Deploy stage

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
PORT=3000
```

## API Documentation

### Base URL
```
http://localhost:3000
```

### Available Endpoints

- `GET /`: Home endpoint
- `GET /api/health`: Health check endpoint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository.



