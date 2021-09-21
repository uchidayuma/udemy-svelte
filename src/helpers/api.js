import { collection, doc, getDoc, addDoc, query, where, getDocs, orderBy, limit, updateDoc, deleteDoc  } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from './firebase';
import dayjs from 'dayjs';

export const fetch = async(uid = '', filterMonth = null) => {
  let q;
  if(filterMonth){
    // filterMonth = 2021-09 → 2021/09/13
    filterMonth = filterMonth.replace("-", "/");
    q = query(collection(db, "diaries"),
      where("uid", "==", uid),
      where("createdAt", ">=", filterMonth + '/01' ),
      where("createdAt", "<=", filterMonth + '/31'),
      limit(31));
  }else{
    q = query(collection(db, "diaries"), where("uid", "==", uid), orderBy("createdAt", "desc"), limit(31));
  }

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
export const postDiary = async(uid = '', body = '', rate = 1, image = null) => {
  let uploadResult = '';
  if(image.name){
    const storageRef = ref(storage);
    // 拡張子を取得
    const ext = image.name.split('.').pop();
    // 画像ファイル名を固定しておく
    const hashName = Math.random().toString(36).slice(-8);
    const uploadRef = ref(storageRef, `/images/${hashName}.${ext}`);
    await uploadBytes(uploadRef, image).then( async function(result) {
      console.log(result);
      console.log('Uploaded a blob or file!');
      // ここでダウンロード（表示）URLを取得
      await getDownloadURL(uploadRef).then(function(url){
        uploadResult = url;
      });
    })
  }
  const docRef = await addDoc(collection(db, "diaries"), {
    uid: uid,
    rate: rate,
    body: body,
    image: uploadResult,
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

export const updateDiary = async(id = '', body = '' , rate = 1, image = null) => {
  let uploadResult = '';
  if(image.name){
    const storageRef = ref(storage);
    // 拡張子を取得
    const ext = image.name.split('.').pop();
    // 画像ファイル名を固定しておく
    const hashName = Math.random().toString(36).slice(-8);
    const uploadRef = ref(storageRef, `/images/${hashName}.${ext}`);
    await uploadBytes(uploadRef, image).then( async function(result) {
      console.log(result);
      console.log('Uploaded a blob or file!');
      // ここでダウンロード（表示）URLを取得
      await getDownloadURL(uploadRef).then(function(url){
        uploadResult = url;
      });
    })
  }
  const diaryRef = doc(db, "diaries", id);
  if( !diaryRef ){ return false; }
  let updateData;
  if(image.name){
    updateData = {
      body: body,
      rate: rate,
      image: uploadResult
    }
  }else{
    updateData = {
      body: body,
      rate: rate,
    }
  }
  await updateDoc(diaryRef, updateData);
  return true;
}

export const deleteDiary = async(id) => {
  if(!id){ return false; }
  await deleteDoc(doc(db, "diaries", id));
  return true;
}