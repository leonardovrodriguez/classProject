<template>

<!-- Button trigger modal -->
<button id="modalTrigger" ref="modalTrigger" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style ="display:none" >
  Launch demo modal
</button>
<!--Modal-->
<div class="modal fade" ref="myModal" id="exampleModal" tabindex="-1">
	<div class="modal-dialog">
		<div class ="modal-content">
			<div class = modal-body>
				<div class="card">
					<div class="bg-primary card-header" style="color: white"> {{ taskHeader }} </div>
					<div class="card-body">
						<form>
							<div class="mb-3"><input type="email" class="form-control" id="title" placeholder="Title" v-model="taskTitle"></div>
							<div class="mb-3"><input type="email" class="form-control" id="exampleFormControlInput1" placeHolder="Description" v-model="taskDescr"></div>
							<div class="mb-3"><input type="date" class="form-control" id="checkin" name="checkin" placeHolder="Pick a deadline"></div>
						</form>
						<div class = "row">
						<div class = "col-md-2"><label class="form-label">Priority: </label></div>
						<div class = "col-md-10"></div>
						</div>
						<form id="radioButtons" checked>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
								<label class="form-check-label" for="inlineRadio1">Low</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
								<label class="form-check-label" for="inlineRadio2">Med</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" >
								<label class="form-check-label" for="inlineRadio3">High</label>
							</div>
						</form>
						<button type="button" class="btn btn-primary" @click="addTask">Add</button>
						<button type="button" ref="closeButton" class="btn btn-warning" data-bs-dismiss="modal">Cancel</button>
					</div>
				</div>
			</div>
		</div>
  	</div>
</div>  

</template>
  
<script>
  	import $ from 'jquery';
	import "bootstrap/dist/js/bootstrap.js";

	export default {	
	//life cycles
	created() {
	},
	mounted(){
		
	},
	//methods
	methods: {
		openDialog(){
			this.$refs.modalTrigger.click();
		},
		closeDialog(){
			this.$refs.closeButton.click();
		},
		addTask() {
			//if (!validate()) return; //in validate add notifs
			const newTask = 
			{
				title: this.taskTitle,
				descr: this.taskDescr,
				dead: this.task, 
				prior: this.taskPri,
				done: this.isComplete
			};
			console.log(newTask);
			this.$emit('newTaskData',newTask);
			this.closeDialog();
		},
	  updateTask() {},
	  
	  validate(){
		return true;
		/** Validate Priority */


		/** Validate Date */


		/**Validate else */
	  }
	  
	},
	props:{
		isOpen: String
	},
	//global vars
	data: (global) => ({
	  taskHeader:`SubmitOrUpdate`,
	  taskTitle:``,
	  taskDescr:``,
	  taskDead:``,
	  taskPri:``,
	  isComplete: `checked`,
	}),
  };
</script>
  