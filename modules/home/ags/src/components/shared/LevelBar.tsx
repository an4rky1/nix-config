import { Gtk } from 'astal/gtk4';
import { GObject } from 'astal';

class LevelBar extends Gtk.LevelBar {
    static {
        GObject.registerClass({ GTypeName: 'LevelBar' }, this);
    }

    constructor(props: Record<string, any>) {
        const { setup, className, ...rest } = props;
        super(rest);
        if (className) this.add_css_class(className);
        if (setup) setup(this);
    }
}

export default LevelBar;
