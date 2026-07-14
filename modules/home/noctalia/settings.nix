{ ... }:
{
  programs.noctalia.settings = {
    shell = {
      corner_radius_scale = 1.0;
      font_family = "sans-serif";
      time_format = "{:%H:%M}";
      date_format = "%A, %x";
      offline_mode = false;
      telemetry_enabled = false;
      polkit_agent = false;
      password_style = "default";
      settings_show_advanced = false;
      middle_click_opens_widget_settings = true;
      show_location = true;
      clipboard_enabled = true;
      clipboard_history_max_entries = 100;
      clipboard_auto_paste = "auto";
      shared_gl_context = true;
    };

    shell.privacy = {
      mic_filter_regex = "";
      cam_filter_regex = "";
      screen_filter_regex = "";
    };

    shell.animation = {
      enabled = true;
      speed = 1.0;
    };

    shell.shadow = {
      direction = "down";
      alpha = 0.55;
    };

    shell.panel = {
      transparency_mode = "solid";
      borders = true;
      shadow = true;
      launcher_placement = "centered";
      clipboard_placement = "centered";
      control_center_placement = "attached";
      wallpaper_placement = "attached";
      session_placement = "attached";
      open_near_click_control_center = false;
      open_near_click_launcher = false;
      open_near_click_clipboard = false;
      open_near_click_wallpaper = false;
      open_near_click_session = false;
    };

    shell.mpris = {
      blacklist = [ ];
    };

    theme = {
      mode = "dark";
      source = "builtin";
      builtin = "Catppuccin";
      pure_black_dark = false;
    };

    theme.templates = {
      enable_builtin_templates = true;
      builtin_ids = [ ];
      enable_community_templates = true;
      community_ids = [ ];
    };

    backdrop = {
      enabled = false;
      blur_intensity = 0.5;
      tint_intensity = 0.3;
    };

    notification = {
      enable_daemon = true;
      show_app_name = true;
      show_actions = true;
      layer = "top";
      scale = 1.0;
      background_opacity = 0.97;
      offset_x = 20;
      offset_y = 8;
    };

    osd = {
      position = "top_right";
      position_vertical = "top_center";
      orientation = "horizontal";
      scale = 1.0;
      background_opacity = 0.97;
      offset_x = 20;
      offset_y = 8;
    };

    osd.kinds = {
      volume = true;
      volume_output = true;
      volume_input = true;
      brightness = true;
      wifi = true;
      bluetooth = true;
      power_profile = true;
      caffeine = true;
      nightlight = true;
      dnd = true;
      lock_keys = true;
      keyboard_layout = true;
      privacy = true;
    };

    lockscreen = {
      enabled = true;
      blurred_desktop = false;
      blur_intensity = 0.5;
      tint_intensity = 0.3;
    };

    system.monitor = {
      enabled = true;
      cpu_poll_seconds = 2.0;
      gpu_poll_seconds = 5.0;
      memory_poll_seconds = 2.0;
      network_poll_seconds = 3.0;
      disk_poll_seconds = 10.0;
    };

    weather = {
      enabled = false;
      refresh_minutes = 30;
      unit = "celsius";
      effects = true;
    };

    audio = {
      enable_overdrive = false;
      enable_sounds = false;
      sound_volume = 0.5;
    };

    brightness = {
      enable_ddcutil = false;
    };

    nightlight = {
      enabled = false;
      force = false;
      temperature_day = 6500;
      temperature_night = 4000;
    };

    location = {
      auto_locate = false;
      address = "";
    };

    idle.behavior.lock = {
      timeout = 600;
      action = "lock";
      enabled = false;
    };

    idle.behavior.screen-off = {
      timeout = 660;
      action = "screen_off";
      enabled = false;
    };

    keybinds = {
      validate = [
        "return"
        "kp_enter"
        "space"
      ];
      cancel = [ "escape" ];
      left = [ "left" ];
      right = [ "right" ];
      up = [ "up" ];
      down = [ "down" ];
      tab_next = [ "tab" ];
      tab_previous = [ "shift+iso_left_tab" ];
    };

    control_center.shortcuts = [
      { type = "wifi"; }
      { type = "bluetooth"; }
      { type = "nightlight"; }
      { type = "notification"; }
      { type = "wallpaper"; }
      { type = "screen_recorder"; }
      { type = "session"; }
    ];
  };
}
