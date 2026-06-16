import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  tiposPermitidos,
}) {

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );


  if (!usuario) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }


  if (!tiposPermitidos.includes(usuario.tipo)) {

    if (usuario.tipo === "ADMIN") {
      return (
        <Navigate
          to="/dashboardadmin"
          replace
        />
      );
    }


    if (usuario.tipo === "SERVIDOR") {
      return (
        <Navigate
          to="/dashboardservidor"
          replace
        />
      );
    }


    return (
      <Navigate
        to="/dashboardaluno"
        replace
      />
    );

  }
  return children;
}