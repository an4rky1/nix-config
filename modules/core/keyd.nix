{ ... }:
{
  services.keyd = {
    enable = true;
    keyboards.default = {
      ids = [ "*" ];
      settings = {
        main = {
          capslock = "macro(~)";
        };
        shift = {
          capslock = "macro(`)";
        };
      };
    };
  };
}
