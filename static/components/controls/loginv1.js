import * as Inputs from "/static/components/carbon-collections/inputs.js";
import * as Checkboxes from "/static/components/carbon-collections/checkboxes.js";
import * as Buttons from "/static/components/carbon-collections/buttons.js";
import * as Loaders from '/static/components/carbon-collections/loaders.js';
import * as Selects from '/static/components/carbon-collections/selects.js';
import * as Notifications from '/static/components/carbon-collections/notifications.js';
import * as Headers from '/static/components/carbon-collections/headers.js';
import * as RadioButtons from '/static/components/carbon-collections/radio_buttons.js';


var user_register = new Vue ({
    el: '#login',
    data:{
            login_data:{
            email:'',
            senha:'',
            login:''
        },
        warning:{
            nome: false,
            email: false,
            senha: false,
        },
        required_field: 'Campo Obrigatório',
        message_options:{
        'required_field': 'Por favor preencher os campos mandatórios',
        },
    },
    components: {
        'text_input_standard' : Inputs.text_input_standard,
        'radio_button_standard' : RadioButtons.radio_button_standard,
        'input_field': Inputs.input_text,
        'notification_info': Notifications.notification_info,
        'notification_toast': Notifications.notification_toast,
        'button_standard': Buttons.button_standard,
        'header_standard': Headers.header_standard,
    },
    methods:{
        submit_data: function(){

           // Clear Alert Message
            this.overlay.message = '';
            this.overlay.type = '';
            this.closeToast();

            // Reset warnings
            for(var x in this.warning){
                this.warning[x] = false;
            }
            // Identify missing mandatory fields
            var ready_to_go = true;
            var ready_to_go_date = true;
            for(var x in this.warning){
                if(this.business_data[x] == ""){
                   this.warning[x] = true;
                   ready_to_go = false;
                }
            }

        }
   },
    template: `
        <div>
            <!-- Main header -->
            <header_standard>
            </header_standard>
            <!-- Logo -->
            <div class="bx--row" style="margin-top: 3rem; margin-right: unset; margin-left: unset;">
                <div class="bx--col-xs-12 bx--col-lg-12" style="
                    height: 100%;
                    width: 100%;
                    padding: unset;
                    ">
                    <div style="background-image: url(/static/images/banner-v1.2.png);
                        background-position: center center;
                        height: 150%;
                        width: 100%;
                        background-size: 100%;
                    ">
                        <h2 class="h2">
                            Cross Border Travel</br>
                            Query Form
                        </h2>
                    </div>
                </div>
            </div>
            <div class= "bx--grid " style="padding-left: 4%; padding-right: 15%; margin-left: 35%; margin-right: 15px;">
                <!-- Personal Details Section -->
                <div class="bx--row" style="padding-top:5px; padding-bottom: 16px;">
                    <div class="bx--col" style="margin-left: auto; margin-right: auto;">
                        <img src="/static/images/details_black.png" style="float:left; vertical-align: bottom; padding-top:3px;"/>
                        <h3 class="h1" style="float:left; vertical-align: bottom;">&nbsp;Entrar</h3>
                    </div>
                </div>
                <div class="bx--row" style="padding-top:16px">
                   <div class="bx--col" style="">
                            <text_input_standard
                            v-model="login_data.email"
                            v-bind:label="'Email'"
                            v-bind:mandatory="true"
                            :invalid_msg="required_field"
                            >
                        </text_input_standard>
                   </div>
                   <div class="bx--col">
                   </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                   <div class="bx--col">
                        <text_input_standard
                            v-model="login_data.senha"
                            v-bind:label="'Senha'"
                            v-bind:mandatory="true"
                            :invalid_msg="required_field"
                            >
                        </text_input_standard>
                   </div>
                   <div class="bx--col">
                   </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                    <div class="bx--col"style="padding-left:15px;"></div>
                    <div class="bx--col--2" style="padding-left:x;padding-right:150px;margin-right:px">
                         <button_standard
                            style="background-color: #00bfff; font-weight: bold; text-align: center;"
                            v-model="login_data.login"
                            v-bind:label="'Login'"
                            v-bind:mandatory="true"
                            :invalid_msg="required_field"
                            >
                         </button_standard>
                    </div>
                    <div class="bx--col--2" style="padding-left:15px;padding-right:150px;margin-right:px">
                         <button_standard
                            style="background-color: #00bfff; font-weight: bold; text-align: center;"
                            v-model="login_data.login"
                            v-bind:label="'Logar com o Google'"
                            v-bind:mandatory="true"
                            :invalid_msg="required_field"
                            >
                         </button_standard>
                    </div>
                    <div class="bx--col"></div>
                    <div class="bx--col"></div>
                    <div class="bx--col"></div>
                </div>
                <!-- Personal Details Section -->
                <div class="bx--row" style="padding-top:20px; padding-bottom: 5%;">
                    <div class="bx--col" >
                        <div class="bx--row" style="margin-right: 30%; margin-left: 5%; margin-top:px;">
                            <div class="bx--col--2" style="text-align: center;">
                                <div class="bx--col" style="text-align: center;">
                                    <h4 @click="this.window.location='/user_register'"  style="text-color:#191970"><a href="user_register">Criar minha conta</a></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="footer">
                <p>Precisa de ajuda ? Entre em contato conosco.</p>
            </footer>
        </div>
      `
    })