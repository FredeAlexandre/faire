import { Login } from "../_components/login";

export default function LoginPage() {
  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <Login />
      </div>
    </main>
  );
}
