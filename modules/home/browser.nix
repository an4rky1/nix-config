{ inputs, pkgs, ... }:
{
  imports = [ inputs.zen-browser.homeModules.beta ];

  programs.zen-browser.enable = true;

  # Устанавливаем переменную окружения для терминальных программ
  home.sessionVariables = {
    BROWSER = "zen";
  };

  xdg.mimeApps =
    let
      # Имя .desktop файла для Zen Browser
      value = "zen.desktop"; 

      # Список типов файлов, которые должен открывать Zen
      associations = builtins.listToAttrs (
        map (name: { inherit name value; }) [
          "application/x-extension-shtml"
          "application/x-extension-xhtml"
          "application/x-extension-html"
          "application/x-extension-xht"
          "application/x-extension-htm"
          "x-scheme-handler/unknown"
          "x-scheme-handler/mailto"
          "x-scheme-handler/chrome"
          "x-scheme-handler/about"
          "x-scheme-handler/https"
          "x-scheme-handler/http"
          "application/xhtml+xml"
          "application/json"
          "text/html"
        ]
      );
    in
    {
      enable = true; # Важно: заставляет Home Manager применить эти настройки
      
      # Устанавливаем Zen как приложение по умолчанию для списка выше
      defaultApplications = associations;
      
      # Добавляем в список "открыть с помощью" (необязательно, но полезно)
      associations.added = associations;
    };
}
