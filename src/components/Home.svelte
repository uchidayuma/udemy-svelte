<script>
  import { onMount, onDestroy } from "svelte";
  import { Router, Link } from 'svelte-routing';
  import { Button } from "smelte";
  import { userId } from '../store';
  import { fetch } from '../helpers/api';
  import StarRating from 'svelte-star-rating';
  import dayjs from 'dayjs';
  let uid;
  const unsubscribe = userId.subscribe(id => uid = id);
  let promise = fetch();
  onMount( async() => {
    promise = await fetch(uid);
    console.log(promise);
  })
  onDestroy( () => { unsubscribe; })
</script>
  
{#await promise}
  <p>Loading ...</p>
{:then diaries} 
  <Router>
    {#each diaries as d}
      <Link to={'/diary/' + d.id} class='flex items-center mb-6'>
        <aside class='diary-aside'>
          <p class='text-left'>{dayjs(d.createdAt).format('YYYY年MM月DD日')}</p>
          <img src={ d.image ? d.image : '/dummy.jpeg'} class='diary-image' alt='diary'/>
          <p><StarRating rating={d.rate / 2} /></p>
        </aside>
        <p>{d.body}</p>
      </Link>
    {/each}
  </Router>
  
{/await}

<style>
  .diary-aside {
    width: 40%;
    margin-right: 1rem;
  }
  .diary-image{
    width: 100%;
  }
</style>