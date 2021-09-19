import { collection, doc, getDoc, addDoc, query, where, getDocs, orderBy, updateDoc  } from "firebase/firestore";
import { db } from './firebase';
import dayjs from 'dayjs';

export const fetch = async(uid = '') => {
  const q = query(collection(db, "diaries"), where("uid", "==", uid), orderBy("createdAt", "desc"));

  const querySnapshot = await getDocs(q);
  let diaries = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    diaries.push({
      id: doc.id,
      body: doc.data().body,
      rate: doc.data().rate,
      image: doc.data().image,
      createdAt: doc.data().createdAt
    })
  });
  return diaries;
}


// Add a new document with a generated id.
export const postDiary = async(uid = '', body = '', rate = 1) => {
  const docRef = await addDoc(collection(db, "diaries"), {
    uid: uid,
    rate: rate,
    body: body,
    image: "",
    createdAt: dayjs().format('YYYY/MM/DD HH:mm:ss')
    // 2021/09/18 09:30:00
  });
  console.log("Document written with ID: ", docRef.id);
  // もし追加に成功したら、 trueを返す、失敗ならfalse
  return docRef.id ? true : false;
}

export const getDiary = async(id = 'test') =>{
  const docRef = doc(db, "diaries", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return false;
  }
}

export const updateDiary = async(id = '', body = '' , rate = 1, image = '') => {
  const diaryRef = doc(db, "diaries", id);
  if( !diaryRef ){ return false; }
  await updateDoc(diaryRef, {
    body: body,
    rate: rate,
    image: "",
  });

  return true;
}