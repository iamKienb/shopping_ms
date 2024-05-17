# Online Food Shopping System

Welcome to the repository of our Online Food Shopping System. This system is designed with a microservices architecture, focusing on delivering robust, scalable, and maintainable services for an online food shopping application.

## Architecture Overview

The system is composed of several independent microservices, each responsible for a specific domain of the application:

- **User Service**: Manages CRUD user information and authentication .
- **Product Service**: Handles all product management 
- **Shopping Service**: Comprises of two main components:
  - **Cart**: Manages shopping cart operations.
  - **Order**: Handles order creation, tracking, and management.

These services communicate through **RabbitMQ** utilizing the publisher/subscriber model to ensure loose coupling and high scalability.

### Gateway

The system uses **Nginx** as an API Gateway, which routes requests to the appropriate microservices and provides an additional layer of security 

### Deployment

Deployment is managed via **Docker**, enhancing the system's portability and consistency across different environments.

## Technologies Used

- **Node.js**: As the runtime environment.
- **Express**: Web application framework for Node.js.
- **MongoDb && Mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **Redis**: In-memory data structure store, used as a database, cache.
- **NGINX (Reverse Proxy)**: For routing requests to appropriate microservices.
- **Multer with Cloudinary**: For handling file uploads and image management.
- **Docker**: Used for containerizing the application and ensuring consistent environments across development and deployment stages.
- **RabbitMQ**: Messaging broker that enables communication between different microservices using a publish/subscribe model.
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Docker installed on your machine. You can download it from [Docker's official website](https://www.docker.com/products/docker-desktop).

## Getting Started
To get the project up and running on your local machine for development and testing purposes, follow these steps:

1. **Clone the repository:**
   ```
   git clone https://github.com/iamKienb/Instagram.git
   ```
2. **Build the Docker containers:**
   ```
   docker-compose up --build
   ```
