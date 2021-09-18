import { collection, addDoc } from "firebase/firestore";
import { db } from './firebase';
import dayjs from 'dayjs';

// Add a new document with a generated id.
export const postDiary = async(uid = '', body = '', rate = 1) => {
  const docRef = await addDoc(collection(db, "diaries"), {
    uid: uid,
    rate: rate,
    body: body,
    image: "",
    createAt: dayjs().format('YYYY/MM/DD HH:mm:ss')
    // 2021/09/18 09:30:00
  });
  console.log("Document written with ID: ", docRef.id);
  // もし追加に成功したら、 trueを返す、失敗ならfalse
  return docRef.id ? true : false;
}