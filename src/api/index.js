import axios from '@/api/axios';
import i18n from '@/i18n'

export const findLocationByQuery = async (query) => {
    try {
        const { data } = await axios.get(`geo/1.0/direct?q=${query}&appid=${process.env.VUE_APP_OPEN_WEATHER_API_KEY}&lang=${i18n.locale}&limit=3`)
        return data
    } catch (error) {
        return []
    }
}