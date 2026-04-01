import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(API_URL);
        setProducts(res.data.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">Product Catalog</h1>

      {loading && (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map((p) => (
            <div className="col" key={p._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={p.image}
                  className="card-img-top"
                  alt={p.name}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text text-muted">{p.category}</p>
                  <p className="card-text">{p.description}</p>
                  <div className="mt-auto">
                    <span className="fw-bold">₹ {p.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;