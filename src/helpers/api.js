import { collection, addDoc, query, where, getDocs, orderBy  } from "firebase/firestore";
import { db } from './firebase';
import dayjs from 'dayjs';

export const fetch = async(uid) => {
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
      createAt: doc.data().createdAt
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
export const fetch2 = async(uid) => {
  console.log(uid);
  console.log(collection(db, "diaries"));
  const q = query(collection(db, "diaries"), where("uid", "==", uid), orderBy("createdAt", "desc"));

  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  let diaries = [];
  querySnapshot.forEach((doc) => {
    console.log(doc);
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    diaries.push({
      id: doc.id,
      body: doc.data().body,
      rate: doc.data().rate,
      createAt: doc.data().createAt,
    })
  });
  return diaries;
}