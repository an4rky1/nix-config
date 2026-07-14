import Gtk from 'gi://Gtk?version=4.0';
import GObject from 'gi://GObject?version=2.0';

class Scrollable extends Gtk.ScrolledWindow {
    static {
        GObject.registerClass({ GTypeName: 'Scrollable' }, this);
    }

    constructor(props: Record<string, any>) {
        const { setup, className, vscroll, hscroll, ...rest } = props;
        super(rest);
        if (vscroll !== undefined) {
            this.set_policy(Gtk.PolicyType.NEVER, vscroll);
        }
        if (hscroll !== undefined) {
            this.set_policy(hscroll, Gtk.PolicyType.NEVER);
        }
        if (className) this.add_css_class(className);
        if (setup) setup(this);
    }

    setChildren(self: Scrollable, children: any[]) {
        const child = children.flat(Infinity).find((ch) => ch instanceof Gtk.Widget);
        if (child) {
            self.set_child(child);
        }
    }
}

export default Scrollable;
