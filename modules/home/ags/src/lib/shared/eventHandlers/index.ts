import { Gdk, Gtk } from 'astal/gtk4';
import { ThrottleFn } from './types';

function makeEvent(x: number, y: number, button: number): any {
    return {
        get_button: () => [true, button],
        get_root_coords: () => [true, x, y],
    };
}

function addClickHandler(
    widget: Gtk.Widget,
    button: number,
    handler: (self: Gtk.Widget, event: any) => void,
): () => void {
    const gesture = new Gtk.GestureClick();
    gesture.set_button(button);
    gesture.connect('pressed', (_g: Gtk.GestureClick, _n: number, x: number, y: number) => {
        handler(widget, makeEvent(x, y, button));
    });
    widget.add_controller(gesture);
    return () => widget.remove_controller(gesture);
}

/**
 * Connects a primary click handler and returns a disconnect function.
 */
export function onPrimaryClick(
    widget: Gtk.Widget,
    handler: (self: Gtk.Widget, event: any) => void,
): () => void {
    return addClickHandler(widget, 1, handler);
}

/**
 * Connects a secondary click handler and returns a disconnect function.
 */
export function onSecondaryClick(
    widget: Gtk.Widget,
    handler: (self: Gtk.Widget, event: any) => void,
): () => void {
    return addClickHandler(widget, 3, handler);
}

/**
 * Connects a middle click handler and returns a disconnect function.
 */
export function onMiddleClick(
    widget: Gtk.Widget,
    handler: (self: Gtk.Widget, event: any) => void,
): () => void {
    return addClickHandler(widget, 2, handler);
}

/**
 * Connects a scroll handler and returns a disconnect function.
 */
export function onScroll(
    widget: Gtk.Widget,
    throttledHandler: ThrottleFn,
    scrollUpAction: string,
    scrollDownAction: string,
): () => void {
    const controller = new Gtk.EventControllerScroll();
    controller.set_flags(Gtk.EventControllerScrollFlags.BOTH_AXES);
    controller.connect('scroll', (_c: Gtk.EventControllerScroll, dx: number, dy: number) => {
        if (dy > 0) {
            throttledHandler(scrollDownAction, { clicked: widget, event: makeEvent(0, 0, 0) });
        } else if (dy < 0) {
            throttledHandler(scrollUpAction, { clicked: widget, event: makeEvent(0, 0, 0) });
        }
    });
    widget.add_controller(controller);
    return () => widget.remove_controller(controller);
}
