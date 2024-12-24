import { RestEndpoint } from '../types';

export function generateRestEndpoints(endpoints: RestEndpoint[], slug: string): string {
  return `<?php
function ${slug}_register_rest_routes() {
    ${endpoints.map(endpoint => `
    register_rest_route('${slug}/v1', '/${endpoint.name}', array(
        'methods' => WP_REST_Server::${endpoint.methods.join(' | ')},
        'callback' => '${endpoint.callback}',
        'permission_callback' => '${endpoint.permission_callback}',
        'args' => array(
            ${Object.entries(endpoint.args).map(([key, arg]) => `
            '${key}' => array(
                'required' => ${arg.required},
                'type' => '${arg.type}',
                'description' => '${arg.description}',
            ),`).join('\n            ')}
        ),
    ));`).join('\n    ')}
}
add_action('rest_api_init', '${slug}_register_rest_routes');

${endpoints.map(endpoint => `
function ${endpoint.callback}($request) {
    // Implementation for ${endpoint.name} endpoint
    return new WP_REST_Response(array('success' => true), 200);
}

function ${endpoint.permission_callback}($request) {
    return current_user_can('edit_posts');
}`).join('\n\n')}`;
}