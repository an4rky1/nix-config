{ pkgs, lib, ... }: {
  programs.niri.enable = true;

  services.displayManager.defaultSession = "niri";

  xdg.portal = {
    enable = true;
    xdgOpenUsePortal = true;
    config = {
      common.default = [ "gtk" ];
      niri.default = lib.mkDefault [ "gtk" ];
    };

    extraPortals = [ pkgs.xdg-desktop-portal-gtk ];
  };
}
