import { PluginData } from '../types';

export function generatePluginClass(data: PluginData): string {
  const className = data.info.slug.replace(/-/g, '_').replace(/(?:^|\s)\S/g, a => a.toUpperCase());
  
  return `<?php
class ${className} {
    protected $plugin_name;
    protected $version;

    public function __construct() {
        $this->plugin_name = '${data.info.slug}';
        $this->version = '${data.info.slug.toUpperCase()}_VERSION';
        $this->load_dependencies();
    }

    private function load_dependencies() {
        ${data.customPostTypes.length > 0 ? "require_once plugin_dir_path(dirname(__FILE__)) . 'includes/custom-post-types.php';" : ''}
        ${data.customTaxonomies.length > 0 ? "require_once plugin_dir_path(dirname(__FILE__)) . 'includes/custom-taxonomies.php';" : ''}
        ${data.restEndpoints.length > 0 ? "require_once plugin_dir_path(dirname(__FILE__)) . 'includes/rest-api.php';" : ''}
        ${data.adminPages.length > 0 ? "require_once plugin_dir_path(dirname(__FILE__)) . 'admin/admin-pages.php';" : ''}
        ${data.settingsPage.fields.length > 0 ? "require_once plugin_dir_path(dirname(__FILE__)) . 'admin/settings-page.php';" : ''}
        ${data.shortcodes.length > 0 ? "require_once plugin_dir_path(dirname(__FILE__)) . 'includes/shortcodes.php';" : ''}
        ${data.widgets.length > 0 ? "require_once plugin_dir_path(dirname(__FILE__)) . 'includes/widgets.php';" : ''}
    }

    public function run() {
        $this->define_admin_hooks();
        $this->define_public_hooks();
    }

    private function define_admin_hooks() {
        // Admin-specific hooks
    }

    private function define_public_hooks() {
        // Public-facing hooks
    }
}`;
}