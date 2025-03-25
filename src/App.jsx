import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import supabase from "./utils/supabase";
import EditUser from "./components/EditUser";

function UserList() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("user").select("*");
    if (error) {
      console.log(error);
    } else {
      setUsers(data);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      const { error } = await supabase.from("user").delete().eq("id", id);

      if (error) {
        console.log(error);
      } else {
        fetchUsers();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUserData = {
      name: nombre,
      age: age,
      email: email,
    };
    const { error } = await supabase.from("user").insert([newUserData]);
    if (error) {
      console.log(error);
    } else {
      fetchUsers();
      setNombre("");
      setEmail("");
      setAge("");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <section className="text-center mb-5">
            <h1 className="mb-4">Crear usuario</h1>
            <div className="row justify-content-center">
              <div className="col-md-6">
                <form onSubmit={handleSubmit} className="form">
                  <div className="mb-3">
                    <label htmlFor="input1" className="form-label">
                      Nombre:
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setNombre(e.target.value)}
                      value={nombre}
                      id="input1"
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="input2" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      id="input2"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="input3" className="form-label">
                      Edad
                    </label>
                    <input
                      type="number"
                      onChange={(e) => setAge(e.target.value)}
                      value={age}
                      id="input3"
                      className="form-control"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Crear usuario
                  </button>
                </form>
              </div>
            </div>
          </section>

          <h2 className="text-center mb-4">Usuarios</h2>
          {users.length > 0 ? (
            <div className="row g-4 justify-content-center">
              {/*renderizado de lista de usuarios*/}
              {users.map((user) => (
                <div className="col-sm-12 col-md-8 col-lg-6" key={user.id}>
                  <div className="card h-100 shadow-sm">
                    <div className="card-header bg-secondary text-white">
                      <h5 className="card-title mb-0 text-center">
                        {user.name}
                      </h5>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <div className="mb-3">
                        <p className="card-text mb-1">
                          <i className="bi bi-envelope me-2"></i>
                          {user.email}
                        </p>
                        <p className="card-text">
                          <i className="bi bi-person-badge me-2"></i>
                          Edad: {user.age}
                        </p>
                      </div>
                      <div className="mt-auto gap-2 d-flex">
                        <button
                          className="btn btn-outline-warning w-100"
                          onClick={() => navigate(`/edit/${user.id}`)}
                        >
                          <i className="bi bi-pencil-square me-2"></i>
                          Editar
                        </button>
                        <button
                          className="btn btn-outline-danger w-100"
                          onClick={() => handleDelete(user.id)}
                        >
                          <i className="bi bi-trash me-2"></i>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">Cargando...</p>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
