import * as Inputs from "/static/components/carbon-collections/inputs.js";
import * as Checkboxes from "/static/components/carbon-collections/checkboxes.js";
import * as Buttons from "/static/components/carbon-collections/buttons.js";
import * as Loaders from '/static/components/carbon-collections/loaders.js';
import * as Selects from '/static/components/carbon-collections/selects.js';
import * as Notifications from '/static/components/carbon-collections/notifications.js';
import * as Headers from '/static/components/carbon-collections/headers.js';
import * as RadioButtons from '/static/components/carbon-collections/radio_buttons.js';


var user_register = new Vue ({
    el: '#user_register',
    data:{
            user_data:{
            nome:'',
            email:'',
            cpf:'',
            celular:'',
            senha:'',
            confirmar_senha:''
        },
        warning:{
            nome: false,
        },
        required_field: 'Campo Obrigatório',
        checkbox_query_pi: 'Ao fornecer sua informação pessoal e ao clicar no botão ENVIAR, você está consentindo em compartilhar dados pessoais com o HR Global Mobility.',
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
            for(var x in this.warning){
                if(this.user_data[x] == ""){
                   this.warning[x] = true;
                   ready_to_go = false;
                }
            }

            // Set loader
            this.loading.initial = true;

            this.show_page_loader = true;

            // 2. Call backend API to add the data
            if(ready_to_go){
                axios.
                        post('/assessment-management/user_data/', this.user_data).
                        then(response => {
                                var doc_id = response.data._id.replace(":","_._");
                                var user_id = response.data.user_id;
                                let config = {
                                  header : {
                                   'Content-Type' : 'multipart/form-data'
                                 }
                                }
                                axios.post('/assessment-management/user_data/' + doc_id ,  config).then(
                                  response2 => {
                                    this.loading.initial = false;
                                    window.location = '/home_page?submitted=' + user_id;
                                    // redirect to home page with a message that the request (ID) was submitted with success
                                }).catch(function (error) {
                                    this.loading.initial = false;
                                    var user_id = response.data.user_id;
                                    window.location = '/home_page?submitted=' + user_id ;
                                });
                        }else{
                            this.loading.initial = false;
                            var user_id = response.data.user_id;
                            window.location = '/home_page?submitted=' + user_id;

                        }
                })
            else if(!ready_to_go){
                    this.toast.type = 'warning';
                    this.toast.title = 'Por favor preencher os campos obrigatórios';
                    this.toast.subtitle = '';
                    this.toast.show = true;
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
            <div class= "bx--grid " style="padding-left: 4%; padding-right: 45%; margin-left: auto; margin-right: 15px;">
                <!-- Personal Details Section -->
                <div class="bx--row" style="padding-top:28px; padding-bottom: 16px;">
                    <div class="bx--col" style="margin-left: auto; margin-right: auto;">
                        <img src="/static/images/details_black.png" style="float:left; vertical-align: bottom; padding-top:3px;"/>
                        <h3 class="h1" style="float:left; vertical-align: bottom;">&nbsp;Novo Cadastro</h3>
                    </div>
                </div>
                <div class="bx--row" style="padding-top:16px">
                   <div class="bx--col" style="">
                            <text_input_standard
                            v-model="user_data.nome"
                            v-bind:label="'Nome Completo'"
                            v-bind:mandatory="true"
                            :invalid_msg="required_field"
                            >
                        </text_input_standard>
                   </div>
                   <div class="bx--col" style="">
                            <text_input_standard
                            v-model="user_data.email"
                            v-bind:label="'Email'"
                            v-bind:mandatory="true"
                            :invalid_msg="required_field"
                            >
                        </text_input_standard>
                   </div>
                </div>
                <div class="bx--row" style="padding-top:16px">
                   <div class="bx--col" style="">
                            <text_input_standard
                            v-model="user_data.cpf"
                            v-bind:label="'CPF'"
                            v-bind:mandatory="true"
                            :invalid_msg="required_field"
                            >
                        </text_input_standard>
                   </div>
                   <div class="bx--col" style="">
                            <text_input_standard
                            v-model="user_data.celular"
                            v-bind:label="'Celular'"
                            v-bind:mandatory="true"
                            :invalid_msg="required_field"
                            >
                        </text_input_standard>
                   </div>
                </div>
                <div class="bx--row" style="padding-top:16px">
                   <div class="bx--col" style="padding-right:100px;margin-right:250px">
                            <text_input_standard
                            v-model="user_data.senha"
                            v-bind:label="'Senha'"
                            v-bind:mandatory="true"
                            :invalid_msg="required_field"
                            >
                        </text_input_standard>
                   </div>
                </div>
                <div class="bx--row" style="padding-top:16px; padding-bottom:16px">
                   <div class="bx--col" style="padding-right:100px;margin-right:250px">
                            <text_input_standard
                            v-model="user_data.confirmar_senha"
                            v-bind:label="'Confirmar Senha'"
                            v-bind:mandatory="true"
                            :invalid_msg="required_field"
                            >
                        </text_input_standard>
                   </div>
                </div>
            </div>
                <div class="bx--row" style="padding-top:16px; padding-bottom:32px;">
                     <div class= "bx--col--2" style=""></div>
                     <div class= "bx--col--2" style="">
                        <button_standard
                            theme="Primary"
                            label="Enviar"
                            v-on:click.native="submit_data()"
                            style="float: right;">
                            >
                        </button_standard>
                        <button_standard
                            theme="tertiary"
                            label="Cancelar"
                            style="float: right; margin-right: 10px;margin-left: 65px"
                            @click.native="this.window.location='/my_assessments'"
                            >
                        </button_standard>
                     </div>
                </div>
            <footer class="footer">
                <p>Precisa de ajuda ? Entre em contato conosco.</p>
            </footer>
        </div>
      `
    })