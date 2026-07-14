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

  home.file.".config/nvim/lua/config".source = "${./nvim/lua/config}";
  home.file.".config/nvim/lua/plugins".source = "${./nvim/lua/plugins}";
  home.file.".config/nvim/lua/snippets".source = "${./nvim/lua/snippets}";
  home.file.".config/nvim/lazyvim.json".source = "${./nvim/lazyvim.json}";
  home.file.".config/nvim/stylua.toml".source = "${./nvim/stylua.toml}";
}
