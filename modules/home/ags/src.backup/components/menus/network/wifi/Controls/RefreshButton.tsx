import { Gtk } from 'astal/gtk4';
import { bind } from 'astal';
import AstalNetwork from 'gi://AstalNetwork?version=0.1';
import { isPrimaryClick } from 'src/lib/events/mouse';
import { NetworkService } from 'src/services/network';
import { onPrimaryClick } from 'src/lib/shared/eventHandlers';

const networkService = NetworkService.getInstance();
const astalNetwork = AstalNetwork.get_default();

export const RefreshButton = (): JSX.Element => {
    return (
        <button
            className="menu-icon-button search network"
            valign={Gtk.Align.CENTER}
            halign={Gtk.Align.END}
            setup={(self) => {
                onPrimaryClick(self, (_, event) => {
                    if (isPrimaryClick(event)) {
                        astalNetwork.wifi?.scan();
                    }
                });
            }}
        >
            <icon
                className={bind(networkService.wifi.isScanning).as((scanning) =>
                    scanning ? 'spinning-icon' : '',
                )}
                icon="view-refresh-symbolic"
            />
        </button>
    );
};
