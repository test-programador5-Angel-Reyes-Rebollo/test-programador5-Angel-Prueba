import { useEffect, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/alumnos`)
      .then((res) => {
        if (!res.ok) throw new Error(`El servidor respondió con error ${res.status}`);
        return res.json();
      })
      .then(setAlumnos)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="container">
      <h1>Lista de alumnos</h1>

      {loading && <p>Cargando alumnos...</p>}

      {error && <p className="error">No se pudo cargar la lista: {error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((a) => (
              <tr key={a.id}>
                <td>{a.matricula}</td>
                <td>{a.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}