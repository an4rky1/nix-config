{ ... }:
let
  workspaceNames = [
    "󰊯" # ws 1: zen
    "" # ws 2: nvim
    "" # ws 3: kitty terminal
    "" # ws 4: zellij
    "" # ws 5: yazi/nemo
    "" # ws 6: obsidian
    "" # ws 7: spotify
    "" # ws 8: btm
    "" # ws 9: telegram
  ];
  ws = index: builtins.elemAt workspaceNames (index - 1);
in
{
  programs.niri.settings.window-rules = [
    # ── Global defaults ──
    {
      matches = [ { app-id = ".*"; } ];
      geometry-corner-radius = {
        top-left = 12.0;
        top-right = 12.0;
        bottom-right = 12.0;
        bottom-left = 12.0;
      };
      clip-to-geometry = true;
      default-column-width = {
        proportion = 0.45;
      };
    }

    # ── Floating windows ──
    {
      matches = [
        { app-id = "^(imv|mpv|zenity|waypaper|SoundWireServer|pavucontrol)$"; }
        { app-id = "^org\\.gnome\\.(Calculator|FileRoller)$"; }
        { app-id = "^sameboy-wrapped$"; }
      ];
      open-floating = true;
    }
    {
      matches = [ { title = "^Picture-in-Picture$"; } ];
      open-floating = true;
    }
    {
      matches = [ { app-id = "^zenity$"; } ];
      open-floating = true;
      default-column-width = {
        fixed = 850;
      };
      default-window-height = {
        fixed = 500;
      };
    }
    {
      matches = [ { app-id = "^SoundWireServer$"; } ];
      open-floating = true;
      default-column-width = {
        fixed = 725;
      };
      default-window-height = {
        fixed = 330;
      };
    }
    {
      matches = [ { title = "^Volume Control$"; } ];
      open-floating = true;
      default-column-width = {
        fixed = 700;
      };
      default-window-height = {
        fixed = 450;
      };
    }

    # ── Workspace 1: Zen Browser ──
    {
      matches = [ { app-id = "^zen-beta$"; } ];
      open-on-workspace = ws 1;
      default-column-width = {
        proportion = 1.0;
      };
    }

    # ── Workspace 2: Neovim ──
    {
      matches = [ { title = "^nvim$"; } ];
      open-on-workspace = ws 2;
      default-column-width = {
        proportion = 1.0;
      };
    }

    # ── Workspace 3: Kitty terminal ──
    {
      matches = [ { title = "^kitty$"; } ];
      open-on-workspace = ws 3;
    }

    # ── Workspace 4: Zellij ──
    {
      matches = [ { title = "^zellij$"; } ];
      open-on-workspace = ws 4;
      default-column-width = {
        proportion = 1.0;
      };
    }

    # ── Workspace 5: Yazi / Nemo ──
    {
      matches = [
        { title = "^yazi$"; }
        { app-id = "^nemo$"; }
      ];
      open-on-workspace = ws 5;
      default-column-width = {
        proportion = 1.0;
      };
    }

    # ── Workspace 6: Obsidian ──
    {
      matches = [ { app-id = "^obsidian$"; } ];
      open-on-workspace = ws 6;
      default-column-width = {
        proportion = 1.0;
      };
    }

    # ── Workspace 7: Spotify ──
    {
      matches = [ { app-id = "^(Audacious|Spotify)$"; } ];
      open-on-workspace = ws 7;
      default-column-width = {
        proportion = 1.0;
      };
    }

    # ── Workspace 8: Btm ──
    {
      matches = [ { title = "^btm$"; } ];
      open-on-workspace = ws 8;
      default-column-width = {
        proportion = 1.0;
      };
    }

    # ── Workspace 9: Telegram / Discord ──
    {
      matches = [
        { app-id = "^org\\.telegram\\.desktop$"; }
        { app-id = "^(discord|WebCord|vesktop)$"; }
      ];
      open-on-workspace = ws 9;
      default-column-width = {
        proportion = 1.0;
      };
    }

  ];
}
