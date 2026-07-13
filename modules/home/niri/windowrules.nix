{ ... }: {
  programs.niri.settings.window-rules = [
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
      default-column-width = { fixed = 850; };
      default-window-height = { fixed = 500; };
    }
    {
      matches = [ { app-id = "^SoundWireServer$"; } ];
      open-floating = true;
      default-column-width = { fixed = 725; };
      default-window-height = { fixed = 330; };
    }
    {
      matches = [ { title = "^Volume Control$"; } ];
      open-floating = true;
      default-column-width = { fixed = 700; };
      default-window-height = { fixed = 450; };
    }
    {
      matches = [ { app-id = "^obsidian$"; } ];
      open-on-workspace = "6";
    }
    {
      matches = [ { app-id = "^zen-beta$"; } ];
      open-on-workspace = "1";
    }
    {
      matches = [ { app-id = "^(Gimp|Aseprite)$"; } ];
      open-on-workspace = "4";
    }
    {
      matches = [ { app-id = "^(Audacious|Spotify)$"; } ];
      open-on-workspace = "5";
    }
    {
      matches = [ { app-id = "^com\\.obsproject\\.Studio$"; } ];
      open-on-workspace = "8";
    }
    {
      matches = [
        { app-id = "^org\\.telegram\\.desktop$"; }
        { app-id = "^(discord|WebCord|vesktop)$"; }
      ];
      open-on-workspace = "10";
    }
    {
      matches = [ { app-id = "^nemo$"; } ];
      open-on-workspace = "9";
    }
    {
      matches = [ { title = "^btm$"; } ];
      open-on-workspace = "7";
    }
    {
      matches = [ { title = "^superfile$"; } ];
      open-on-workspace = "9";
    }
    {
      matches = [ { title = "^Zen Browser Private Browsing$"; } ];
      open-on-workspace = "5";
    }
  ];
}
