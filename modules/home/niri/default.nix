{ inputs, ... }:
{
  imports = [
    inputs.niri.homeModules.niri
    ./niri.nix
    ./settings.nix
    ./binds.nix
    ./windowrules.nix
    ./exec-once.nix
    ./variables.nix
    ./workspaces.nix
  ];
}
