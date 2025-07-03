"use client";
import { useForm } from "react-hook-form";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/api/auth/register", data);
      // localStorage.setItem("token", res.data.token);
      router.push("/login");
    } catch {
      alert("Email already exists");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-3">
          <label>Name</label>
          <input className={`form-control ${errors.name ? "is-invalid" : ""}`} {...register("name", { required: "Name is required" })} />
          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input className={`form-control ${errors.email ? "is-invalid" : ""}`} {...register("email", { required: "Email is required" })} />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className={`form-control ${errors.password ? "is-invalid" : ""}`} {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters" },
          })} />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>
        <button className="btn btn-success">Register</button>
        <p className="mt-3">Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
}
