"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { pluginSchema } from "@/lib/schema";
import { PluginInfoFields } from "./form-sections/plugin-info";
import { AdminPagesFields } from "./form-sections/admin-pages";
import { CustomPostTypesFields } from "./form-sections/custom-post-types";
import { CustomTaxonomiesFields } from "./form-sections/custom-taxonomies";
import { RestEndpointsFields } from "./form-sections/rest-endpoints";
import { ShortcodesFields } from "./form-sections/shortcodes";
import { WidgetsFields } from "./form-sections/widgets";
import { CronJobsFields } from "./form-sections/cron-jobs";
import { SettingsPageFields } from "./form-sections/settings-page";

interface PluginFormProps {
  onSubmit: (data: z.infer<typeof pluginSchema>) => void;
}

export function PluginForm({ onSubmit }: PluginFormProps) {
  const form = useForm<z.infer<typeof pluginSchema>>({
    resolver: zodResolver(pluginSchema),
    defaultValues: {
      info: {
        name: "",
        slug: "",
        description: "",
      },
      adminPages: [],
      customPostTypes: [],
      customTaxonomies: [],
      restEndpoints: [],
      shortcodes: [],
      widgets: [],
      cronJobs: [],
      settingsPage: {
        title: "",
        fields: [],
      },
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <PluginInfoFields />
        <AdminPagesFields />
        <CustomPostTypesFields />
        <CustomTaxonomiesFields />
        <RestEndpointsFields />
        <ShortcodesFields />
        <WidgetsFields />
        <CronJobsFields />
        <SettingsPageFields />
        
        <Button type="submit" className="w-full">
          Generate Plugin
        </Button>
      </form>
    </Form>
  );
}