{ inputs, pkgs, ... }:
let
  noctaliaPkgs = inputs.noctalia.packages.${pkgs.stdenv.hostPlatform.system};
in
{
  imports = [
    inputs.noctalia.homeModules.default
    ./settings.nix
    ./bar.nix
    ./dock.nix
    ./widgets.nix
  ];
}
