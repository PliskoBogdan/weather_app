import Vue from 'vue'
import VueI18n from 'vue-i18n'
import BrowserLang from 'browser-lang'

import { locales } from '@/vars'

const fallbackLocale = process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en';
const browserLang = BrowserLang({
  languages: locales,
  fallback: fallbackLocale,
})

Vue.use(VueI18n)

function loadLocaleMessages () {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

/**
 * Return user or default locale
 * @returns {string: locales[]}  
 */
function getLocale () {
  try {
    const localeFromStorage = localStorage.getItem('locale')
    return localeFromStorage || browserLang;
  } catch (error) {
    console.error(error, 'Error when set default user locale')
    return browserLang
  }
}

const instance = new VueI18n({
  locale: getLocale(),
  fallbackLocale,
  messages: loadLocaleMessages(),
})

instance.changeLocale = function(locale) { 
  instance.locale = locale;
  try {
    localStorage.setItem('locale', locale)
  } catch (error) {
    console.error(error, 'Error when set locale in storage')
  }
}

export default instance