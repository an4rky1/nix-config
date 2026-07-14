import icons from '../../../../../lib/icons/icons';
import { Astal, Gtk, Widget } from 'astal/gtk4';
import { bind } from 'astal';
import Icon from '../../../../shared/Icon';
import { isLoopActive, isShuffleActive, loopIconMap, loopTooltipMap } from './helpers';
import AstalMpris from 'gi://AstalMpris?version=0.1';
import { loopStatus, activePlayer, shuffleStatus } from '../../../../../services/media';
import { isPrimaryClick } from '../../../../../lib/events/mouse';
import { onPrimaryClick } from '../../../../../lib/shared/eventHandlers';

export const Loop = (): JSX.Element => {
    const className = bind(loopStatus).as((status) => {
        const isActive = isLoopActive(status);
        const loopingAllowed =
            status !== null && status !== AstalMpris.Loop.UNSUPPORTED ? 'enabled' : 'disabled';

        return `media-indicator-control-button loop ${isActive} ${loopingAllowed}`;
    });

    const tooltipText = bind(loopStatus).as((status) => {
        if (status === null) {
            return 'Unavailable';
        }
        return loopTooltipMap[status];
    });

    const iconBinding = bind(loopStatus).as((status) => {
        if (status === null || status === AstalMpris.Loop.UNSUPPORTED) {
            return icons.mpris.loop.none;
        }
        return icons.mpris.loop[loopIconMap[status]];
    });

    return (
        <box className="media-indicator-control loop">
            <button
                className={className}
                halign={Gtk.Align.CENTER}
                hasTooltip
                tooltipText={tooltipText}
                setup={(self) => {
                    onPrimaryClick(self, (_, event) => {
                        if (!isPrimaryClick(event)) {
                            return;
                        }

                        const currentPlayer = activePlayer.get();

                        if (currentPlayer && currentPlayer.loopStatus !== AstalMpris.Loop.UNSUPPORTED) {
                            currentPlayer.loop();
                        }
                    });
                }}
            >
                <Icon icon={iconBinding} />
            </button>
        </box>
    );
};

export const Shuffle = (): JSX.Element => {
    const className = bind(shuffleStatus).as((status) => {
        const isActive = isShuffleActive(status);
        const shuffleAllowed =
            status !== null && status !== AstalMpris.Shuffle.UNSUPPORTED ? 'enabled' : 'disabled';

        return `media-indicator-control-button shuffle ${isActive} ${shuffleAllowed}`;
    });

    const tooltipText = bind(shuffleStatus).as((status) => {
        if (status === null || status === AstalMpris.Shuffle.UNSUPPORTED) {
            return 'Unavailable';
        }

        const shuffleTooltipMap = {
            [AstalMpris.Shuffle.ON]: 'Shuffling',
            [AstalMpris.Shuffle.OFF]: 'Not Shuffling',
            [AstalMpris.Shuffle.UNSUPPORTED]: 'Unsupported',
        };

        return shuffleTooltipMap[status];
    });

    return (
        <box className={'media-indicator-control shuffle'}>
            <button
                className={className}
                halign={Gtk.Align.CENTER}
                hasTooltip
                tooltipText={tooltipText}
                setup={(self) => {
                    onPrimaryClick(self, (_, event) => {
                        if (!isPrimaryClick(event)) {
                            return;
                        }

                        const currentPlayer = activePlayer.get();

                        if (currentPlayer && currentPlayer.shuffleStatus !== AstalMpris.Shuffle.UNSUPPORTED) {
                            currentPlayer.shuffle();
                        }
                    });
                }}
            >
                <Icon icon={icons.mpris.shuffle.enabled} />
            </button>
        </box>
    );
};
