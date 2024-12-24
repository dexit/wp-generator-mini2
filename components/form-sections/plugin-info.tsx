"use client";

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useFormContext } from "react-hook-form";

export function PluginInfoFields() {
  const form = useFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Plugin Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="info.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plugin Name</FormLabel>
              <FormControl>
                <Input placeholder="My Awesome Plugin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="info.slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plugin Slug</FormLabel>
              <FormControl>
                <Input placeholder="my-awesome-plugin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="info.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="A brief description of your plugin" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}