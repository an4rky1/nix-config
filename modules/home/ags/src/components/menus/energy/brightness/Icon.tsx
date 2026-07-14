import { Gtk } from 'astal/gtk4';
import icons from '../../../../lib/icons/icons';

export const BrightnessIcon = (): JSX.Element => {
    return (
        <icon
            className={'brightness-slider-icon'}
            valign={Gtk.Align.CENTER}
            icon={icons.brightness.screen}
            vexpand
        />
    );
};
