{ ... }:
{
  programs.noctalia.settings = {
    widget = {
      launcher.custom_image = "";
      launcher.custom_image_colorize = false;

      "control-center".custom_image = "";
      "control-center".custom_image_colorize = false;

      notifications.hide_when_no_unread = true;
    };

    widget.network_rx = {
      network_speed_unit = "mb";
      network_speed_compact = true;
    };

    widget.network_tx = {
      network_speed_unit = "mb";
      network_speed_compact = true;
    };

    widget.keyboard_layout = {
      display = "short";
      show_icon = true;
      show_label = true;
      hide_when_single_layout = false;
      cycle_command = "";
    };
  };
}
