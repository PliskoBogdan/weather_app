class ColorPallete {
  static lightPalleteVars = {
    "--sidebar-bg-color": "red",
    "--sidebar-item-hover": "green",
    "--sidebar-item-active": "#2c3e50",
    "--text-main": "#ffffff",
    "--header-bg": "blue",
  };

  static darkPalleteVars = {
    "--sidebar-bg-color": "#333333",
    "--sidebar-item-hover": "#f1f1f1",
    "--sidebar-item-active": "#2c3e50",
    "--text-main": "#ffffff",
    "--header-bg": "#333333",
  };

  /**
   * Set new collor pallete for application
   * @param {String} theme - "dark" | "light" 
   */
  setTheme(theme) {
    const palletes = {
      light: ColorPallete.lightPalleteVars,
      dark: ColorPallete.darkPalleteVars,
    };

    const pallete = palletes[theme]
    const root = document.documentElement;

    for (const vars in pallete) {
      root.style.setProperty(vars, pallete[vars]);
    }
  }
}

export default new ColorPallete();
