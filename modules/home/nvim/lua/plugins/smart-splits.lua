return {
  "mrjones2014/smart-splits.nvim",
  lazy = false,
  opts = {
    ignored_buftypes = {
      "nofile",
      "quickfix",
      "prompt",
      "NvimTree",
    },
    ignored_filetypes = {
      "lazy",
      "mason",
    },
    at_edge = "zellij",
    cursor_follows = true,
  },
  keys = {
    {
      "<c-h>",
      function()
        require("smart-splits").move_cursor_left()
      end,
      desc = "move to left split or zellij pane",
    },
    {
      "<c-j>",
      function()
        require("smart-splits").move_cursor_down()
      end,
      desc = "move to below split or zellij pane",
    },
    {
      "<c-k>",
      function()
        require("smart-splits").move_cursor_up()
      end,
      desc = "move to above split or zellij pane",
    },
    {
      "<c-l>",
      function()
        require("smart-splits").move_cursor_right()
      end,
      desc = "move to right split or zellij pane",
    },
    {
      "<c-s-h>",
      function()
        require("smart-splits").resize_left()
      end,
      desc = "resize split or zellij pane left",
    },
    {
      "<c-s-j>",
      function()
        require("smart-splits").resize_down()
      end,
      desc = "resize split or zellij pane down",
    },
    {
      "<c-s-k>",
      function()
        require("smart-splits").resize_up()
      end,
      desc = "resize split or zellij pane up",
    },
    {
      "<c-s-l>",
      function()
        require("smart-splits").resize_right()
      end,
      desc = "resize split or zellij pane right",
    },
  },
}
