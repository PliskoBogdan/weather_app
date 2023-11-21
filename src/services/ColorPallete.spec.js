import ColorPallete from '@/services/ColorPallete';

describe('ColorPallete', () => {
  beforeEach(() => {
    document.documentElement.style.cssText = '';
  });

  it('should get pallete', () => {
    const pallete = ColorPallete.getPallete('light');

    expect(Object.keys(pallete).length).toBeGreaterThan(0);
    expect(pallete['--text-main'].length).toBeGreaterThan(0);
  })

  it('should set light theme variables', () => {
    ColorPallete.setTheme('light');
    const pallete = ColorPallete.getPallete('light')

    expect(document.documentElement.style.getPropertyValue('--sidebar-bg-color')).toBe(pallete['--sidebar-bg-color']);
    expect(document.documentElement.style.getPropertyValue('--sidebar-item-hover')).toBe(pallete['--sidebar-item-hover']);
    expect(document.documentElement.style.getPropertyValue('--sidebar-item-active')).toBe(pallete['--sidebar-item-active']);
    expect(document.documentElement.style.getPropertyValue('--text-main')).toBe(pallete['--text-main']);
    expect(document.documentElement.style.getPropertyValue('--main-soul')).toBe(pallete['--main-soul']);
  });

  it('should set dark theme variables', () => {
    ColorPallete.setTheme('dark');
    const pallete = ColorPallete.getPallete('dark')
    expect(document.documentElement.style.getPropertyValue('--sidebar-bg-color')).toBe(pallete['--sidebar-bg-color']);
    expect(document.documentElement.style.getPropertyValue('--sidebar-item-hover')).toBe(pallete['--sidebar-item-hover']);
    expect(document.documentElement.style.getPropertyValue('--sidebar-item-active')).toBe(pallete['--sidebar-item-active']);
    expect(document.documentElement.style.getPropertyValue('--text-main')).toBe(pallete['--text-main']);
    expect(document.documentElement.style.getPropertyValue('--main-soul')).toBe(pallete['--main-soul']);
  });

  it('should not set invalid theme variables', () => {
    ColorPallete.setTheme('invalid');

    expect(document.documentElement.style.cssText).toBe('');
  });
});