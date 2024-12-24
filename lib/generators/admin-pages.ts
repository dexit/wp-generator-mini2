import { AdminPage } from '../types';

export function generateAdminPages(pages: AdminPage[], slug: string): string {
  return `<?php
function ${slug}_add_admin_menu() {
    ${pages.map(page => `add_menu_page(
        '${page.title}',
        '${page.title}',
        '${page.capability}',
        '${page.slug}',
        '${slug}_${page.slug}_page',
        '${page.icon}',
        ${page.position}
    );`).join('\n    ')}
}
add_action('admin_menu', '${slug}_add_admin_menu');

${pages.map(page => `
function ${slug}_${page.slug}_page() {
    if (!current_user_can('${page.capability}')) {
        wp_die(__('You do not have sufficient permissions to access this page.'));
    }
    ?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
        <div class="admin-page-content">
            <!-- Page content will be added here -->
        </div>
    </div>
    <?php
}`).join('\n')}`;
}