"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { generatePlugin } from "@/lib/generator";
import type { PluginData } from "@/lib/types";

interface PluginPreviewProps {
  data: PluginData | null;
}

export function PluginPreview({ data }: PluginPreviewProps) {
  const [activeTab, setActiveTab] = useState("main");
  const [files, setFiles] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (data) {
      // Generate preview files without creating zip
      // This would be a simplified version of the generator
      // that returns file contents instead of creating a zip
      // TODO: Implement preview generation
    }
  }, [data]);

  if (!data) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">
          Fill out the form to preview your plugin
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Preview</h2>
        <Button
          onClick={() => generatePlugin(data)}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download Plugin
        </Button>
      </div>

      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="main">Main Plugin File</TabsTrigger>
            <TabsTrigger value="includes">Includes</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="public">Public</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[600px] w-full">
            {Object.entries(files).map(([filename, content]) => (
              <TabsContent key={filename} value={getTabForFile(filename)}>
                <pre className="p-4 text-sm">
                  <code>{content}</code>
                </pre>
              </TabsContent>
            ))}
          </ScrollArea>
        </Tabs>
      </Card>
    </div>
  );
}

function getTabForFile(filename: string): string {
  if (filename.includes("includes/")) return "includes";
  if (filename.includes("admin/")) return "admin";
  if (filename.includes("public/")) return "public";
  return "main";
}