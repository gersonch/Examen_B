import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
    } else if (data) {
      setNombre(data.name);
      setEmail(data.email);
      setAge(data.age);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("user")
      .update({
        name: nombre,
        email: email,
        age: age,
      })
      .eq("id", id);

    if (error) {
      console.log(error);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container-fluid py-5">
      <div className="row">
        <div className="col-12">
          <section className="bg-white p-5 rounded shadow">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate("/")}
              >
                ← Volver
              </button>
              <h1 className="mb-0">Editar Usuario</h1>
              <div style={{ width: "70px" }}></div>
            </div>
            <form onSubmit={handleSubmit} className="form">
              <div className="mb-4">
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

              <div className="mb-4">
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
              <div className="mb-4">
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
              <div className="d-flex gap-3 mt-4">
                <button type="submit" className="btn btn-primary w-100">
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  onClick={() => navigate("/")}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
