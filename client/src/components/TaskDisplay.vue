<!--
      Mission Two: Add ability to check and uncheck tasks

      Display the tasks according to the design in the README.md file.

      Definition of done:
      [x] A checkbox is visible to the left of the task
      [x] Clicking a checked task will uncheck it
      [x] Clicking an unchecked task will check it
      [x] All task changes are persisted to the database

      Your submission will be judged out of ten points based
      on the following criteria:

      Design fidelity - 5 points total
        - Is the spacing correct? (e.g. padding, margin) - 2 points
        - Is there good interaction feedback? (e.g. hover, focus, active states) - 3 points
      Code quality - 5 points
        - Are concerns clearly separated? (e.g. clear responsibilities for functions, etc.) - 3 point
        - Is the code easy to read and understand? - 2 points
    -->


<!-- Although this mission wasn't listed in read.me, I completed it just in case and for fun.-->   
<template>
  <div class="task-display">
    <div id="task-content-wrapper">
      <input type="checkbox" :checked="completed" @click="isChecked(task)" />
      <p>{{ task.content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Task } from '../utils/types';

  /* composables */
  import { useUpdateTask } from '../composables/useUpdateTask';

  const {updateTask} =  useUpdateTask();
  const emit = defineEmits(['taskUpdate']);

  defineProps<{
    task: Task;
    completed: boolean;
  }>();

  //Emits the task to the parent component (Challenge.vue), where it will be updating the tasks array.
  function sendTask(task: Task){
    emit('taskUpdate', task );
    return;
  }

  //When click on checkbox, update task in database
  function isChecked(task: Task){
    task.is_complete = !task.is_complete;
    updateTask(task, sendTask);
  }
</script>

<style scoped lang="scss">
  div#task-content-wrapper {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }
  div#task-content-wrapper input {
    cursor: pointer;
  }
  .task-display {
    color: var(--color-heading);
    font-size: var(--fs-3);
    font-weight: 500;
    box-shadow: var(--box-shadow-1);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--border-radius-1);
  }
</style>
