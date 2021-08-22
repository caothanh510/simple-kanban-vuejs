export default function log(promise) {
  return promise
    .then(data => {
      return [null, data]
    })
    .catch(err => [err])
}
