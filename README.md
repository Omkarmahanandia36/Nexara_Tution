# NEXT-GEN SCHOLARS Portal

Welcome to the **NEXT-GEN SCHOLARS Portal** (Nexara_Tution), a modern, React-based web application designed to provide a seamless and professional learning experience for students. This portal allows students to access subject-specific PDF notes categorized by classes (1-10) and educational boards (CBSE, ICSE, CHSE).

## 🌟 Features

### 🎓 Student Portal
- **Secure Access**: Simple and beautiful login interface for students.
- **Class & Board Selection**: Easy navigation to select the appropriate class (1 to 10) and board (CBSE, ICSE, CHSE).
- **Notes Repository**: Browse available subjects and view/download PDF notes directly from the portal.
- **Coming Soon State**: Visual indicators for subjects whose notes are currently being prepared.

### ⚙️ Admin Portal
- **Admin Dashboard**: Dedicated portal for administrators to manage content.
- **PDF Management**: Easily link and upload PDF URLs (like Google Drive links) to specific subjects across all classes and boards.
- **Dynamic Updates**: Changes made in the admin panel instantly reflect on the student's end.

## 🚀 Tech Stack

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS with modern, glassmorphism UI/UX design and responsive layouts
- **Routing**: React Router DOM
- **Animation**: Framer Motion for smooth page transitions and micro-interactions

## 🛠️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm installed on your machine.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/Omkarmahanandia36/Nexara_Tution.git
   ```
2. Navigate to the project directory
   ```sh
   cd "sovan tuition"
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Start the development server
   ```sh
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

- `src/components/` - Reusable UI components (Navbar, PDFViewer, etc.)
- `src/context/` - Global state management (AuthContext, NotesContext)
- `src/data/` - Static data configurations and initial states
- `src/pages/` - Main page views (EntryPage, BoardsPage, NotesPage, AdminPage, etc.)

## 🔗 Live Link
*(Add your deployed hosting link here, e.g., Vercel, Netlify, Render)*

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
