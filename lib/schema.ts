import * as z from "zod";

export const pluginInfoSchema = z.object({
  name: z.string().min(1, "Plugin name is required"),
  slug: z.string().min(1, "Plugin slug is required"),
  description: z.string(),
});

export const adminPageSchema = z.object({
  title: z.string(),
  slug: z.string(),
  parent_slug: z.string(),
  capability: z.string(),
  icon: z.string(),
  position: z.number(),
});

export const customPostTypeSchema = z.object({
  name: z.string(),
  singular: z.string(),
  plural: z.string(),
  public: z.boolean(),
  has_archive: z.boolean(),
  supports: z.array(z.string()),
  menu_icon: z.string(),
  rest_base: z.string(),
  rest_controller_class: z.string(),
});

export const customTaxonomySchema = z.object({
  name: z.string(),
  singular: z.string(),
  plural: z.string(),
  post_types: z.array(z.string()),
  hierarchical: z.boolean(),
  public: z.boolean(),
  show_ui: z.boolean(),
  show_in_menu: z.boolean(),
  show_in_nav_menus: z.boolean(),
  show_in_rest: z.boolean(),
  rest_base: z.string(),
  rest_controller_class: z.string(),
});

export const restEndpointSchema = z.object({
  name: z.string(),
  methods: z.array(z.string()),
  callback: z.string(),
  permission_callback: z.string(),
  args: z.record(z.object({
    required: z.boolean(),
    type: z.string(),
    description: z.string(),
  })),
});

export const shortcodeSchema = z.object({
  name: z.string(),
  attributes: z.array(z.string()),
  defaultContent: z.string(),
});

export const widgetFieldSchema = z.object({
  name: z.string(),
  type: z.string(),
  label: z.string(),
});

export const widgetSchema = z.object({
  name: z.string(),
  description: z.string(),
  fields: z.array(widgetFieldSchema),
});

export const cronJobSchema = z.object({
  name: z.string(),
  schedule: z.string(),
  recurrence: z.string(),
});

export const settingsFieldSchema = z.object({
  name: z.string(),
  type: z.string(),
  label: z.string(),
  default: z.string(),
});

export const settingsPageSchema = z.object({
  title: z.string(),
  fields: z.array(settingsFieldSchema),
});

export const pluginSchema = z.object({
  info: pluginInfoSchema,
  adminPages: z.array(adminPageSchema),
  customPostTypes: z.array(customPostTypeSchema),
  customTaxonomies: z.array(customTaxonomySchema),
  restEndpoints: z.array(restEndpointSchema),
  shortcodes: z.array(shortcodeSchema),
  widgets: z.array(widgetSchema),
  cronJobs: z.array(cronJobSchema),
  settingsPage: settingsPageSchema,
});