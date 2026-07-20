# GCP 3-Tier Architecture using Terraform

## Project Overview

This project deploys a complete 3-tier application architecture on Google Cloud Platform using Terraform.

## Architecture

Internet
↓
Frontend VM (Public Subnet)
↓
Nginx Reverse Proxy
↓
Backend VM (Private Subnet)
↓
Node.js + Express
↓
MongoDB

## Technologies Used

- Google Cloud Platform
- Terraform
- VPC
- Cloud NAT
- Compute Engine
- Nginx
- Node.js
- Express.js
- MongoDB
- PM2

## Infrastructure

- Custom VPC
- Public Subnet
- Private Subnet
- Firewall Rules
- Cloud Router
- Cloud NAT
- Frontend VM
- Backend VM

## Features

- Infrastructure as Code using Terraform
- Private Backend VM
- Public Frontend VM
- Nginx Reverse Proxy
- REST API
- MongoDB Integration
- PM2 Process Manager
- Auto Start after Reboot

## Author

Sourabh Sharma
