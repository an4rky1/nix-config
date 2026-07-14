{
  config,
  lib,
  pkgs,
  ...
}:
{
  programs.neovim = {
    enable = true;
    vimAlias = true;
    viAlias = true;

    extraLuaConfig = ''
      require("config.lazy")
    '';
  };

  home.file.".config/nvim/lua/config".source = ./lua/config;
  home.file.".config/nvim/lua/plugins".source = ./lua/plugins;
  home.file.".config/nvim/lua/snippets".source = ./lua/snippets;
  home.file.".config/nvim/lazyvim.json".source = ./lazyvim.json;
  home.file.".config/nvim/stylua.toml".source = ./stylua.toml;
}
