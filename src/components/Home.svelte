<script>
import { onDestroy, onMount } from "svelte";
import { Button } from "smelte";
import { fetch } from '../helpers/api';
import { userId } from '../store';
let uid = null;

const unsubscribe = userId.subscribe( id => uid = id);

let promise;

onMount( async() => {
  console.log(promise);
  promise = await fetch(uid)
})
onDestroy( () => { unsubscribe; })

</script>

<p>HOME</p>
<Button>テストボタン</Button>
{#await promise}
...
{:then diaries}
{console.log(diaries)}
{/await}