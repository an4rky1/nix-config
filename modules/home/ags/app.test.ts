import { App, Gtk } from 'astal/gtk4';
import { WidgetContainer } from './src/components/bar/shared/widgetContainer';

App.start({
    instanceName: 'test',
    main: () => {
        try {
            const inner = <label label="test" />;
            console.log('inner type:', typeof inner);
            console.log('inner props:', inner.props);
            console.log('inner component:', inner.component);
            
            const wrapped = WidgetContainer(inner as any);
            console.log('WidgetContainer returned:', typeof wrapped);
        } catch (e) {
            console.error('WidgetContainer error:', e);
        }
    },
});
