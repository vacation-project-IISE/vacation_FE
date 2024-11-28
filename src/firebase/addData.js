import { firestore } from "./firebase"; // firebase.js에서 firestore 가져오기
import { collection, addDoc } from "firebase/firestore"; // Firestore 기능 가져오기

async function addData() {
  try {
    const docRef = await addDoc(collection(firestore, "yourCollectionName"), {
      name: "Example Name",
      age: 30,
      createdAt: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
