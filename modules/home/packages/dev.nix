{ pkgs, ... }:
{
  home.packages = with pkgs; [
    ## Lsp
    nixd # nix

    ## formating
    shfmt
    treefmt
    nixfmt
    ## C / C++

    gcc
    gdb
    gef
    cmake
    gnumake
    valgrind
    llvmPackages_20.clang-tools

    ## Python
    python3
    python312Packages.ipython
    nodejs
    yaml-language-server # ямл (LSP)
    ni
    pnpm # пнпм
    typescript # тайпскрипт
    bun # bun
    cargo
    go
  ];
}
