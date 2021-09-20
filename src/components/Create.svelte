<script>
  import { onDestroy } from "svelte";
  import { Slider, TextField, Button } from "smelte";
  import { userId } from '../store';
  import { postDiary } from '../helpers/api';
  let uid = null;
  const unsubscribe = userId.subscribe( id => uid = id);
  console.log('uid : ' + uid);

  let rate = 5;
  let body = '';
  let image, preview = '';

  const submit = async() => {
    if( body.length < 10 ){
      alert('日記の内容は10文字以上書いてください');
      return false;
    }
    console.log('submit!')
    console.log(uid, rate, body);
    const result = await postDiary(uid, body, rate);
    if(!result){
      alert('日記の追加が失敗しました。');
    }else{
      alert('日記が保存されました!');
      document.location.href = '/';
    }
    // ここにfirestoreへPOSTする関数を呼び出す
  }
  onDestroy( () => {
    unsubscribe;
  })

  const onFileSelect = (e) => {
    let target = e.target.files[0];
    image = target;
    let reader = new FileReader();
    reader.readAsDataURL(target);
    reader.onload = e => {
      preview = e.target.result
    };
  }
</script>

<h3>日記を書こう！</h3>
<form on:submit|preventDefault={submit} class='p-5'>
  <p class='mb-4'>今日の気分は{rate}点です</p>
  <Slider class='mb-4' min="1" max="10" bind:value={rate} />
  <TextField label="日記の本文" class="bg-white-900" bind:value={body} textarea rows="5" outlined />
  {#if preview}
    <img src={preview} alt='preview' class='mb-6' />
  {/if}
  <label for='file-input' class='bg-primary-900 text-white-900 px-4 py-3 rounded block w-4/12 m-auto mb-6'>画像を選択</label>
  <input type='file' accept="image/*" id='file-input' class='hidden' bind:this={image} on:change={(e) => onFileSelect(e)} />
  <Button type='submit' class='text-white-900'>日記を保存</Button>
</form>