## 🚀 Getting Started

### 📌 Prerequisites
- **Node.js** (Latest LTS recommended)
- **npm or yarn** installed

### 📦 Installation
```sh
git clone https://github.com/Ubed-pathan/Reqres-App.git
cd Reqres-App
npm install
```

### 🛠️ Running the Project
```sh
npm run dev
```

### 🔧 Building for Production
```sh
npm run build
```

### 🚨 Linting
```sh
npm run lint
```

## 🏗️ Tech Stack
- **React**: Component-based UI library  
- **TypeScript**: Strongly typed JavaScript  
- **Vite**: Fast development server and bundler  
- **React Router**: Client-side routing  
- **Axios**: HTTP client for API requests  
- **Tailwind CSS**: Utility-first styling  
- **React Icons & Lucide React**: Beautiful and customizable icons  

## 📌 Icon Libraries

### 🔹 React Icons
[React Icons](https://react-icons.github.io/react-icons) provides a collection of popular icons from various libraries.  

**Example Usage:**
```tsx
import { AiOutlineLoading3Quarters } from "react-icons/ai";

<AiOutlineLoading3Quarters size={25} className="animate-spin" />;
```

### 🔹 Lucide React
[Lucide React](https://lucide.dev/) offers open-source, consistent, and customizable icons.

**Example Usage:**
```tsx
import { Pencil, Trash } from "lucide-react";

<Pencil size={16} />;
<Trash size={16} />;
```

## 🌟 Features
✅ **User authentication using local storage**  
✅ **Protected routes for authorized users**  
✅ **API requests using Axios**  
✅ **Toast notifications with `react-toastify`**  

## 🔥 Assumptions & Considerations
- The app requires a `.env` file with `VITE_SERVER_API` defined.  
- Uses `react-router-dom` for routing.  
- `react-toastify` is used for notifications.  
- TailwindCSS is used for styling.  
