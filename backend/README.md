# Nurse Joy Backend API

RESTful API backend for the Nurse Joy Hospital Records Management System.

## Architecture

```
backend/
├── src/
│   ├── controllers/      # Route request & response handlers
│   │   ├── doctors.controller.ts
│   │   └── patients.controller.ts
│   ├── middleware/       # Custom Express middlewares
│   │   └── error.middleware.ts
│   ├── models/           # TypeScript interfaces & data transfer objects
│   │   ├── doctor.types.ts
│   │   └── patient.types.ts
│   ├── routes/           # Endpoint definitions
│   │   ├── doctors.routes.ts
│   │   ├── patients.routes.ts
│   │   └── index.ts
│   └── index.ts          # Server entrypoint
├── .env.example
├── package.json
└── tsconfig.json
```

## Available Endpoints

### Patients
- `GET /api/patients` - Retrieve all admitted patient records
- `GET /api/patients/:id` - Retrieve patient details by ID
- `POST /api/patients` - Admit a new patient
- `DELETE /api/patients/:id` - Discharge/delete patient record

### Doctors
- `GET /api/doctors` - Retrieve all registered physicians
- `GET /api/doctors/:id` - Retrieve doctor profile by ID
- `POST /api/doctors` - Register a new doctor
- `DELETE /api/doctors/:id` - Remove doctor from active roster

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env

# 3. Run in development mode
npm run dev

# 4. Build TypeScript for production
npm run build
npm start
```
