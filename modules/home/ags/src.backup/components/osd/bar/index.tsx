import { Gtk } from 'astal/gtk4';
import LevelBar from 'src/components/shared/LevelBar';
import { setupOsdBar } from './helpers';
import { OSDOrientation } from 'src/lib/options/types';

export const OSDBar = ({ orientation }: OSDBarProps): JSX.Element => {
    const barOrientation = orientation === 'vertical' ? Gtk.Orientation.VERTICAL : Gtk.Orientation.HORIZONTAL;

    return (
        <box className={'osd-bar-container'}>
            <LevelBar
                orientation={barOrientation}
                inverted={orientation === 'vertical'}
                mode={Gtk.LevelBarMode.CONTINUOUS}
                setup={(self) => {
                    self.add_css_class('osd-bar');
                    setupOsdBar(self);
                }}
            />
        </box>
    );
};

interface OSDBarProps {
    orientation: OSDOrientation;
}
