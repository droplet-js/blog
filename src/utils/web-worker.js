/**
 * @description webworker封装对象
 * @author halapro.liu
 * @class WebWorker
 * @param fn webworker内部执行的代码
 */
class WebWorker {
  constructor (fn) {
    this._queue = []
    this._fn = fn
    this._worker = this.createWorker(this._fn)
    this._worker.onmessage = e => this._queue.shift().resolve(e.data)
    this._worker.onerror = e => this._queue.shift().reject(e.error)
  }

  createWorker (f) {
    let blob = new Blob(['(' + f.toString() + ')()'])
    let url = window.URL.createObjectURL(blob)
    let worker = new Worker(url)
    return worker
  }

  dispatch (args) {
    return new Promise((resolve, reject) => {
      this._queue.push({resolve, reject})
      this._worker.postMessage(args)
    })
  }

  stopWorker () {
    this._worker.terminate()
  }
}
export default WebWorker
