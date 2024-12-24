"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

export function ShortcodesFields() {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "shortcodes",
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Shortcodes</CardTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({
            name: "",
            attributes: [],
            defaultContent: "",
          })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Shortcode
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
              name={`shortcodes.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shortcode Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`shortcodes.${index}.defaultContent`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Content</FormLabel>
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