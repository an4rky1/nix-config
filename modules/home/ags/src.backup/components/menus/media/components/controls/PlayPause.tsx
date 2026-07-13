import { Astal, Gtk, Widget } from 'astal/gtk4';
import { bind } from 'astal';
import Icon from 'src/components/shared/Icon';
import { getPlaybackIcon } from './helpers';
import AstalMpris from 'gi://AstalMpris?version=0.1';
import { canPlay, playbackStatus, activePlayer } from 'src/services/media';
import { isPrimaryClick } from 'src/lib/events/mouse';
import { onPrimaryClick } from 'src/lib/shared/eventHandlers';

export const PlayPause = (): JSX.Element => {
    const className = bind(canPlay).as((canPlay) => {
        return `media-indicator-control-button play ${canPlay ? 'enabled' : 'disabled'}`;
    });

    const icon = bind(playbackStatus).as((status) => {
        return getPlaybackIcon(status);
    });

    const tooltipText = bind(playbackStatus).as((playbackStatus) => {
        return playbackStatus === AstalMpris.PlaybackStatus.PLAYING ? 'Pause' : 'Play';
    });

    return (
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

                    if (currentPlayer && currentPlayer.can_play) {
                        currentPlayer.play_pause();
                    }
                });
            }}
        >
            <Icon icon={icon} />
        </button>
    );
};
