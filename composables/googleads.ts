export const googleads = () => {
    return window['addAds'] = function () {
        let chlid = document.getElementsByClassName('adsItem')
        for (let index = 0; index < chlid.length; index++) {
            (adsbygoogle = window.adsbygoogle || []).push({});
        }
    }
}