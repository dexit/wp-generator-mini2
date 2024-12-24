import { PluginInfo } from '../types';

export function generatePluginFile(name: string, slug: string, description: string): string {
  return `<?php
/**
 * Plugin Name: ${name}
 * Plugin URI: http://example.com/plugin-name-uri/
 * Description: ${description}
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: http://example.com/
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: ${slug}
 * Domain Path: /languages
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

define('${slug.toUpperCase()}_VERSION', '1.0.0');

/**
 * The code that runs during plugin activation.
 */
function activate_${slug.replace(/-/g, '_')}() {
    // Activation code here
}

/**
 * The code that runs during plugin deactivation.
 */
function deactivate_${slug.replace(/-/g, '_')}() {
    // Deactivation code here
}

register_activation_hook(__FILE__, 'activate_${slug.replace(/-/g, '_')}');
register_deactivation_hook(__FILE__, 'deactivate_${slug.replace(/-/g, '_')}');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/class-${slug}.php';

/**
 * Begins execution of the plugin.
 */
function run_${slug.replace(/-/g, '_')}() {
    $plugin = new ${slug.replace(/-/g, '_').replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); })}();
    $plugin->run();
}
run_${slug.replace(/-/g, '_')}();`;
}