"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

export function RestEndpointsFields() {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "restEndpoints",
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>REST API Endpoints</CardTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({
            name: "",
            methods: ["GET"],
            callback: "",
            permission_callback: "",
            args: {},
          })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Endpoint
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4 p-4 border rounded-lg relative">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => remove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <FormField
              control={form.control}
              name={`restEndpoints.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endpoint Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`restEndpoints.${index}.callback`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Callback Function</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`restEndpoints.${index}.permission_callback`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permission Callback</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}