import { Gtk } from 'astal/gtk4';
import { JsonEditorProps } from './types';
import SourceView from '../../../../shared/SourceView';
import { handleKeyPress, setupSourceView } from './helpers';

import Scrollable from '../../../../shared/Scrollable';

export const JsonEditor = ({ editorText, onSave, onTextChange }: JsonEditorProps): JSX.Element => {
    return (
        <Scrollable
            vscroll={Gtk.PolicyType.AUTOMATIC}
            hscroll={Gtk.PolicyType.AUTOMATIC}
            className="json-editor-scrollable-container"
        >
            <SourceView
                className="json-editor-sourceview"
                monospace
                editable={true}
                canFocus={true}
                wrapMode={Gtk.WrapMode.NONE}
                showLineNumbers={true}
                highlightCurrentLine={true}
                onKeyPressEvent={(self, event) => handleKeyPress(self, event, onSave)}
                setup={(self) => setupSourceView(self, editorText, onTextChange)}
            />
        </Scrollable>
    );
};
