"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";

export function CustomTaxonomiesFields() {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "customTaxonomies",
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Custom Taxonomies</CardTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({
            name: "",
            singular: "",
            plural: "",
            post_types: ["post"],
            hierarchical: true,
            public: true,
            show_ui: true,
            show_in_menu: true,
            show_in_nav_menus: true,
            show_in_rest: true,
            rest_base: "",
            rest_controller_class: "WP_REST_Terms_Controller",
          })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Taxonomy
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
              name={`customTaxonomies.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`customTaxonomies.${index}.singular`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Singular Label</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`customTaxonomies.${index}.plural`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plural Label</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`customTaxonomies.${index}.hierarchical`}
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Hierarchical</FormLabel>
                  <FormControl>
                    <Switch 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`customTaxonomies.${index}.public`}
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Public</FormLabel>
                  <FormControl>
                    <Switch 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}