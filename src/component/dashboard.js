"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import { jwtDecode } from "jwt-decode";

export default function DashboardPage() {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const fetchBlogs = async () => {
    const res = await api.get("/api/blog");
    setBlogs(res.data);
  };

  const deleteBlog = async (id) => {
      const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (!confirm) return;
    await api.delete(`/api/blog/${id}`);
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="container mt-5">
      <h2>Blogs</h2>
      {isLoggedIn && (
        <button
          className="btn btn-success mb-3"
          onClick={() => router.push("/blog-form")}
        >
          + Create Blog
        </button>
      )}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {blogs.map((blog) => (
          <div className="col" key={blog._id}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-subtitle text-muted mb-2">
                    Category: {blog.category}
                  </p>
                  <p className="card-text">{blog.content}</p>
                  <p className="text-muted">
                    <small>Tags: {blog.tags?.join(", ")}</small>
                  </p>
                  <p className="card-subtitle text-muted mb-2">
                    Author: {blog.author.name}
                  </p>
                </div>
                {isLoggedIn && blog.author._id === user?.id && (
                  <div className="mt-3">
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => router.push(`/blog-form?id=${blog._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteBlog(blog._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
