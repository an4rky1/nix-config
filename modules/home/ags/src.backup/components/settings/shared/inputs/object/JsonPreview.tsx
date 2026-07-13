import { Gtk } from 'astal/gtk4';
import { JsonPreviewProps } from './types';
import { bind } from 'astal';
import { onPrimaryClick } from 'src/lib/shared/eventHandlers';

export const JsonPreview = ({ value, onOpen, isExpanded }: JsonPreviewProps): JSX.Element => {
    return (
        <box
            className={bind(isExpanded).as((expanded) => `json-preview ${expanded ? 'expanded' : ''}`)}
            hexpand
            setup={(self) => {
                onPrimaryClick(self, (_, event) => {
                    onOpen();
                });
            }}
        >
            <label
                className="preview-text"
                label={value.as((val) => JSON.stringify(val))}
                halign={Gtk.Align.START}
                truncate
                hexpand
                maxWidthChars={55}
            />
            <label
                className="preview-icon txt-icon"
                label={bind(isExpanded).as((expanded) => (expanded ? '󰅖' : '󰏫'))}
            />
        </box>
    );
};
