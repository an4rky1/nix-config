{ ... }:
{
  programs.niri.settings.binds = {
    "Mod+F1".action."show-hotkey-overlay" = { };
    "Alt+Tab".action."focus-workspace-previous" = { };

    "Mod+Return".action.spawn = [
      "kitty"
      "--title"
      "kitty"

    ];
    "Alt+Return".action.spawn = [
      "run-or-focus"
      "kitty-float"
      "kitty --title kitty-float"
    ];
    "Mod+Escape".action.spawn = [
      "kitty"
      "--title"
      "nvim"
      "nvim"
    ];
    "Mod+B".action.spawn = [ "zen-beta" ];
    "Mod+Shift+B".action."spawn-sh" = "zen-beta --private-window";
    "Mod+D".action."spawn-sh" = "noctalia msg panel-toggle launcher";
    "Mod+Home".action."spawn-sh" = "noctalia msg panel-toggle control-center";
    "Mod+Q".action."close-window" = { };
    "Mod+F".action."maximize-column" = { };
    "Mod+Shift+F".action."fullscreen-window" = { };
    "Mod+Space".action."toggle-window-floating" = { };
    "Mod+Shift+D".action.spawn = [
      "vesktop"
      "--enable-features=UseOzonePlatform"
      "--ozone-platform=wayland"
    ];
    "Mod+Shift+S".action.spawn = [ "SoundWireServer" ];
    "Mod+P".action."switch-layout" = "next";
    "Mod+X".action."toggle-column-tabbed-display" = { };
    "Mod+Z".action."spawn-sh" = "run-or-focus --terminal 'zellij' 'zellij'";
    "Mod+E".action."spawn-sh" = "run-or-focus --terminal 'yazi' 'yazi'";
    "Mod+A".action."spawn-sh" = "run-or-focus --terminal 'btm' 'btm'";
    "Mod+W".action."spawn-sh" = "run-or-focus 'Telegram' 'Telegram'";
    "Mod+R".action."spawn-sh" = "run-or-focus 'nemo' 'nemo'";
    "Mod+O".action."spawn-sh" = "run-or-focus 'Obsidian' 'obsidian'";
    "Mod+C".action.spawn = [
      "hyprpicker"
      "-a"
    ];

    "Ctrl+Shift+Escape".action.spawn = [ "missioncenter" ];
    "Mod+Equal".action.spawn = [ "woomer" ];

    "Print".action."spawn-sh" = "screenshot --copy";
    "Mod+S".action."spawn-sh" = "screenshot --save";
    "Mod+Shift+Print".action."spawn-sh" = "screenshot --swappy";

    "Mod+Ctrl+O".action.spawn = [ "ocr" ];

    "Mod+Left".action."focus-column-left" = { };
    "Mod+Right".action."focus-column-right" = { };
    "Mod+Up".action."focus-window-up" = { };
    "Mod+Down".action."focus-window-down" = { };
    "Mod+H".action."focus-column-left" = { };
    "Mod+L".action."focus-column-right" = { };
    "Mod+K".action."focus-workspace-up" = { };
    "Mod+J".action."focus-workspace-down" = { };

    "Mod+Shift+Left".action."move-column-left" = { };
    "Mod+Shift+Right".action."move-column-right" = { };
    "Mod+Shift+Up".action."move-window-up" = { };
    "Mod+Shift+Down".action."move-window-down" = { };
    "Mod+Shift+H".action."move-column-left" = { };
    "Mod+Shift+L".action."move-column-right" = { };
    "Mod+Shift+K".action."move-window-to-workspace-up" = { };
    "Mod+Shift+J".action."move-window-to-workspace-down" = { };

    "Mod+1".action."focus-workspace" = 1;
    "Mod+2".action."focus-workspace" = 2;
    "Mod+3".action."focus-workspace" = 3;
    "Mod+4".action."focus-workspace" = 4;
    "Mod+5".action."focus-workspace" = 5;
    "Mod+6".action."focus-workspace" = 6;
    "Mod+7".action."focus-workspace" = 7;
    "Mod+8".action."focus-workspace" = 8;
    "Mod+9".action."focus-workspace" = 9;
    "Mod+0".action."focus-workspace" = 10;

    "Mod+Shift+1".action."move-window-to-workspace" = 1;
    "Mod+Shift+2".action."move-window-to-workspace" = 2;
    "Mod+Shift+3".action."move-window-to-workspace" = 3;
    "Mod+Shift+4".action."move-window-to-workspace" = 4;
    "Mod+Shift+5".action."move-window-to-workspace" = 5;
    "Mod+Shift+6".action."move-window-to-workspace" = 6;
    "Mod+Shift+7".action."move-window-to-workspace" = 7;
    "Mod+Shift+8".action."move-window-to-workspace" = 8;
    "Mod+Shift+9".action."move-window-to-workspace" = 9;
    "Mod+Shift+0".action."move-window-to-workspace" = 10;
    "Mod+Ctrl+C".action."spawn-sh" =
      "niri msg action move-column-to-workspace 0 && niri msg action focus-workspace 0";

    "Mod+Ctrl+Left".action."consume-or-expel-window-left" = { };
    "Mod+Ctrl+Right".action."consume-or-expel-window-right" = { };
    "Mod+Ctrl+H".action."consume-or-expel-window-left" = { };
    "Mod+Ctrl+L".action."consume-or-expel-window-right" = { };

    "Mod+WheelScrollDown" = {
      cooldown-ms = 100;
      action."focus-workspace-down" = { };
    };
    "Mod+WheelScrollUp" = {
      cooldown-ms = 100;
      action."focus-workspace-up" = { };
    };

    "XF86AudioPlay".action.spawn = [
      "playerctl"
      "play-pause"
    ];
    "XF86AudioNext".action.spawn = [
      "playerctl"
      "next"
    ];
    "XF86AudioPrev".action.spawn = [
      "playerctl"
      "previous"
    ];
    "XF86AudioStop".action.spawn = [
      "playerctl"
      "stop"
    ];
    "Mod+Next".action."spawn-sh" = "noctalia msg media next";
    "Mod+Prior".action."spawn-sh" = "noctalia msg media previous";

    "Mod+V".action."spawn-sh" = "noctalia msg panel-toggle clipboard";

    "Alt+Space".action."spawn-sh" = "wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle";
    "Alt+Prior".action."spawn-sh" = "wpctl set-volume @DEFAULT_AUDIO_SINK@ 2%+ --limit 100%";
    "Alt+Next".action."spawn-sh" = "wpctl set-volume @DEFAULT_AUDIO_SINK@ 2%-";
    "XF86AudioMute" = {
      "allow-when-locked" = true;
      action."spawn-sh" = "wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle";
    };
    "XF86AudioRaiseVolume" = {
      "allow-when-locked" = true;
      action."spawn-sh" = "wpctl set-volume @DEFAULT_AUDIO_SINK@ 2%+ --limit 100%";
    };
    "XF86AudioLowerVolume" = {
      "allow-when-locked" = true;
      action."spawn-sh" = "wpctl set-volume @DEFAULT_AUDIO_SINK@ 2%-";
    };

    "XF86MonBrightnessUp" = {
      "allow-when-locked" = true;
      action."spawn-sh" = "brightnessctl set 5%+";
    };
    "XF86MonBrightnessDown" = {
      "allow-when-locked" = true;
      action."spawn-sh" = "brightnessctl set 5%-";
    };

    "Mod+XF86MonBrightnessUp".action."spawn-sh" = "brightnessctl set 100%";
    "Mod+XF86MonBrightnessDown".action."spawn-sh" = "brightnessctl set 0%";

    "Mod+F11".action."spawn-sh" = "wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%+ --limit 100%";
    "Mod+F12".action."spawn-sh" = "wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-";
  };
}
