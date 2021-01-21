import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

let language = localStorage.getItem('language') || 'zh'
if (!language) {
    localStorage.setItem('language', 'zh')
}

const locales = {
    zh: require('./zh.json'),
    en: require('./en.json')
}
const i18n = new VueI18n({
    locale: language,
    messages: locales
})

export default i18n
