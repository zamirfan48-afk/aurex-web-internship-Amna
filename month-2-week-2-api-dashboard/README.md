# AUREX FULL-STACK ENGINEER INTERNSHIP

## Month 2 – Week 2: REST APIs & API Integration

### Project: Product Explorer – API-Based Product Dashboard

**Intern:** Amna Irfan  
**Domain:** Full-Stack Web Development  
**Month:** Month 2  
**Week:** Week 2

## Project Overview

Product Explorer is a React-based product dashboard that retrieves product information from the DummyJSON REST API. It allows users to browse products, search by keywords, filter by category, view product details, add products, edit existing products, and delete products.

The project demonstrates how a React frontend communicates with a REST API and manages the returned data.

## Technologies Used

- React.js
- JavaScript (ES6+)
- Vite
- HTML5
- CSS3
- Fetch API
- REST API / JSON
- React Hooks (`useState`, `useEffect`, `useMemo`)
- Git & GitHub

## API Used

**DummyJSON Products API**

Base endpoint: https://dummyjson.com/products

The application uses the following endpoints:

| Operation | HTTP Method | Endpoint |
|---|---|---|
| Fetch products | GET | `/products?limit=100` |
| Add product | POST | `/products/add` |
| Update product | PUT | `/products/{id}` |
| Delete product | DELETE | `/products/{id}` |

DummyJSON simulates write operations. Changes made through POST, PUT and DELETE are returned as API responses but are not permanently stored on the server. The application updates its local React state to display additions and edits during the current session. Successful deletions are saved as browser-local product IDs, so products stay hidden after reload in that browser. This does not change DummyJSON's server data or affect other browsers. Use **Restore original list** after deleting to clear the browser-local IDs and fetch the products again.

## Main Features

- Fetch and display products from a REST API.
- Search products by title and description.
- Filter products by category.
- View product details.
- Add new products.
- Edit existing products.
- Delete products.
- Keep deleted products hidden in this browser after reload, with an option to restore the original API list.
- Display loading, error and empty states.
- Responsive product-card layout.

## React Concepts Practised

- Functional components and JSX.
- Component-based architecture.
- Props and callback functions.
- State management using `useState`.
- API requests using `fetch()`.
- Side effects and API integration using `useEffect`.
- Loading and error handling.
- JSON response processing.
- Dynamic rendering using `map()`.
- Filtering and derived data using `useMemo`.
- Controlled form inputs and validation.

## Project Structure

```text
month-2-week-2-api-dashboard/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── CategoryFilter.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProductCard.jsx
│   │   └── ProductModal.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Run Locally

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

## Quality Checks

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

## Testing

The application should be tested for:

- Successful product retrieval.
- Search and category filtering.
- Product details display.
- Add, update and delete operations.
- Loading, error and empty states.
- Responsive layout.
- Successful production build.

## Learning Outcome

Through this task, I gained practical experience connecting a React application to a REST API. I improved my understanding of HTTP methods, JSON responses, asynchronous requests, `useEffect`, state management, and handling API-related errors.

## Author

**Amna Irfan**  
AUREX Full-Stack Engineer Intern