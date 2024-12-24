import { Widget } from '../types';

export function generateWidgets(widgets: Widget[], slug: string): string {
  return `<?php
${widgets.map(widget => `
class ${slug}_${widget.name}_Widget extends WP_Widget {
    public function __construct() {
        parent::__construct(
            '${slug}_${widget.name.toLowerCase()}',
            __('${widget.name}', '${slug}'),
            array('description' => __('${widget.description}', '${slug}'))
        );
    }

    public function widget($args, $instance) {
        echo $args['before_widget'];
        
        if (!empty($instance['title'])) {
            echo $args['before_title'] . 
                 apply_filters('widget_title', $instance['title']) . 
                 $args['after_title'];
        }

        ?>
        <div class="${widget.name.toLowerCase()}-widget-content">
            <?php
            ${widget.fields.map(field => `
            if (!empty($instance['${field.name}'])) {
                echo '<div class="${field.name}-field">';
                echo esc_html($instance['${field.name}']);
                echo '</div>';
            }`).join('\n            ')}
            ?>
        </div>
        <?php

        echo $args['after_widget'];
    }

    public function form($instance) {
        $title = !empty($instance['title']) ? $instance['title'] : '';
        ?>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('title')); ?>">
                <?php esc_attr_e('Title:', '${slug}'); ?>
            </label>
            <input 
                class="widefat" 
                id="<?php echo esc_attr($this->get_field_id('title')); ?>" 
                name="<?php echo esc_attr($this->get_field_name('title')); ?>" 
                type="text" 
                value="<?php echo esc_attr($title); ?>"
            >
        </p>
        <?php
        ${widget.fields.map(field => `
        $${field.name} = !empty($instance['${field.name}']) ? $instance['${field.name}'] : '';
        ?>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('${field.name}')); ?>">
                <?php esc_attr_e('${field.label}:', '${slug}'); ?>
            </label>
            <input 
                class="widefat" 
                id="<?php echo esc_attr($this->get_field_id('${field.name}')); ?>" 
                name="<?php echo esc_attr($this->get_field_name('${field.name}')); ?>" 
                type="${field.type}" 
                value="<?php echo esc_attr($${field.name}); ?>"
            >
        </p>
        <?php`).join('\n        ')}
    }

    public function update($new_instance, $old_instance) {
        $instance = array();
        $instance['title'] = (!empty($new_instance['title'])) ? 
            strip_tags($new_instance['title']) : '';
            
        ${widget.fields.map(field => `
        $instance['${field.name}'] = (!empty($new_instance['${field.name}'])) ? 
            strip_tags($new_instance['${field.name}']) : '';`).join('\n        ')}
            
        return $instance;
    }
}

function ${slug}_register_${widget.name.toLowerCase()}_widget() {
    register_widget('${slug}_${widget.name}_Widget');
}
add_action('widgets_init', '${slug}_register_${widget.name.toLowerCase()}_widget');`).join('\n\n')}`;
}