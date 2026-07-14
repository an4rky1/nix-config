import { bind } from 'astal';
import { Gtk } from 'astal/gtk4'
import Icon from '../../../shared/Icon';;
import icons from '../../../../lib/icons/icons';
import { RowProps } from '../../../../lib/options/types';
import { isPrimaryClick } from '../../../../lib/events/mouse';
import { onPrimaryClick } from '../../../../lib/shared/eventHandlers';

export const ResetButton = <T extends string | number | boolean | object>({
    ...props
}: RowProps<T>): JSX.Element => {
    return (
        <button
            className={'reset-options'}
            setup={(self) => {
                onPrimaryClick(self, (_, event) => {
                    if (isPrimaryClick(event)) {
                        props.opt.reset();
                    }
                });
            }}
            sensitive={bind(props.opt).as((v) => v !== props.opt.initial)}
            valign={Gtk.Align.START}
        >
            <Icon icon={icons.ui.refresh} />
        </button>
    );
};
