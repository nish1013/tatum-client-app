# tatum-client-app

A **full-stack blockchain balance checker** using **NestJS (Backend)** and **Vite + Preact (Frontend)**, deployed via **Docker Compose**.

## Deployed App

https://tatum-client-app.vercel.app/

<img width="973" alt="web3-ss" src="https://github.com/user-attachments/assets/6c8acc05-d350-4250-81d5-91a7e5bfba06" />

## **Environment Variables**

1. **Duplicate `.env.example` to `.env` in both frontend and backend directories.**
2. **Populate all required environment variables** as per the `.env.example` file.
   - Ensure correct values for **Tatum API keys**, **backend URL**, and other necessary configurations.
  
## Getting Tatum API Keys

1. Go to [Tatum Dashboard](https://tatum.io/).
2. Sign in or create an account.
3. Navigate to **API Keys** section.
4. Generate and copy the API key for the required blockchain network.
5. Update your `.env` file with the key using the format:

---

## **Getting Started (Without Docker)**

### **Frontend**
```sh
cd frontend
npm install
npm run dev
```
- Runs a **Vite** dev server at **`http://localhost:5173/`**.
- Configure API URL in `.env` (`VITE_BACKEND_API=http://localhost:4000`).

### **Backend**
```sh
cd backend
npm install
npm run start:dev
```
- Starts a **NestJS** dev server at **`http://localhost:4000/`**.
- API exposed at `http://localhost:4000/v1/balance?network={network}&address={address}`.

---

## **Using Docker Compose (Recommended)**

This will spin up **both frontend and backend**.

### **Run Entire App**
```sh
docker-compose up --build
```
- Frontend: **`http://localhost:8080/`**
- Backend: **`http://localhost:4000/`**

### **Stop Containers**
```sh
docker-compose down
```

---

## **Project Structure**

/tatum-client-app
├── backend/        # NestJS Backend (Handles API requests)
│   ├── src/        # Source code
│   ├── .env.example  # Environment variables example
│   ├── Dockerfile    # Backend-specific Dockerfile
│   ├── package.json  # Backend dependencies
│   ├── tsconfig.json # TypeScript configuration
│   ├── tsconfig.build.json # TypeScript build config
│   ├── nest-cli.json  # NestJS CLI configuration
│   └── dist/         # Compiled backend code (ignored in Git)
│
├── frontend/       # Vite + Preact Frontend (UI)
│   ├── src/        # Source code
│   ├── .env.example  # Environment variables example
│   ├── Dockerfile    # Frontend-specific Dockerfile
│   ├── package.json  # Frontend dependencies
│   ├── tsconfig.json # TypeScript configuration
│   ├── vite.config.ts # Vite configuration
│   ├── tailwind.config.ts # Tailwind CSS configuration
│   ├── index.html    # Main entry point
│   └── dist/         # Built frontend (ignored in Git)
│
├── lib/            # Shared Common Library (Used by Frontend & Backend)
│   ├── common/     # Shared utilities, interfaces, constants
│   │   ├── src/    # Source code
│   │   ├── package.json  # Library package.json (for linking)
│   │   ├── tsconfig.json  # TypeScript configuration for shared lib
│   │   ├── tsconfig.cjs.json  # Build config for backend (CJS)
│   │   ├── tsconfig.esm.json  # Build config for frontend (ESM)
│   │   ├── dist/   # Compiled shared code (ignored in Git)
│
├── docker/         # Docker-related configuration
│   ├── docker-compose.yml # Manages multi-container setup
│   ├── backend.Dockerfile # Dedicated backend Dockerfile (if needed)
│   ├── frontend.Dockerfile # Dedicated frontend Dockerfile (if needed)
│
├── .gitignore      # Ignores node_modules, env files, build output
├── LICENSE         # Project license
├── README.md       # Documentation
├── package.json    # Root dependencies (if any)
├── tsconfig.json   # Root TypeScript configuration (base)


---

## **Default Local URLs**

| Service   | URL                      | Description |
|-----------|--------------------------|-------------|
| **Frontend** | `http://localhost:8080/` | UI to enter wallet address and check balance |
| **Backend** | `http://localhost:4000/` | API to fetch balances from Tatum SDK |
| **Balance API** | `http://localhost:4000/v1/balance?network=ethereum-mainnet&address={wallet}` | Fetch balance |

---

## **Notes**

- Uses **Docker Compose** for full app setup.
- **API keys must be set in `.env` before running**.
- Make sure `CORS` is enabled in the backend (`main.ts`).
