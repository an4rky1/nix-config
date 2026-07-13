return {
  "L3MON4D3/LuaSnip",
  version = "2.*",
  build = "make install_jsregexp",
  dependencies = {
    "rafamadriz/friendly-snippets",
  },
  config = function()
    local ls = require("luasnip")

    -- Загрузка VSCode сниппетов (ts, tsx, react и др.)
    require("luasnip.loaders.from_vscode").lazy_load()

    -- Своё подключение сниппетов
    ls.add_snippets("typescriptreact", require("snippets.reactts"))
    ls.add_snippets("typescript", require("snippets.reactts"))

    ls.setup({
      enable_autosnippets = true,
    })
  end,
}
