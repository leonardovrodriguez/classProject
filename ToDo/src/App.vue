<template>
  <div id="app">
    <div>
    <ToDo ref="todos" @newTask="newDialog()"/>
    <Dialog ref="dialog" @newTaskData="sendTask($event)"/>
    </div>
  </div>
</template>

<script>
import jquery from 'jquery';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      this.$refs.dialog.openDialog();
    },
    sendTask(taskData){
      this.$refs.todos.addTask(taskData)
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
  margin-top: 60px;
}
</style>
