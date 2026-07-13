import { Gtk } from 'astal/gtk4';

const btn = new Gtk.Button({ label: 'test' });
console.log('Button signals with press:', Object.getPrototypeOf(btn).constructor.$signals);
console.log('Button has button-press-event:', 'button-press-event' in btn.constructor.prototype);
