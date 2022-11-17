import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css';
import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faBan, faBars, faCirclePlus, faCircleXmark, faPenToSquare} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faBars,faCirclePlus,faBan,faPenToSquare,faCircleXmark);

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')

import "jquery/dist/jquery.js";
import "bootstrap/dist/js/bootstrap.js";
import 'toastr/build/toastr.min.js';
