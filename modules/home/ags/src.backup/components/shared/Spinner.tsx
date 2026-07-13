import { Gtk } from 'astal/gtk4';
import { GObject } from 'astal';

class Spinner extends Gtk.Spinner {
    static {
        GObject.registerClass({ GTypeName: 'Spinner' }, this);
    }

    constructor(props: Record<string, any>) {
        const { setup, className, ...rest } = props;
        super(rest);
        if (className) this.add_css_class(className);
        if (setup) setup(this);
    }
}

export default Spinner;
