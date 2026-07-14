{ inputs, pkgs, ... }:
let
  astalGjs = pkgs.astal.gjs.overrideAttrs (old: {
    postPatch = (old.postPatch or "") + ''
      sed -i '/await suppress(import("gi:\/\/AstalHyprland"),/,/^})$/d' src/overrides.ts

      # Fix isArrowFunction to handle undefined values (GJS compatibility)
      sed -i 's/return !Object.hasOwn(func, "prototype")/return func != null \&\& !Object.hasOwn(func, "prototype")/' src/_astal.ts

      cat > src/gtk4/Icon.tsx << 'EOF'
      import Gtk from "gi://Gtk?version=4.0"
      import GObject from "gi://GObject?version=2.0"

      export class Icon extends Gtk.Image {
        static {
          GObject.registerClass({ GTypeName: "Icon" }, this)
        }

        constructor(props: Record<string, any>) {
          const { setup, className, icon, gicon, tooltipMarkup, ...rest } = props
          super(rest)
          if (icon) {
            const iconName = typeof icon === "string" ? icon : String(icon)
            this.set_from_icon_name(iconName)
          }
          if (gicon) {
            const giconValue = typeof gicon.get === "function" ? gicon.get() : gicon
            if (giconValue) {
              try {
                if (typeof giconValue === "string") {
                  this.set_from_icon_name(giconValue)
                } else {
                  this.set_from_gicon(giconValue)
                }
              } catch (e) {
                console.error("Failed to set icon:", e)
              }
            }
          }
          if (tooltipMarkup) {
            this.set_tooltip_markup(typeof tooltipMarkup === "string" ? tooltipMarkup : String(tooltipMarkup))
          }
          if (className) this.add_css_class(className)
          if (setup) setup(this)
        }
      }
      EOF

      cat > src/gtk4/EventBox.tsx << 'EOF'
      import Gtk from "gi://Gtk?version=4.0"
      import GObject from "gi://GObject?version=2.0"
      import Gdk from "gi://Gdk?version=4.0"

      export type EventBoxProps = Record<string, any>

      export class EventBox extends Gtk.Box {
        static {
          GObject.registerClass({
            GTypeName: "EventBox",
            Signals: {
              "button-press-event": { param_types: [GObject.TYPE_OBJECT, GObject.TYPE_OBJECT], return_type: GObject.TYPE_BOOLEAN },
              "button-release-event": { param_types: [GObject.TYPE_OBJECT, GObject.TYPE_OBJECT], return_type: GObject.TYPE_BOOLEAN },
              "scroll-event": { param_types: [GObject.TYPE_OBJECT, GObject.TYPE_OBJECT], return_type: GObject.TYPE_BOOLEAN },
              "enter-notify-event": { param_types: [GObject.TYPE_OBJECT, GObject.TYPE_OBJECT], return_type: GObject.TYPE_BOOLEAN },
              "leave-notify-event": { param_types: [GObject.TYPE_OBJECT, GObject.TYPE_OBJECT], return_type: GObject.TYPE_BOOLEAN },
              "motion-notify-event": { param_types: [GObject.TYPE_OBJECT, GObject.TYPE_OBJECT], return_type: GObject.TYPE_BOOLEAN },
            },
          }, this)
        }

        constructor(props?: EventBoxProps) {
          const { setup, child, children, ...rest } = props || {}
          super(rest as any)
          const controller = new Gtk.EventControllerLegacy()
          controller.connect("event", (_: Gtk.EventController, event: Gdk.Event) => {
            const [success, eventType] = event.get_event_type()
            if (!success) return false

            let signalName: string | null = null
            switch (eventType) {
              case Gdk.EventType.BUTTON_PRESS:
              case Gdk.EventType.DOUBLE_BUTTON_PRESS:
              case Gdk.EventType.TRIPLE_BUTTON_PRESS:
                signalName = "button-press-event"
                break
              case Gdk.EventType.BUTTON_RELEASE:
                signalName = "button-release-event"
                break
              case Gdk.EventType.SCROLL:
                signalName = "scroll-event"
                break
              case Gdk.EventType.ENTER_NOTIFY:
                signalName = "enter-notify-event"
                break
              case Gdk.EventType.LEAVE_NOTIFY:
                signalName = "leave-notify-event"
                break
              case Gdk.EventType.MOTION_NOTIFY:
                signalName = "motion-notify-event"
                break
            }

            if (signalName) {
              return this.emit(signalName, this, event)
            }

            return false
          })
          this.add_controller(controller)
          if (child) this.append(child)
          if (children) {
            for (const c of Array.isArray(children) ? children : [children]) {
              if (c) this.append(c)
            }
          }
          if (setup) setup(this)
        }
      }
      EOF

      sed -i 's/import \* as Widget from "\.\/widget\.js"/import { Icon } from ".\/Icon"\nimport { EventBox } from ".\/EventBox"\nimport * as Widget from ".\/widget.js"/' src/gtk4/jsx-runtime.ts

      sed -i 's/popover: Widget.Popover,/popover: Widget.Popover,\n    eventbox: EventBox,/' src/gtk4/jsx-runtime.ts

      sed -i 's/popover: Widget.PopoverProps/popover: Widget.PopoverProps\n            eventbox: Widget.EventBoxProps/' src/gtk4/jsx-runtime.ts
    '';
  });
  astalInputs = inputs.astal.packages.${pkgs.system};
in
{
  imports = [ inputs.ags.homeManagerModules.default ];

  programs.ags = {
    enable = true;
    configDir = null;

    extraPackages = with pkgs; [
      astalInputs.astal4
      astalInputs.apps
      astalInputs.battery
      astalInputs.bluetooth
      astalInputs.brightness
      astalInputs.cava
      astalInputs.greet
      astalInputs.mpris
      astalInputs.network
      astalInputs.notifd
      astalInputs.powerprofiles
      astalInputs.tray
      astalInputs.wireplumber
      astalGjs
      gtksourceview5
      libgtop
    ];
  };

  home.packages = with pkgs; [
    astalInputs.notifd
    gtksourceview5
    libgtop
  ];

  xdg.configFile."ags" = {
    source = pkgs.runCommandLocal "ags-config" { inherit astalGjs; } ''
      mkdir -p $out
      tar -C ${./.} -cf - . | tar -C $out -xf -
      chmod -R +w $out
      rm -f $out/default.nix
      mkdir -p $out/node_modules
      ln -s ${astalGjs}/share/astal/gjs $out/node_modules/astal
    '';
    recursive = true;
    force = true;
  };
}
