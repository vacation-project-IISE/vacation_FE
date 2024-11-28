import { firestore } from "./firebase";
import { doc, deleteDoc } from "firebase/firestore"; 

async function deleteData(docId) {
  await deleteDoc(doc(firestore, "yourCollectionName", docId));
  console.log("Document deleted");
}
