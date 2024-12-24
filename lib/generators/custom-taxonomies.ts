import { CustomTaxonomy } from '../types';

export function generateCustomTaxonomies(taxonomies: CustomTaxonomy[], slug: string): string {
  return `<?php
function ${slug}_register_custom_taxonomies() {
    ${taxonomies.map(tax => `
    register_taxonomy('${tax.name}', array(${tax.post_types.map(pt => `'${pt}'`).join(', ')}), array(
        'labels' => array(
            'name' => _x('${tax.plural}', 'Taxonomy General Name', '${slug}'),
            'singular_name' => _x('${tax.singular}', 'Taxonomy Singular Name', '${slug}'),
            'menu_name' => __('${tax.plural}', '${slug}'),
            'all_items' => __('All ${tax.plural}', '${slug}'),
            'edit_item' => __('Edit ${tax.singular}', '${slug}'),
            'view_item' => __('View ${tax.singular}', '${slug}'),
            'update_item' => __('Update ${tax.singular}', '${slug}'),
            'add_new_item' => __('Add New ${tax.singular}', '${slug}'),
        ),
        'hierarchical' => ${tax.hierarchical},
        'public' => ${tax.public},
        'show_ui' => ${tax.show_ui},
        'show_in_menu' => ${tax.show_in_menu},
        'show_in_nav_menus' => ${tax.show_in_nav_menus},
        'show_in_rest' => ${tax.show_in_rest},
        'rest_base' => '${tax.rest_base}',
        'rest_controller_class' => '${tax.rest_controller_class}',
    ));`).join('\n    ')}
}
add_action('init', '${slug}_register_custom_taxonomies');`;
}