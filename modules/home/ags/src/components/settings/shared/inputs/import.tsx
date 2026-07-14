import { ThemeExportData } from '../../../../lib/options/types';
import { importFiles, saveFileDialog } from '../FileChooser';
import { isPrimaryClick } from '../../../../lib/events/mouse';
import { onPrimaryClick } from '../../../../lib/shared/eventHandlers';

export const ImportInputter = ({ exportData }: ImportInputterProps): JSX.Element => {
    return (
        <box>
            <button
                className="options-import"
                setup={(self) => {
                    onPrimaryClick(self, (_, event) => {
                        if (isPrimaryClick(event)) {
                            importFiles(exportData?.themeOnly as boolean);
                        }
                    });
                }}
            >
                <label label="import" />
            </button>
            <button
                className="options-export"
                setup={(self) => {
                    onPrimaryClick(self, (_, event) => {
                        if (isPrimaryClick(event)) {
                            saveFileDialog(exportData?.filePath as string, exportData?.themeOnly as boolean);
                        }
                    });
                }}
            >
                <label label="export" />
            </button>
        </box>
    );
};

interface ImportInputterProps {
    exportData?: ThemeExportData;
}
