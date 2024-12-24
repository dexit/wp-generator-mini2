import { CustomPostType } from '../types';

export function generateCustomPostTypes(postTypes: CustomPostType[], slug: string): string {
  return `<?php
function ${slug}_register_custom_post_types() {
    ${postTypes.map(cpt => `
    register_post_type('${cpt.name}', array(
        'labels' => array(
            'name' => _x('${cpt.plural}', 'Post Type General Name', '${slug}'),
            'singular_name' => _x('${cpt.singular}', 'Post Type Singular Name', '${slug}'),
            'menu_name' => __('${cpt.plural}', '${slug}'),
            'add_new' => __('Add New', '${slug}'),
            'add_new_item' => __('Add New ${cpt.singular}', '${slug}'),
            'edit_item' => __('Edit ${cpt.singular}', '${slug}'),
            'view_item' => __('View ${cpt.singular}', '${slug}'),
            'search_items' => __('Search ${cpt.plural}', '${slug}'),
        ),
        'public' => ${cpt.public},
        'has_archive' => ${cpt.has_archive},
        'supports' => array(${cpt.supports.map(s => `'${s}'`).join(', ')}),
        'menu_icon' => '${cpt.menu_icon}',
        'show_in_rest' => true,
        'rest_base' => '${cpt.rest_base}',
        'rest_controller_class' => '${cpt.rest_controller_class}',
    ));`).join('\n    ')}
}
add_action('init', '${slug}_register_custom_post_types');`;
}