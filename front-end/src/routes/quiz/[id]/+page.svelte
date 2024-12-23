<script>
	import { page } from '$app/stores';
  import axios from "axios";
  import { set_progress } from "../../../store/lesson";

  let changeStatudBar = ()=>{
    //  progress = false;
     set_progress.update(val => val + (1/(10))*100); 
 }

//  const load_data = async() => {
//     const id = page.
//     const response_title =  axios
//  }
</script>

<div>
    {$set_progress}
    quiz
    <button on:click={changeStatudBar}>+</button>
</div>