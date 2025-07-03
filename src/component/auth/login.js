"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("api/auth/login", data);
      localStorage.setItem("token", res.data.token);
      router.push("/");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-3">
          <label>Email</label>
          <input className={`form-control ${errors.email ? "is-invalid" : ""}`} {...register("email", { required: "Email is required" })} />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className={`form-control ${errors.password ? "is-invalid" : ""}`} {...register("password", { required: "Password is required" })} />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>
        <button className="btn btn-primary">Login</button>
        <p className="mt-3">Don’t have an account? <a href="/register">Register</a></p>
      </form>
    </div>
  );
}
