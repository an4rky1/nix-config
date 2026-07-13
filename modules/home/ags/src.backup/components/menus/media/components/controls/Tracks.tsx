import icons from 'src/lib/icons/icons';
import { Astal, Gtk, Widget } from 'astal/gtk4';
import { bind } from 'astal';
import Icon from 'src/components/shared/Icon';
import { canGoNext, activePlayer, canGoPrevious } from 'src/services/media';
import { isPrimaryClick } from 'src/lib/events/mouse';
import { onPrimaryClick } from 'src/lib/shared/eventHandlers';

export const NextTrack = (): JSX.Element => {
    const className = bind(canGoNext).as((skippable) => {
        const nextStatus = skippable ? 'enabled' : 'disabled';

        return `media-indicator-control-button next ${nextStatus}`;
    });

    return (
        <box className={'media-indicator-control next'}>
            <button
                className={className}
                halign={Gtk.Align.CENTER}
                hasTooltip
                tooltipText={'Next Track'}
                setup={(self) => {
                    onPrimaryClick(self, (_, event) => {
                        if (!isPrimaryClick(event)) {
                            return;
                        }

                        const currentPlayer = activePlayer.get();

                        if (currentPlayer && currentPlayer.can_go_next) {
                            currentPlayer.next();
                        }
                    });
                }}
            >
                <Icon icon={icons.mpris.next} />
            </button>
        </box>
    );
};

export const PreviousTrack = (): JSX.Element => {
    const className = bind(canGoPrevious).as((rewindable) => {
        const prevStatus = rewindable ? 'enabled' : 'disabled';

        return `media-indicator-control-button prev ${prevStatus}`;
    });

    return (
        <button
            className={className}
            halign={Gtk.Align.CENTER}
            hasTooltip
            tooltipText={'Previous Track'}
            setup={(self) => {
                onPrimaryClick(self, (_, event) => {
                    if (!isPrimaryClick(event)) {
                        return;
                    }

                    const currentPlayer = activePlayer.get();

                    if (currentPlayer && currentPlayer.can_go_previous) {
                        currentPlayer.previous();
                    }
                });
            }}
        >
            <Icon icon={icons.mpris.prev} />
        </button>
    );
};
