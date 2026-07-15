{ ... }:
{
  programs.niri.settings = {
    input = {
      keyboard = {
        xkb = {
          layout = "us,ru";
          options = "grp:alt_shift_toggle,caps:none";
        };
        repeat-delay = 300;
        repeat-rate = 50;
        numlock = true;
      };

      touchpad = {
        tap = true;
        natural-scroll = true;
        dwt = false;
      };

      focus-follows-mouse.enable = false;
    };

    layout = {
      gaps = 8;

      border = {
        enable = true;
        width = 3;

        active = {
          color = "#ea6962";
        };
        inactive = {
          color = "#a9b665";
        };

      };

      focus-ring = {
        enable = false;
      };

      shadow = {
        enable = true;
        softness = 20;
        spread = 0;

        offset = {
          x = 0;
          y = 2;
        };
        color = "#00000055";
      };

      background-color = "#282828";
    };

    cursor = {
      theme = "Bibata-Modern-Ice";
      size = 24;
    };

    prefer-no-csd = true;
  };
}
