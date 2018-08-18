export default {
    // 是否支持webworker
    isSupportWebWorker () {
        return typeof Worker !== 'undefined'
    }
}
