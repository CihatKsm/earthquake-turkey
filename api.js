const { default: axios } = require("axios");

module.exports = async () => {
    const api = await axios({ method: 'get', url: 'https://cihatksm.com/api/earthquakes' }).catch((e) => null)
    return api?.data?.earthquakes || [];
};