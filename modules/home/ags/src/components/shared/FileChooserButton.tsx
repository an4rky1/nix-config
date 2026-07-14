import { Gtk } from 'astal/gtk4';
import { GObject } from 'astal';

class FileChooserButton extends Gtk.FileChooserButton {
    static {
        GObject.registerClass({ GTypeName: 'FileChooserButton' }, this);
    }

    constructor(props: Record<string, any>) {
        const { setup, className, ...rest } = props;
        super(rest);
        if (className) this.add_css_class(className);
        if (setup) setup(this);
    }
}

export default FileChooserButton;
