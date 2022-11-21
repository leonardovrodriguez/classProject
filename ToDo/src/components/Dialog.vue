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
					<div class="bg-primary card-header" style="color: white">
						<font-awesome-icon v-if= "buttonType == 'Update'" icon="fa-solid fa-pen-to-square" />
						<font-awesome-icon v-else icon="fa-solid fa-circle-plus" />
						{{ buttonType + ' Task'}}
					</div>
					<div class="card-body">
						<form class="needs-validation">
							<div class="mb-3">
								<input v-if="buttonType == 'Add'" :class="titleClass" id="title" placeholder="Title" v-model="taskTitle">
								<div class="invalid-feedback">{{titleError}}</div>
							</div>
							<div class="mb-3">
								<input type="email" :class="descrClass" id="exampleFormControlInput1" placeHolder="Description" v-model="taskDescr">
								<div class="invalid-feedback">{{descrError}}</div>
							</div>
							<div class="mb-3">
								<input type="date" :class="dateClass" id="checkin" name="checkin" placeHolder="Pick a deadline" v-model="taskDead">
								<div class="invalid-feedback">{{dateError}}</div>
							</div>
						</form>
						<div class = "row">
						<div class = "col-md-2"><label class="form-label">Priority: </label></div>
						<div class = "col-md-10"></div>
						</div>
						<form id="radioButtons" ref="radioPriority" >
							<div class="form-check form-check-inline" >
								<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" ref="low" value="option1" checked>
								<label class="form-check-label" for="inlineRadio1">Low</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" ref="med" value="option2"> <!---</input> v-model="taskMed">-->
								<label class="form-check-label" for="inlineRadio2">Med</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" ref="high" value="option3"> <!--v-model="taskHigh">-->
								<label class="form-check-label" for="inlineRadio3">High</label>
							</div>
						</form>
					</div>
					<div class="card-footer">
						<button v-if="buttonType == 'Add'" type="button" class="btn btn-primary" @click="addTask"><font-awesome-icon icon="fa-solid fa-circle-plus" inverse/>Add</button>
						<button v-if="buttonType == 'Update'" type="button" class="btn btn-primary" @click="updateTask"><font-awesome-icon icon="fa-solid fa-pen-to-square" />Edit</button>
						<button type="button" ref="closeButton" class="btn btn-danger" data-bs-dismiss="modal" @click="clearFields()"><font-awesome-icon icon="fa-solid fa-ban" />Cancel</button>
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
	import moment from 'moment';

	export default {	
	//life cycles
	created() {
	},
	mounted(){
		
	},
	//methods
	methods: {
		clearFields(){
			this.taskHeader=`SubmitOrUpdate`;
			this.taskTitle=``;
			this.taskDescr=``;
			this.taskDead=``;
			this.taskPri=``;
			this.isComplete= false;
			this.$refs.low.checked = true;
			this.radioError= ``;
			this.titleClass=`form-control`;
			this.titleError=``;
			this.dateClass= `form-control`;
			this.dateError=``;
			this.descrClass= `form-control`;
			this.descrError=``;
			this.index=null;
		},
		setFields(taskObject){
			this.taskTitle= taskObject.title;
			this.taskDescr= taskObject.descr;
			this.taskDead= moment(taskObject.dead, 'MM/DD/YYYY').format('YYYY-MM-DD');
			this.taskPri = taskObject.prior;
			this.index = taskObject.index;
			/**Check Radio*/
			if (taskObject.prior == 'low'){
				this.$refs.low.checked = true;
			}
			else if (taskObject.prior == 'med'){
				this.$refs.med.checked = true;
			}
			else{
				this.$refs.high.checked = true;
			}
		},
		toggleButton(toggleType){
			this.buttonType = toggleType;
		},
		openDialog(){
			this.$refs.modalTrigger.click();
		},
		closeDialog(){
			this.$refs.closeButton.click();
		},
	  	updateTask() {
			if (!this.validate()) return;

			const updatedTask = 
			{
				title: this.taskTitle,
				descr: this.taskDescr,
				dead: moment(this.taskDead, 'YYYY-MM-DD').format('MM/DD/YYYY'),
				prior: this.taskPri,
				done: this.isComplete,
				index: this.index
			};
			this.titles[this.index] = this.taskTitle;
			this.clearFields();
			this.$emit('updatedTask',updatedTask);
			this.closeDialog();
		},
	  	validate(){
			console.log(this.index);
			let valid = true;
			
			/** Set Priority */
			if (this.$refs.med.checked)
				this.taskPri = `med`;
			else if (this.$refs.high.checked)
				this.taskPri = `high`;
			else 
				this.taskPri = `low`;
			console.log(this.taskTitle);
			console.log(this.titles.includes(this.taskTitle));
			console.log(this.titles.indexOf(this.taskTitle));
			console.log(this.titles.indexOf(this.taskTitle));
			console.log(this.index);
			/** Non-empty unique title check*/
			if (this.taskTitle ==``){
				this.titleError = `Please enter a title`;
				this.titleClass = `form-control is-invalid`;
				valid = false;
			}
			/**not unique **/
			/** if title is already present check to see if were are updating a value by referencing index*/
			else if(this.titles.includes(this.taskTitle) && this.titles.indexOf(this.taskTitle) > -1 && this.titles.indexOf(this.taskTitle) != this.index){
				this.titleError = `Please enter a unique title`;
				this.titleClass = `form-control is-invalid`;
				valid = false;
			}
			/**reset error*/
			else{ 
				this.titleClass = `form-control`;
			}
			
			/** Validate Date */
			if (this.taskDead == ``){
				this.dateError = `Please pick a deadline`;
				this.dateClass = `form-control is-invalid`;
				valid = false;
			}
			else{
				this.dateClass=`form-control`;
			}	

			/**Validate descr */
			if (this.taskDescr == ``){
				this.descrError = `Please write a description`;
				this.descrClass = `form-control is-invalid`;
				valid = false;
			}
			else{
				this.descrClass=`form-control`;
			}

			return valid;		

	  	},
	  	addTask() {
			if (!this.validate()) return; //validate add notifs
			
			const newTask = 
			{
				title: this.taskTitle,
				descr: this.taskDescr,
				dead: moment(this.taskDead, 'YYYY-MM-DD').format('MM/DD/YYYY'),
				prior: this.taskPri,
				done: this.isComplete
			};
			this.titles.push(this.taskTitle);
			this.clearFields();
			this.$emit('newTaskData',newTask);
			this.closeDialog();
		},
		removeTitle(titleIndex){
			console.log('deleted' + titleIndex);
			console.log(this.titles);
			this.titles.splice(titleIndex,1);
			console.log(this.titles);
		}
	},
	props:{
		isOpen: String
	},
	//global vars
	data: (global) => ({
	  taskTitle:``,
	  taskDescr:``,
	  taskDead:``,
	  taskPri:``,
	  isComplete: false,
	  taskLow: true,
	  taskMed: false,
	  taskHigh: false,
	  titleClass: `form-control`,
	  titleError:``,
	  titles: [],
	  dateClass: `form-control`,
	  dateError:``,
	  descrClass: `form-control`,
	  descrError:``,
	  buttonType:``,
	  index:null,
	}),
  };
</script>
  