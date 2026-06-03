import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  tiposPermitidos,
}) {
  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  if (
    !tiposPermitidos.includes(usuario.tipo)
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}