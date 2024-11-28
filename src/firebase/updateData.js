import { firestore } from "./firebase";
import { doc, updateDoc } from "firebase/firestore"; 

async function updateData(docId) {
  const docRef = doc(firestore, "yourCollectionName", docId);
  await updateDoc(docRef, {
    name: "Updated Name",
  });
  console.log("Document updated");
}
