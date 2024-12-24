import { Shortcode } from '../types';

export function generateShortcodes(shortcodes: Shortcode[], slug: string): string {
  return `<?php
${shortcodes.map(shortcode => `
function ${slug}_${shortcode.name}_shortcode($atts = array(), $content = null) {
    $attributes = shortcode_atts(array(
        ${shortcode.attributes.map(attr => `'${attr}' => '',`).join('\n        ')}
    ), $atts);

    ob_start();
    ?>
    <div class="${shortcode.name}-shortcode">
        <?php echo do_shortcode($content ?? '${shortcode.defaultContent}'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('${shortcode.name}', '${slug}_${shortcode.name}_shortcode');`).join('\n\n')}`;
}