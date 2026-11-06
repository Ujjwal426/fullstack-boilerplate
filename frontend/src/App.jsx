import { useEffect, useState } from "react";
import { getHealth } from "./api";

export default function App() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const checkHealth = async () => {
    setLoading(true);
    setError("");
    try {
      setHealth(await getHealth());
    } catch (err) {
      setHealth(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <main className="container">
      <h1>Fullstack Boilerplate</h1>

      <button onClick={checkHealth} disabled={loading}>
        {loading ? "Checking..." : "Check backend health"}
      </button>

      {error && <p className="error">Backend unreachable: {error}</p>}

      {health && (
        <pre className={health.status === "ok" ? "ok" : "warn"}>
          {JSON.stringify(health, null, 2)}
        </pre>
      )}
    </main>
  );
}
