<template>
  <div id="app">
      <ToDo ref="todos" @newTask="newDialog()" @deleteTask="deleteTask($event)" @updateThisTask="updateTask($event)" @newAdd="successNotification($event)"/>
      <Dialog ref="dialog" @newTaskData="sendTask($event)" @updatedTask="sendUpdatedTask($event)"/>
  </div>
</template>

<script>
import jquery from 'jquery';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import toastr from 'toastr';
import ToDo from './components/ToDo.vue';
import Dialog from './components/Dialog.vue';

export default {
  name: 'App',
  components: {
    ToDo,
    Dialog,
  },
  methods:{
    newDialog(){
      console.log("hit");
      this.$refs.dialog.clearFields();
      this.$refs.dialog.toggleButton('Add');
      this.$refs.dialog.openDialog();
      //open w/ data 
    },
    sendTask(taskData){
      this.$refs.todos.addTask(taskData)
    },
    deleteTask(titleIndex){
      this.$refs.dialog.removeTitle(titleIndex);
      toastr.success("Task deleted!");
    },
    updateTask(taskObject){
      this.$refs.dialog.setFields(taskObject);
      this.$refs.dialog.toggleButton('Update');
      this.$refs.dialog.openDialog();
    },
    sendUpdatedTask(taskObject){
      console.log('updatedTask');
      console.log(taskObject);
      this.$refs.todos.updateTask(taskObject);

    },
    successNotification(message){
      toastr.success(message);
    }
  },
  data: (global) => ({
      isOpen: '',
    }),
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
