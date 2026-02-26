# 🚀 Job Listing Portal

A modern, production-ready **Job Listing Portal** built using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

This application delivers a smooth, modern UI with advanced filtering, sorting, pagination, infinite scroll, CSV/PDF export, and dark mode support.

---

## 🌐 Live Demo

🔗https://job-potall.netlify.app/ 

---

## 🛠 Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hooks
- PapaParse (CSV Export)
- jsPDF + autoTable (PDF Export)

---

## ✨ Features Implemented

### ✅ Job Listing Page
- Fetches jobs from `/jobs/paginated`
- Fully responsive modern UI
- Clean card-based layout

---

### ✅ Advanced Filtering (Frontend Only)

- 🔍 Search (Title, Company, Description)
- 📍 Location filter (Dropdown)
- 💼 Employment Type (Multi-select)
- 🏷 Job Category (Dropdown)
- 🏠 Remote Only toggle
- 💰 Salary Range slider
- 🧾 Active filter summary
- ❌ Remove individual filters

Performance optimized using:
- `useMemo`
- Debounced search (500ms)
- Avoided unnecessary re-renders

---

### ✅ Sorting Options

- Newest First
- Oldest First
- Salary High → Low
- Salary Low → High

---

### ✅ Pagination + Infinite Scroll

- Page numbers
- Next / Previous controls
- Toggle between:
  - Pagination Mode
  - Infinite Scroll Mode

---

### ✅ CSV Export

Exports **only filtered data**

Includes:
- Title
- Company
- Location
- Salary From
- Salary To
- Employment Type
- Category
- Remote
- Created At

---

### ✅ PDF Export

PDF includes:
- Title: *Filtered Job Results*
- Applied Filters Section
- Table of Job Data
- Footer:
  - Timestamp
  - Total Results Count

---

### ✅ Skeleton Loading UI

- 6 Skeleton cards while loading
- Improved perceived performance

---

### ✅ Dark Mode

- Toggle switch
- Persisted using `localStorage`
- Smooth theme transition

---

## 📁 Project Structure

```
app/
components/
hooks/
lib/
models/
public/
```

- Clean modular architecture
- Reusable UI components
- Separation of concerns
- Proper typing using TypeScript

---

## ⚡ Performance Optimizations

- Debounced search (500ms)
- Memoized filtering using `useMemo`
- Client-side caching
- Prevented unnecessary API calls
- Optimized rendering for large datasets

---

## 🚀 Setup Instructions

Clone the repository:

```bash
git clone https://github.com/Himanip04/job-portal-repo.git
cd job-portal-repo
```

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## 🌍 Deployment

Deployed using **GitHub Pages** with static export configuration.

Configuration includes:

- `output: "export"`
- Proper `basePath`
- Optimized static build

---

## 📌 Architectural Decisions

- Used App Router for scalable structure
- Frontend-only filtering as per assignment requirement
- Static export for free hosting
- Modular components for maintainability
- Clean separation between UI, logic, and data

---

## 👩‍💻 Author

**Himani Pant**

---

## 📄 License

This project was developed as part of a technical assignment.
