import { bind } from 'astal';
import { Gtk } from 'astal/gtk4';
import AstalWp from 'gi://AstalWp?version=0.1';
import options from '../../../../../configuration';
import { capitalizeFirstLetter } from '../../../../../lib/string/formatters';

const { raiseMaximumVolume } = options.menus.volume;

export const Slider = ({ device, type }: SliderProps): JSX.Element => {
    return (
        <box vertical>
            <label
                className={`menu-active ${type}`}
                halign={Gtk.Align.START}
                truncate
                hexpand
                wrap
                label={bind(device, 'description').as((description) =>
                    capitalizeFirstLetter(description ?? `Unknown ${type} Device`),
                )}
            />
            <slider
                value={bind(device, 'volume')}
                className={`menu-active-slider menu-slider ${type}`}
                drawValue={false}
                hexpand
                min={0}
                max={type === 'playback' ? bind(raiseMaximumVolume).as((raise) => (raise ? 1.5 : 1)) : 1}
                onChangeValue={({ value, dragging }) => {
                    if (dragging) {
                        device.set_volume(value);
                        device.set_mute(false);
                    }
                }}
                setup={(self) => {
                    const controller = new Gtk.EventControllerScroll();
                    controller.set_flags(Gtk.EventControllerScrollFlags.BOTH_AXES);
                    controller.connect('scroll', (_c, _dx, dy) => {
                        if (dy > 0) {
                            device.set_volume(Math.max(0, device.volume - 0.05));
                        } else if (dy < 0) {
                            const newVolume = device.volume + 0.05;
                            const minVolume = raiseMaximumVolume.get() ? 1.5 : 1;
                            device.set_volume(Math.min(newVolume, minVolume));
                        }
                    });
                    self.add_controller(controller);
                }}
            />
        </box>
    );
};

interface SliderProps {
    device: AstalWp.Endpoint;
    type: 'playback' | 'input';
}
