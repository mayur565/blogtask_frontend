"use client";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/utils/api";
import { useEffect } from "react";

export default function BlogFormPage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  useEffect(() => {
    if (id) {
      api.get(`/api/blog/${id}`).then(res => {
        const { title, content, category, tags } = res.data;
        setValue("title", title);
        setValue("content", content);
        setValue("category", category);
        setValue("tags", tags.join(", "));
      });
    }
  }, [id]);

  const onSubmit = async (data) => {
    const payload = { ...data, tags: data.tags.split(",").map(t => t.trim()) };
    if (id) await api.put(`/api/blog/${id}`, payload);
    else await api.post("/api/blog", payload);
    router.push("/");
  };

  return (
    <div className="container mt-5">
      <h2>{id ? "Edit Blog" : "Create Blog"}</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-3">
          <label>Title</label>
          <input className={`form-control ${errors.title ? "is-invalid" : ""}`} {...register("title", { required: "Title is required" })} />
          {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
        </div>
        <div className="mb-3">
          <label>Content</label>
          <textarea className={`form-control ${errors.content ? "is-invalid" : ""}`} rows={5} {...register("content", { required: "Content is required" })} />
          {errors.content && <div className="invalid-feedback">{errors.content.message}</div>}
        </div>
        <div className="mb-3">
          <label>Category</label>
          <input className={`form-control ${errors.category ? "is-invalid" : ""}`} {...register("category", { required: "Category is required" })} />
          {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
        </div>
        <div className="mb-3">
          <label>Tags (comma separated)</label>
          <input className={`form-control ${errors.tags ? "is-invalid" : ""}`} {...register("tags", { required: "Tags are required" })} />
          {errors.tags && <div className="invalid-feedback">{errors.tags.message}</div>}
        </div>
        <button className="btn btn-primary">{id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}
