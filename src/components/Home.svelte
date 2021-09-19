<script>
  import { onMount, onDestroy } from "svelte";
  import { Button } from "smelte";
  import { userId } from '../store';
  import { fetch } from '../helpers/api';
  let uid;
  const unsubscribe = userId.subscribe(id => uid = id);
  let promise;
  onMount( async() => {
    promise = await fetch(uid);
    console.log(promise);
  })
  onDestroy( () => { unsubscribe; })
</script>
  
<p>HOME</p>
<Button>テストボタン</Button>