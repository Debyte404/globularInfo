import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/listings" element={<Listings />} /> */}
        {/* Catch-all route for 404 */}
        <Route
          path="*"
          element={
            <iframe
              src="/errorpage.html"
              title="404 Page"
              style={{ width: '100%', height: '100vh', border: 'none' }}
            />
          }
        />

      </Routes>
    </Router>
  );
}
