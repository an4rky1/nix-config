{ pkgs, ... }:
{
  programs.bottom = {
    enable = true;
    settings = {
      flags = {
        avg_cpu = true;
        temperature_type = "c";
      };
    };
  };

  home.packages = with pkgs; [ nvtopPackages.intel ];
}

