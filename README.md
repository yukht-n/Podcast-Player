## 📚 Project Name: Podcast Application (Student Project)

This is a small, modern single-page application (SPA) created as a student project to demonstrate proficiency in contemporary React state management, data fetching, routing, and optimization techniques.

---

## 🚀 Features

- **Server State Management:** Efficient fetching, caching, and synchronization of server data using **Tanstack Query**.
- **URL Synchronization:** State of filters and pagination is kept in sync with the URL query parameters using the powerful **`nuqs`** library.
- **Routing:** Lightweight and declarative client-side routing using **Wouter**.
- **Global State:** Simple global state management for the audio player using **Zustand**.
- **Optimistic UI/UX:** Enhanced user experience through smooth page transitions via the experimental **View Transitions API** (`document.startViewTransition`).

---

## 🛠️ Technologies Used

- **Frontend Framework:** React (using hooks and functional components)
- **State Management:**
  - **Tanstack Query:** For server data fetching, caching, and revalidation.
  - **Zustand:** For minimal global client state (e.g., audio player status).
  - **`nuqs`:** For syncing component state with URL query strings.
- **Routing:** Wouter
- **SEO:** Helmet

---

## 📦 Installation and Setup

To get a copy of the project up and running on your local machine, follow these simple steps.

### Prerequisites

You need to have **Node.js** and **pnpm** (or npm/yarn) installed on your system.

### Steps

1.  **Clone the repository**

2.  **Install dependencies (using pnpm):**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

The application should now be running at `http://localhost:5173` (or similar port).

---

## ⚙️ Project Structure Highlights

The core functionality is distributed across the following folders:

| Folder/File          | Purpose                                                                    |
| :------------------- | :------------------------------------------------------------------------- |
| `src/components/`    | Reusable UI components (`FilterForm`, `ShowTeaser`, `Pagination`).         |
| `src/showsAPI.js`    | Contains the `queryKey` and `queryFn` used by Tanstack Query.              |
| `src/playerStore.js` | Defines the global player state store using Zustand.                       |
| `src/main.jsx`       | Main application layout, **`QueryClientProvider`**, and **Wouter routes**. |

---

## 🎓 Learning Takeaways

This project demonstrates the effective integration of several key modern React concepts:

1.  **Separation of Concerns:** Clearly separating **server state** (Tanstack Query) from **client state** (Zustand).
2.  **Declarative Data Fetching:** Replacing boilerplate `useEffect` fetching with the declarative `useQuery`.
3.  **Advanced UX:** Using URL state (`nuqs`) to make the application state bookmarkable and shareable, combined with View Transitions for a perceived speed boost.

Link to Demo -> https://podcast-player-tawny-six.vercel.app/
