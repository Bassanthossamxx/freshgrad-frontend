import type { Metadata } from "next";

import { UploadForm } from "@/features/upload/components/upload-form";

export const metadata: Metadata = { title: "Upload" };

export default function UploadPage() {
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-bold">Upload your CV</h1>
      <p className="text-muted-foreground mt-1">
        Add your curriculum or transcript too for a more accurate result.
      </p>
      <UploadForm className="mt-8" />
    </div>
  );
}
