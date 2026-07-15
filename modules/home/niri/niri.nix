{ pkgs, ... }:
{
  programs.niri = {
    enable = true;

  };

  home.packages = with pkgs; [
    awww
    grimblast
    hyprpicker
    grim
    slurp
    wl-clip-persist
    cliphist
    wf-recorder
    glib
    wayland
    direnv
    tesseract
  ];
}
