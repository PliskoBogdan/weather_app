import ColorPallete from '@/services/ColorPallete';

describe('ColorPallete', () => {
  beforeEach(() => {
    document.documentElement.style.cssText = '';
  });

  it('should set light theme variables', () => {
    ColorPallete.setTheme('light');

    expect(document.documentElement.style.getPropertyValue('--sidebar-bg-color')).toBe('red');
    expect(document.documentElement.style.getPropertyValue('--sidebar-item-hover')).toBe('green');
    expect(document.documentElement.style.getPropertyValue('--sidebar-item-active')).toBe('#2c3e50');
    expect(document.documentElement.style.getPropertyValue('--text-main')).toBe('#ffffff');
    expect(document.documentElement.style.getPropertyValue('--header-bg')).toBe('blue');
  });

  it('should set dark theme variables', () => {
    ColorPallete.setTheme('dark');

    expect(document.documentElement.style.getPropertyValue('--sidebar-bg-color')).toBe('#333333');
    expect(document.documentElement.style.getPropertyValue('--sidebar-item-hover')).toBe('#f1f1f1');
    expect(document.documentElement.style.getPropertyValue('--sidebar-item-active')).toBe('#2c3e50');
    expect(document.documentElement.style.getPropertyValue('--text-main')).toBe('#ffffff');
    expect(document.documentElement.style.getPropertyValue('--header-bg')).toBe('#333333');
  });

  it('should not set invalid theme variables', () => {
    ColorPallete.setTheme('invalid');

    expect(document.documentElement.style.cssText).toBe('');
  });
});