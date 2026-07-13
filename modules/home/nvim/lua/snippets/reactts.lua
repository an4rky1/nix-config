local ls = require("luasnip")
local s = ls.snippet
local t = ls.text_node
local i = ls.insert_node
local f = ls.function_node

return {
  -- console.log
  s("cl", {
    t("console.log("),
    i(1, "value"),
    t(")"),
  }),

  -- function
  s("fn", {
    t("function "),
    i(1, "name"),
    t("("),
    i(2),
    t({ ") {", "\t" }),
    i(3, "body"),
    t({ "", "}" }),
  }),

  -- arrow function
  s("ff", {
    t("("),
    i(1),
    t(") => "),
    i(2),
  }),

  s("xx", {
    t("${"),
    i(1),
    t("}"),
  }),

  -- className={cn("...")}
  s("cn", {
    t('className={cn("'),
    i(1),
    t('")}'),
  }),

  -- storybook
  s("story", {
    t('import { fn } from "storybook/test";'),
    t({ "", "import type { Meta, StoryObj } from '@storybook/nextjs-vite';" }),
    t({ "", "" }),
    f(function(args)
      return "import { " .. args[1][1] .. " } from './" .. args[2][1] .. "';"
    end, { 1, 2 }),
    t({ "", "" }),
    t("const meta = {"),
    t({ "", "\tcomponent: " }),
    i(3, "Button"),
    t({ ",", "} satisfies Meta<typeof " }),
    i(3),
    t({ ">;", "" }),
    t({ "", "export default meta;", "" }),
    t("type Story = StoryObj<typeof meta;", ""),

    t({ "", "export const Default: Story = {", "\targs: {" }),
    t({ "", "\t\tchildren: " }),
    i(4, "fn()"),
    t({ ",", "\t\tappName: " }),
    i(5, '"appName"'),
    t({ "", "\t}", "};" }),
  }),
}
