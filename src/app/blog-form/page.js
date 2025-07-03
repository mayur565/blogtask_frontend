import { Suspense } from "react";
import BlogFormPage from "@/component/blog/blogForm";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Blog Form...</div>}>
      <BlogFormPage />
    </Suspense>
  );
}
