import { SettingsPage } from '../types';

export function generateSettingsPage(settings: SettingsPage, slug: string): string {
  return `<?php
function ${slug}_register_settings() {
    register_setting(
        '${slug}_options',
        '${slug}_settings',
        array('sanitize_callback' => '${slug}_sanitize_settings')
    );

    add_settings_section(
        '${slug}_settings_section',
        __('${settings.title}', '${slug}'),
        '${slug}_settings_section_callback',
        '${slug}'
    );

    ${settings.fields.map(field => `
    add_settings_field(
        '${field.name}',
        __('${field.label}', '${slug}'),
        '${slug}_render_${field.name}_field',
        '${slug}',
        '${slug}_settings_section'
    );`).join('\n    ')}
}
add_action('admin_init', '${slug}_register_settings');

function ${slug}_settings_section_callback() {
    echo '<p>' . __('Configure your plugin settings below:', '${slug}') . '</p>';
}

${settings.fields.map(field => `
function ${slug}_render_${field.name}_field() {
    $options = get_option('${slug}_settings');
    $value = isset($options['${field.name}']) ? $options['${field.name}'] : '${field.default}';
    ?>
    <input 
        type="${field.type}" 
        name="${slug}_settings[${field.name}]" 
        value="<?php echo esc_attr($value); ?>"
    />
    <?php
}`).join('\n\n')}

function ${slug}_sanitize_settings($input) {
    $sanitized = array();
    ${settings.fields.map(field => `
    if (isset($input['${field.name}'])) {
        $sanitized['${field.name}'] = sanitize_text_field($input['${field.name}']);
    }`).join('\n    ')}
    return $sanitized;
}

function ${slug}_add_settings_page() {
    add_options_page(
        '${settings.title}',
        '${settings.title}',
        'manage_options',
        '${slug}',
        '${slug}_render_settings_page'
    );
}
add_action('admin_menu', '${slug}_add_settings_page');

function ${slug}_render_settings_page() {
    ?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
        <form action="options.php" method="post">
            <?php
            settings_fields('${slug}_options');
            do_settings_sections('${slug}');
            submit_button();
            ?>
        </form>
    </div>
    <?php
}`;
}