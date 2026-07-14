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

      focus-ring = {
        enable = true;
        width = 2;
        active = {
          color = "#98971A";
        };
        inactive = {
          color = "#00000000";
        };
      };

      border = {
        enable = true;
        active = {
          color = "#98971A";
        };
        inactive = {
          color = "#444444";
        };
        radius = 12;
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
