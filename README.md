# Online Food Shopping System

Welcome to the repository of our Online Food Shopping System. This system is designed with a microservices architecture, focusing on delivering robust, scalable, and maintainable services for an online food shopping application.

## Architecture Overview

The system is composed of several independent microservices, each responsible for a specific domain of the application:

- **User Service**: Manages user information and authentication .
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
- Node.Js(Express)
- Microservices
- RabbitMQ
- Nginx
- Docker
- Rest Api 

## Getting Started

To get started with this project, ensure you have Docker installed on your system. You can then clone this repository and use Docker Compose to spin up the services:

git clone https://github.com/iamKienb/shopping_ms.git
cd shopping_ms
docker-compose up 
