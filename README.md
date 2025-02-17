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

## **Project Structure**
```
/tatum-client-app
├── backend/        # NestJS Backend (Handles API requests)
│   ├── src/        
│   ├── .env.example 
│   ├── Dockerfile   
│   ├── package.json  
│   ├── tsconfig.json 
│   ├── tsconfig.build.json 
│   ├── nest-cli.json  
│   └── dist/        
│
├── frontend/       # Vite + Preact Frontend (UI)
│   ├── src/        
│   ├── .env.example  
│   ├── Dockerfile    
│   ├── package.json  
│   ├── tsconfig.json 
│   ├── vite.config.ts 
│   ├── tailwind.config.ts 
│   ├── index.html    
│   └── dist/         
│
├── lib/            # Shared Common Library (Used by Frontend & Backend)
│   ├── common/     
│   │   ├── src/    
│   │   ├── package.json  
│   │   ├── tsconfig.json 
│   │   ├── tsconfig.cjs.json  
│   │   ├── tsconfig.esm.json 
│   │   ├── dist/   
│
├── docker-compose.yml 

│
├── .gitignore      
├── LICENSE        
├── README.md       
├── package.json    
├── tsconfig.json   

```
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
