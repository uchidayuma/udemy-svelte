<script>
  import { Slider, TextField, Button } from "smelte";

  let rate = 5;
  let body = '';
</script>

<h3>日記を書こう！</h3>
<form class='p-5'>
  <p class='mb-4'>今日の気分は{rate}点です</p>
  <Slider class='mb-4' min="0" max="10" bind:value={rate} />
  <TextField label="日記の本文" class="bg-white-900" bind:value={body} textarea rows="5" outlined />
  <Button outlined>日記を保存</Button>
</form>