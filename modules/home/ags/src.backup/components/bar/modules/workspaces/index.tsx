import { initThrottledScrollHandlers } from './helpers/utils';
import { WorkspaceModule } from './workspaces';
import { bind, Variable } from 'astal';
import { Astal, Gtk } from 'astal/gtk4';
import options from 'src/configuration';
import { BarBoxChild } from 'src/components/bar/types';

const { scroll_speed } = options.bar.workspaces;

const Workspaces = (monitor = -1): BarBoxChild => {
    try {
        const component = (
            <box className={'workspaces-box-container'}>
                <WorkspaceModule monitor={monitor} />
            </box>
        );

        return {
            component,
            isVisible: true,
            boxClass: 'workspaces',
            isBox: true,
            props: {
                setup: (self: Astal.EventBox): void => {
                    let controller: Gtk.EventControllerScroll | null = null;
                    
                    Variable.derive([bind(scroll_speed)], (scroll_speed) => {
                        if (controller) {
                            self.remove_controller(controller);
                        }

                        const { throttledScrollUp, throttledScrollDown } =
                            initThrottledScrollHandlers(scroll_speed);

                        controller = new Gtk.EventControllerScroll();
                        controller.set_flags(Gtk.EventControllerScrollFlags.BOTH_AXES);
                        controller.connect('scroll', (_c: Gtk.EventControllerScroll, _dx: number, dy: number) => {
                            if (dy < 0) {
                                throttledScrollUp();
                            } else if (dy > 0) {
                                throttledScrollDown();
                            }
                        });
                        self.add_controller(controller);
                    });
                },
            },
        };
    } catch (error) {
        console.error('Error creating Workspaces component:', error);
        return {
            component: <box label="Error loading workspaces" />,
            isVisible: true,
            boxClass: 'workspaces',
            isBox: true,
            props: {},
        };
    }
};

export { Workspaces };
