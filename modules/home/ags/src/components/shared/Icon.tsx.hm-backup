import { Gtk } from 'astal/gtk4';
import { GObject } from 'astal';

class Icon extends Gtk.Image {
    static {
        GObject.registerClass({ GTypeName: 'Icon' }, this);
    }

    constructor(props: Record<string, any>) {
        const { setup, className, icon, gicon, tooltipMarkup, ...rest } = props;
        super(rest);
        if (icon) {
            const iconName = typeof icon === 'string' ? icon : String(icon);
            this.set_from_icon_name(iconName);
        }
        if (gicon) {
            const giconValue = typeof gicon.get === 'function' ? gicon.get() : gicon;
            if (giconValue) {
                try {
                    if (typeof giconValue === 'string') {
                        this.set_from_icon_name(giconValue);
                    } else {
                        this.set_from_gicon(giconValue);
                    }
                } catch (e) {
                    console.error('Failed to set icon:', e);
                }
            }
        }
        if (tooltipMarkup) {
            this.set_tooltip_markup(
                typeof tooltipMarkup === 'string' ? tooltipMarkup : String(tooltipMarkup),
            );
        }
        if (className) this.add_css_class(className);
        if (setup) setup(this);
    }
}

export default Icon;