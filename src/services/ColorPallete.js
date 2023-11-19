class ColorPallete {
  static lightPalleteVars = {
    "--accent-primary": "#919499",
    "--sidebar-bg-color": "#42639f",
    "--sidebar-item-hover": "#5381af",
    "--sidebar-item-active": "#2c3e50",
    "--text-main": "#ffffff",
    "--main-soul": "#2058bf",
    "--header-bar": "#d8d8d8"
  };

  static darkPalleteVars = {
    "--accent-primary": "#919499",
    "--sidebar-bg-color": "#333333",
    "--sidebar-item-hover": "#f1f1f1",
    "--sidebar-item-active": "#2c3e50",
    "--text-main": "#ffffff",
    "--main-soul": "#333333",
    "--header-bar": "#d8d8d8"
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
