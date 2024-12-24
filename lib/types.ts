export interface PluginInfo {
  name: string;
  slug: string;
  description: string;
}

export interface AdminPage {
  title: string;
  slug: string;
  parent_slug: string;
  capability: string;
  icon: string;
  position: number;
}

export interface CustomPostType {
  name: string;
  singular: string;
  plural: string;
  public: boolean;
  has_archive: boolean;
  supports: string[];
  menu_icon: string;
  rest_base: string;
  rest_controller_class: string;
}

export interface CustomTaxonomy {
  name: string;
  singular: string;
  plural: string;
  post_types: string[];
  hierarchical: boolean;
  public: boolean;
  show_ui: boolean;
  show_in_menu: boolean;
  show_in_nav_menus: boolean;
  show_in_rest: boolean;
  rest_base: string;
  rest_controller_class: string;
}

export interface RestEndpoint {
  name: string;
  methods: string[];
  callback: string;
  permission_callback: string;
  args: {
    [key: string]: {
      required: boolean;
      type: string;
      description: string;
    };
  };
}

export interface Shortcode {
  name: string;
  attributes: string[];
  defaultContent: string;
}

export interface Widget {
  name: string;
  description: string;
  fields: {
    name: string;
    type: string;
    label: string;
  }[];
}

export interface CronJob {
  name: string;
  schedule: string;
  recurrence: string;
}

export interface SettingsPage {
  title: string;
  fields: {
    name: string;
    type: string;
    label: string;
    default: string;
  }[];
}

export interface PluginData {
  info: PluginInfo;
  adminPages: AdminPage[];
  customPostTypes: CustomPostType[];
  customTaxonomies: CustomTaxonomy[];
  restEndpoints: RestEndpoint[];
  shortcodes: Shortcode[];
  widgets: Widget[];
  cronJobs: CronJob[];
  settingsPage: SettingsPage;
}