import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function ProtectedItemsLayout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
