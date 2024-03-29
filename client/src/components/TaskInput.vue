<!--
      Mission One: Add a task input

      Create a task input according to the design in the README.md file.

      Definition of done:
      [x] User can type into the input
      [x] A button with the text "Add" is visible
      [x] User can click the button to submit the input
       
      Your submission will be judged out of ten points based
      on the following criteria:
      
      Design fidelity - 5 points total
        - Is the spacing correct? (e.g. padding, margin) - 2 points
        - Is there good interaction feedback? (e.g. hover, focus, active states) - 3 points
      Code quality - 5 points
        - Are concerns clearly separeted? (e.g. clear responsibilities for functions, etc.) - 3 point
        - Is the code easy to read and understand? - 2 points
    -->

<template>
  <div class="task-input">
    <div id="input-task-wrapper">
      <input type="text" placeholder="Add a new task...." v-model="taskContent" @keydown.enter="pushTask(lastTaskId, taskAmount)"/>
      <button @click="pushTask(lastTaskId, taskAmount)">Add</button>
    </div>
  </div>
</template>

<!-- 
 * Component design is up to you. You'll define the props,
 * events, and methods for the component here.
 * 
 * Good luck!
-->
<script setup lang="ts">
  import { ref } from 'vue';
  import type { Task } from '../utils/types'; 

  /* composables */
  import { useSubmitTask } from '../composables/useSubmitTask';

  defineProps<{ 
    lastTaskId: number; 
    taskAmount: number;
  }>();
  
  const {submitTask} =  useSubmitTask();
  const taskContent = ref('');

  const emit = defineEmits(['taskSubmitted']); 
  //Emits the task to the parent component (Challenge.vue), where it will be added to the tasks array.
  function sendTask(task: Task){
    emit('taskSubmitted', task );
    return;
  }
  
  // Insert task into the database
  function pushTask(lastTaskId: number, taskAmount: number){
    // Maintain data integrity by removing whitespace and checking length
    const content = taskContent.value.trim();
    if(content.length > 0 && content.length <= 255){ // Noticed in schema char limit was not set, so default is usually 255
      //Setting the new task id
      const newId = lastTaskId + 1;
      if(lastTaskId === undefined){
        const newId = 1;
      }
      const task = {tasks_id: newId, content: content, is_complete: false, order: taskAmount + 1};
      submitTask(task, sendTask); //Submit task to the database, with the callback to emit the task to the parent component
      taskContent.value = '';
    }
    else{
      // Alert user to the issue
      alert('Task must be between 1 and 255 characters long');
    }
  }

</script>

<style scoped lang="scss">
  div#input-task-wrapper{
    position: relative;
  }
  // For input inside the wrapper.
  div#input-task-wrapper input{
    width: 100%;
    padding: var(--space-2) var(--space-3); 
    font-size: var(--fs-3); 
    font-family: "Open Sans", sans-serif;
    color: var(--color-text);
    border-radius: var(--border-radius-1);
    border: 2px solid var(--color-border);
    background-color: var(--color-input-background);
  }
  div#input-task-wrapper input:focus{
    outline: none;
  }

  // For the input placeholder inside wrapper.
  div#input-task-wrapper input::placeholder{
    font-style: italic;
    color: var(--color-text);
  }
  div#input-task-wrapper input:focus::placeholder{
    color: transparent;
  }
  div#input-task-wrapper input:placeholder-shown:hover{
    cursor: pointer;
  }

  // For the button inside the wrapper.
  div#input-task-wrapper button{
    position: absolute;
    right: var(--space-2);
    top: 9px; //Centered button, calculated((42.4 - 24.08) / 2) = 9.16 or could also use flexbox if desired
    font-weight: bold;
    letter-spacing: 2px;
    background-color: var(--color-primary);
    color: var(--color-text);
    border-radius: var(--border-radius-1);
    cursor: pointer;
    border: none;
    box-shadow: var(--box-shadow-1);
    padding: var(--space-1) var(--space-3);
    font-size: var(--fs-2); 
    background-color: var(--theme-c-white);
  }
  div#input-task-wrapper button:active{
    color: var(--color-accent-one);
  }
</style>
