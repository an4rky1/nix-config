import { Gtk } from 'astal/gtk4';
import { GObject } from 'astal';

class Menu extends Gtk.Popover {
    static {
        GObject.registerClass({ GTypeName: 'Menu' }, this);
    }

    constructor(props: Partial<Gtk.Popover.ConstructorProps> & { setup?: (self: Menu) => void; className?: string }) {
        const { setup, className, ...rest } = props as any;
        super(rest);
        if (className) this.add_css_class(className);
        if (setup) setup(this);
    }
}

export default Menu;
