"use client";

import { useState } from "react";
import { PluginForm } from "@/components/plugin-form";
import { PluginPreview } from "@/components/plugin-preview";
import { Settings2 } from "lucide-react";

export default function Home() {
  const [previewData, setPreviewData] = useState(null);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings2 className="h-6 w-6" />
            <h1 className="text-2xl font-bold">WordPress Plugin Generator</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <PluginForm onSubmit={setPreviewData} />
          </div>
          <div>
            <PluginPreview data={previewData} />
          </div>
        </div>
      </main>
    </div>
  );
}