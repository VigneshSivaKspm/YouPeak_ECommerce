# YouPeak E-Commerce Ecosystem

A complete, modern multi-vendor e-commerce platform built with React 19, Vite, Tailwind CSS v4, and TypeScript.

---

## 📂 Project Architecture

This repository contains four specialized applications:

| Directory                                        | Panel / Application           | Description                                                                                                                   |
| :----------------------------------------------- | :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| [`YouPeak_Frontend`](./YouPeak_Frontend)         | **Customer Marketplace**      | Main e-commerce store for buyers with category browsing, product search, cart, checkout, order tracking, wallet, and rewards. |
| [`YouPeak_Admin`](./YouPeak_Admin)               | **Admin Console**             | Comprehensive backoffice for marketplace operators to manage products, categories, orders, vendors, finances, and analytics.  |
| [`YouPeak_Seller_panel`](./YouPeak_Seller_panel) | **Seller Central**            | Vendor dashboard to manage product catalogs, inventory, order processing, earnings, and payouts.                              |
| [`YouPeak_Delivery`](./YouPeak_Delivery)         | **Delivery Partner Platform** | Driver portal for order pickups, real-time routing, delivery task management, and incentive tracking.                         |

---

## 🚀 Quick Start (Local Development)

To run any panel locally:

```bash
# 1. Navigate to the desired panel directory
cd YouPeak_Frontend
# or: cd YouPeak_Admin
# or: cd YouPeak_Seller_panel
# or: cd YouPeak_Delivery

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

---

## 🚢 Deploying to Vercel

Each panel is pre-configured with `vercel.json` for client-side SPA routing (`react-router-dom`).

### Option A: Deploying from GitHub Monorepo (Recommended)

1. Push this repository to GitHub.
2. In [Vercel Dashboard](https://vercel.com/new), import your GitHub repository.
3. When creating a project in Vercel, set the **Root Directory** to the target panel:
   - For Customer Marketplace: `YouPeak_Frontend`
   - For Admin Console: `YouPeak_Admin`
   - For Seller Portal: `YouPeak_Seller_panel`
   - For Delivery Partner: `YouPeak_Delivery`
4. Framework Preset: **Vite**
5. Build Command: `npm run build` (or `vite build`)
6. Output Directory: `dist`
7. Click **Deploy**.

> Repeat the same step to create 4 separate Vercel projects pointing to each folder in the repository.

### Option B: Deploying with Vercel CLI

```bash
cd YouPeak_Frontend
vercel
```

---

## 📦 Pushing to GitHub

The root `.gitignore` is pre-configured to ignore all `node_modules`, `dist`, `.env`, `.vercel`, and zip archive files across all folders.

```bash
git init
git add .
git commit -m "Initial commit: YouPeak E-Commerce 4-Panel Ecosystem"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
git push -u origin main
```
