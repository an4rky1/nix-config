{ ... }:
{
  programs.niri.settings.spawn-at-startup = [
    {
      argv = [
        "dbus-update-activation-environment"
        "--all"
        "--systemd"
        "WAYLAND_DISPLAY"
        "XDG_CURRENT_DESKTOP"
      ];
    }
    { sh = "systemctl --user import-environment WAYLAND_DISPLAY XDG_CURRENT_DESKTOP"; }

    { argv = [ "nm-applet" ]; }
    { argv = [ "poweralertd" ]; }
    {
      argv = [
        "wl-clip-persist"
        "--clipboard"
        "both"
      ];
    }
    { sh = "wl-paste --watch cliphist store &"; }
    {
      argv = [
        "udiskie"
        "--automount"
        "--notify"
        "--smart-tray"
      ];
    }
    { argv = [ "init-wallpaper" ]; }

    {
      argv = [
        "ghostty"
        "--gtk-single-instance=true"
        "--quit-after-last-window-closed=false"
        "--initial-window=false"
      ];
    }

    { sh = "cd ~/.config/ags && ags run app.ts --gtk 4"; }
  ];
}
