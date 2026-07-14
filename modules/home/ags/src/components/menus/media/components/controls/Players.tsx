import { bind, Variable } from 'astal';
import { Astal, Gtk, Widget } from 'astal/gtk4';
import { getNextPlayer, getPreviousPlayer } from './helpers';
import AstalMpris from 'gi://AstalMpris?version=0.1';
import { isPrimaryClick } from '../../../../../lib/events/mouse';
import { onPrimaryClick } from '../../../../../lib/shared/eventHandlers';
import options from '../../../../../configuration';
import { filterPlayers } from '../../../../../lib/shared/media';

const mprisService = AstalMpris.get_default();

export const PreviousPlayer = (): JSX.Element => {
    const { ignore } = options.menus.media;

    const className = Variable.derive(
        [bind(mprisService, 'players'), bind(ignore)],
        (players: AstalMpris.Player[], ignoredApps: string[]) => {
            const filteredPlayers = filterPlayers(players, ignoredApps);
            const isDisabled = filteredPlayers.length <= 1 ? 'disabled' : 'enabled';

            return `media-indicator-control-button ${isDisabled}`;
        },
    );

    return (
        <button
            className={className()}
            halign={Gtk.Align.CENTER}
            hasTooltip
            tooltipText={'Previous Player'}
            setup={(self) => {
                onPrimaryClick(self, (_, event) => {
                    if (!isPrimaryClick(event)) {
                        return;
                    }

                    const allPlayers = mprisService.get_players();
                    const filteredPlayers = filterPlayers(allPlayers, ignore.get());
                    const isDisabled = filteredPlayers.length <= 1;

                    if (!isDisabled) {
                        getPreviousPlayer();
                    }
                });
            }}
            onDestroy={() => {
                className.drop();
            }}
        >
            <label label={'󰅁'} />
        </button>
    );
};

export const NextPlayer = (): JSX.Element => {
    const { ignore } = options.menus.media;

    const className = Variable.derive(
        [bind(mprisService, 'players'), bind(ignore)],
        (players: AstalMpris.Player[], ignoredApps: string[]) => {
            const filteredPlayers = filterPlayers(players, ignoredApps);
            const isDisabled = filteredPlayers.length <= 1 ? 'disabled' : 'enabled';
            return `media-indicator-control-button ${isDisabled}`;
        },
    );

    return (
        <button
            className={className()}
            halign={Gtk.Align.CENTER}
            hasTooltip
            tooltipText={'Next Player'}
            setup={(self) => {
                onPrimaryClick(self, (_, event) => {
                    if (!isPrimaryClick(event)) {
                        return;
                    }

                    const allPlayers = mprisService.get_players();
                    const filteredPlayers = filterPlayers(allPlayers, ignore.get());
                    const isDisabled = filteredPlayers.length <= 1;

                    if (!isDisabled) {
                        getNextPlayer();
                    }
                });
            }}
            onDestroy={() => {
                className.drop();
            }}
        >
            <label label={'󰅂'} />
        </button>
    );
};
