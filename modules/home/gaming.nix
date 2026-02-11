{ pkgs, inputs, ... }:
{
  home.packages = with pkgs; [
    ## Utils
    gamemode
    gamescope
    # winetricks
    # inputs.nix-gaming.packages.${pkgs.stdenv.hostPlatform.system}.wine-ge

        
    ## X11 libs (нужно для Project Zomboid / Java / XWayland)
    ## Cli games
    _2048
    _2048-in-terminal
    vitetris
    nethack

    ## Celeste
    # olympus
    # celeste-classic
    # celeste-classic-pm

    ## Doom
    # gzdoom
    crispy-doom

    ## Emulation
    sameboy
    snes9x
    # cemu
    # dolphin-emu
  ];
}
