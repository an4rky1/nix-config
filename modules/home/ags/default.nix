{
  config,
  inputs,
  pkgs,
  ...
}:
let
  astalGjs = pkgs.astal.gjs.overrideAttrs (old: {
    postPatch = (old.postPatch or "") + ''
            sed -i '/await suppress(import("gi:\/\/AstalHyprland"),/,/^})$/d' src/overrides.ts

            sed -i 's/^await import/import/' src/gtk4/app.ts

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
      import astalify, { type ConstructProps } from "./astalify.js"

      function filter(children: any[]) {
          return children.flat(Infinity).map(ch => ch instanceof Gtk.Widget
              ? ch
              : new Gtk.Label({ visible: true, label: String(ch) }))
      }

      class EventBoxClass extends Gtk.Box {
        static {
          GObject.registerClass({
            GTypeName: "EventBox",
            Signals: {
              "button-press-event": { param_types: [GObject.TYPE_OBJECT], return_type: GObject.TYPE_BOOLEAN },
              "button-release-event": { param_types: [GObject.TYPE_OBJECT], return_type: GObject.TYPE_BOOLEAN },
              "scroll-event": { param_types: [GObject.TYPE_OBJECT], return_type: GObject.TYPE_BOOLEAN },
              "enter-notify-event": { param_types: [GObject.TYPE_OBJECT], return_type: GObject.TYPE_BOOLEAN },
              "leave-notify-event": { param_types: [GObject.TYPE_OBJECT], return_type: GObject.TYPE_BOOLEAN },
              "motion-notify-event": { param_types: [GObject.TYPE_OBJECT], return_type: GObject.TYPE_BOOLEAN },
              "hover": { param_types: [], return_type: GObject.TYPE_BOOLEAN },
              "hover-lost": { param_types: [], return_type: GObject.TYPE_BOOLEAN },
            },
          }, this)
        }

        constructor() {
          super()
          const controller = new Gtk.EventControllerLegacy()
          controller.connect("event", (_: Gtk.EventController, event: Gdk.Event) => {
            const eventType = Gdk.Event.get_event_type(event)

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
                this.emit("hover")
                signalName = "enter-notify-event"
                break
              case Gdk.EventType.LEAVE_NOTIFY:
                this.emit("hover-lost")
                signalName = "leave-notify-event"
                break
              case Gdk.EventType.MOTION_NOTIFY:
                signalName = "motion-notify-event"
                break
            }

            if (signalName) {
              return this.emit(signalName, this)
            }

            return false
          })
          this.add_controller(controller)
        }

        get_child() {
          return this.get_first_child()
        }
      }

      export type EventBoxProps = ConstructProps<EventBoxClass, Gtk.Box.ConstructorProps>

      export const EventBox = astalify(EventBoxClass, {
          getChildren(self) {
              const children: Array<Gtk.Widget> = []
              let ch = self.get_first_child()
              while (ch !== null) {
                  children.push(ch)
                  ch = ch.get_next_sibling()
              }
              return children
          },
          setChildren(self, children) {
              for (const child of filter(children)) {
                  self.append(child)
              }
          },
      })
      EOF

            sed -i 's/export \* as Widget from "\.\/widget\.js"/export { Icon } from ".\/Icon"\nexport { EventBox } from ".\/EventBox"\nexport * as Widget from ".\/widget.js"/' src/gtk4/index.ts

            cat >> src/gtk4/index.ts << 'EOF'

      export { GLib } from "gi://GLib?version=2.0"
      EOF

            sed -i 's/popover: Widget.Popover,/popover: Widget.Popover,\n    icon: Icon,\n    eventbox: EventBox,/' src/gtk4/jsx-runtime.ts

            sed -i 's/popover: Widget.PopoverProps/popover: Widget.PopoverProps\n            icon: any\n            eventbox: Widget.EventBoxProps/' src/gtk4/jsx-runtime.ts

            cat > meson.build << 'EOF'
      project('astal-gjs')

      dest = get_option('prefix') / get_option('datadir') / 'astal' / 'gjs'

      dependency('astal-io-0.1')

      gtk3 = dependency('astal-3.0', required: false)
      gtk4 = dependency('astal-4-4.0', required: false)

      if (not gtk3.found() and not gtk4.found())
        error('Neither astal-3.0 nor astal-4.0 was found.')
      endif

      install_data(
        [
          'src/_app.ts',
          'src/_astal.ts',
          'src/binding.ts',
          'src/file.ts',
          'src/gobject.ts',
          'src/index.ts',
          'src/overrides.ts',
          'src/process.ts',
          'src/time.ts',
          'src/variable.ts',
          'src/package.json',
        ],
        install_dir: dest,
      )

      install_subdir('src/gtk3', install_dir: dest)
      install_subdir('src/gtk4', install_dir: dest)

      import('pkgconfig').generate(
        description: 'Astal GJS pacakge',
        name: meson.project_name(),
        install_dir: get_option('libdir') / 'pkgconfig',
        variables: {
          'srcdir': dest,
        },
      )
      EOF
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
    swww
  ];

  xdg.configFile."ags" = {
    source = pkgs.runCommandLocal "ags-config" { inherit astalGjs; } ''
      mkdir -p $out
      tar -C ${./.} -cf - . | tar -C $out -xf -
      chmod -R +w $out
      rm -f $out/default.nix
      mkdir -p $out/node_modules
      rm -rf $out/node_modules/astal
      ln -s ${astalGjs}/share/astal/gjs $out/node_modules/astal
    '';
    recursive = true;
    force = true;
  };
}
