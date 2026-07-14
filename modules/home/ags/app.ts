import './src/lib/session';
import './src/style';
import 'src/core/behaviors/bar';
import { App } from 'astal/gtk4';
import { runCLI } from 'src/services/cli/commander';
import { InitializationService } from 'src/core/initialization';
import { themeManager } from 'src/style';

App.start({
    instanceName: 'hyprpanel',
    requestHandler: (request: string, res: (response: unknown) => void) => runCLI(request, res),
    main: () => {
        themeManager.applyCss();
        InitializationService.initialize();
    },
});

export {};
