import firebase from "firebase";
import uuid from "uuid";

class FirebaseUtil {
  database = firebase.firestore();

  constructor(uid) {
    this.uid = uid;
  }
  addNewData(todo) {
    const isCompleted = false;
    return this.database.collection(this.uid).add(todo);
  }
}
export default FirebaseUtil;
