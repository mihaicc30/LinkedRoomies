import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, getDoc, where, orderBy, doc, updateDoc } from "firebase/firestore";

async function removeRating(roomieUser, currUser, userRating){ // the user in cause, current logged in user, logged in user rating
    const q = await query(collection(db, "users"), where("uid", "==", roomieUser));
    const docz = await getDocs(q);
    if(docz.docs[0]?.data()){
      let docID=docz.docs[0]?.id
      let data2=docz.docs[0].data()
      const updatedRatings = data2.rating.filter(ratingEntry => ratingEntry !== String(`${currUser}, ${userRating}`));
      const docRef = await doc(db, 'users', docID)
      await updateDoc(docRef, {
        rating : updatedRatings
      })
    //   to refresh the element?
    } else {
      console.log("user not found");
    }

}


async function addRating(roomieUser, currUser, userRating){
    
    const q = await query(collection(db, "users"), where("uid", "==", roomieUser));
    const docz = await getDocs(q);
    if(docz.docs[0]?.data()){
      let docID=docz.docs[0]?.id
      let data2=docz.docs[0].data()
      data2.rating.push(`${currUser}, ${userRating}`)

      const docRef = await doc(db, 'users', docID)
      await updateDoc(docRef, {
        rating : data2.rating
      })
    //   to refresh the element?
    } else {
      console.log("user not found");
    }
}

export { removeRating, addRating }