<template> 
    <div class="card">
      <div class="bg-primary card-header" style="color: white">
        <div class="row">
          <div id="headera" class="col-md-10">Frameworks</div>
          <button class="col-md-2 float-right" @click="newTask">Button</button>
        </div>
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Deadline</th>
              <th scope="col">Priority</th>
              <th scope="col">Is Complete</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, taski) in tasks">
              <td scope="col"> {{task.title}} </td>
              <td scope="col"> {{task.descr}} </td>
              <td scope="col"> {{task.dead}} </td>
              <td scope="col"> {{task.taskpri}} </td>
              <td scope="col"> {{}} </td>
              <!-- On check must update task -->
              <td scope="col"> <input class="form-check-input" type="checkbox" id="flexCheckDefault" {{task.done}}> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>
  <script>
  
  //master
  export default {
    //life cycles
    created() {},
    //methods
    methods: {
      newTask(){
        this.$emit('newTask','Process new task');
      },
      addTask(data){
        this.tasks.push(data);
      }
    },
    //global vars to ONLY Component
    data: (global) => ({
      tasks: [],
    }),
  };
  </script>
  