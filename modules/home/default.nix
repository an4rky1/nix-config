{ ... }:
{
  imports = [
    ./aseprite/aseprite.nix # pixel art editor
    ./audacious/audacious.nix # music player
    ./bat.nix # better cat command
    ./browser.nix # firefox based browser
    ./btop.nix # resouces monitor
    ./cava.nix # audio visualizer
    ./discord.nix # discord
    ./fastfetch/fastfetch.nix # fetch tool
    ./fzf.nix # fuzzy finder
    ./gaming.nix # packages related to gaming
    ./ghostty/ghostty.nix # terminal
    ./git.nix # version control
    ./gnome.nix # gnome apps
    ./gtk.nix # gtk theme
    ./niri # window manager
    ./kitty.nix # terminal
    ./lazygit.nix
    ./micro.nix # nano replacement
    ./nemo.nix # file manager
    ./noctalia # desktop environment
    ./nvim/nvim.nix # neovim editor
    ./obsidian.nix
    ./p10k/p10k.nix
    ./packages # other packages
    ./pomo/pomo.nix # TUI Pomodoro timer
    ./retroarch.nix
    ./../../scripts/scripts.nix # personal scripts
    ./ssh.nix # ssh config
    ./gram
    ./zed
    ./spicetify.nix # spotify client
    ./vscodium # vscode fork
    ./yazi # terminal file manager
    ./zellij # terminal multiplexer
    ./xdg-mimes.nix # xdg config
    ./zsh # shell
  ];
}
