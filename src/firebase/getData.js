import { firestore } from "./firebase";
import { collection, getDocs } from "firebase/firestore"; 

async function getData() {
  const querySnapshot = await getDocs(collection(firestore, "yourCollectionName"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => `, doc.data());
  });
}
