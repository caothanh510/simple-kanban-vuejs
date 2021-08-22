import { db } from '../../database/firebase_database'

const service = db.collection("tickets")

export default {
  getAll() {
    return service
  },
  create(data) {
    return service.add(data)
  },
  edit(id) {
    return service.doc(id).get()
  },
  update(id, data) {
    return service.doc(id).update(data)
  },
  delete(id) {
   return service.doc(id).delete()
  }
}
