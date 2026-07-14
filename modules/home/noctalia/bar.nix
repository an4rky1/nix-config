{ ... }:
{
  programs.noctalia.settings.bar.main = {
    position = "top";
    thickness = 34;
    background_opacity = 1.0;
    radius = 12;
    margin_h = 180;
    margin_v = 10;
    padding = 14;
    widget_spacing = 6;
    scale = 1.0;
    shadow = true;
    auto_hide = false;
    reserve_space = true;
    capsule = false;
    start = [
      "launcher"
      "wallpaper"
      "workspaces"
    ];
    center = [ "clock" ];
    end = [
      "media"
      "tray"
      "notifications"
      "clipboard"
      "network"
      "bluetooth"
      "volume"
      "brightness"
      "battery"
      "control-center"
      "session"
    ];
  };
}
