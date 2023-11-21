class ColorPallete {
  static lightPalleteVars = {
    "--accent-primary": "#919499",
    "--sidebar-bg-color": "#42639f",
    "--sidebar-item-hover": "#5381af",
    "--sidebar-item-active": "#9a9a9ad6",
    "--text-main": "#9baacc",
    "--main-soul": "#1d325a",
    "--header-bar": "#d8d8d8",
    "--hover": "#9d9d9d",
    "--main-background": "#fff",
    "--bg-button": "#396496",
    "--bg-menu": "#8d8d8d",
  };

  static darkPalleteVars = {
    "--accent-primary": "#919499",
    "--sidebar-bg-color": "#333333",
    "--sidebar-item-hover": "#f1f1f1",
    "--sidebar-item-active": "#494949e0",
    "--text-main": "#c9c9c9",
    "--main-soul": "#333333",
    "--header-bar": "#d8d8d8",
    "--hover": "#9d9d9d",
    "--main-background": "#363636",
    "--bg-button": "#4d4d4d",
    "--bg-menu": "#8d8d8d",
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

  /**
   * Set new collor pallete for application
   * @param {String} theme - "dark" | "light"
   * @returns {darkPalleteVars|lightPalleteVars} 
   */
  getPallete(pallete) {
    const palletes = {
      light: ColorPallete.lightPalleteVars,
      dark: ColorPallete.darkPalleteVars,
    };

    return palletes[pallete]
  }
}

export default new ColorPallete();
