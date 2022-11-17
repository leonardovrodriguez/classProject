<template> 
    <div class="card">
      <div class="bg-primary card-header" style="color: white">
        <div class="row">
          <div id="headera" class="col-md-10"><font-awesome-icon icon="fa-solid fa-bars"/>FRAMEWORKS</div>
          <button class="col-md-2 float-right btn btn-info" @click="newTask"><font-awesome-icon icon="fa-solid fa-circle-plus" inverse/>ADD</button>
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
              <td scope="col"> {{task.prior}} </td>
              <!-- On check must update task -->
              <td scope="col"> <input class="form-check-input" @click="toggleButton(taski)" type="checkbox" id="flexCheckDefault" v-model="task.done"> </td>
              <td scope="col"> 
                <div class="d-grid gap-1">
                  <button v-if="!tasks[taski].done" @click="sendTaskInfo(taski)" class="btn btn-primary" type="button"><font-awesome-icon icon="fa-solid fa-pen-to-square"/>Update</button>
                  <button @click="deleteTask(taski)" class="btn btn-danger" type="button"><font-awesome-icon icon="fa-solid fa-circle-xmark" />Delete</button>
                </div>
              </td>
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
        this.$emit('newAdd', "Task added successfully!");
      },
      toggleButton(taskIndex){
        this.tasks[taskIndex].done = !this.tasks[taskIndex].done;
      },
      deleteTask(taskIndex){
        console.log('hit');
        this.$emit('deleteTask',taskIndex);
        this.tasks.splice(taskIndex,1);
      },
      sendTaskInfo(taskIndex){
        console.log(taskIndex);
        let taskObject = this.tasks[taskIndex];
        taskObject.index = taskIndex;
        console.log(taskObject);
        //send task w/ neccesary info !include index possibly to swap titles
        this.$emit('updateThisTask', taskObject);
      },
      //recieve updated title from dialog
      updateTask(taskInfo){
        console.log('todo recieved task');
        this.tasks[taskInfo.index] = taskInfo;
        this.$emit('newAdd','Task updated successfully!')
        console.log(this.tasks[taskInfo.index]);
      }
    },
    //global vars to ONLY Component
    data: (global) => ({
      tasks: [],
    }),
  };
  </script>
  