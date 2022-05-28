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
         toast: {
            show: false,
            type: '',
            title: '',
            subtitle: ''
        },
        user_data:{
            nome:'',
            email:'',
            cpf:'',
            celular:'',
            sen:'',
            confirmar_sen:''
        },
        warning:{
            nome: false,
            email:false,
            sen: false,
            confirmar_sen: false
        },
        required_field: 'Campo Obrigatório',
        checkbox_query_pi: 'Ao fornecer sua informação pessoal e ao clicar no botão ENVIAR, você está consentindo em compartilhar dados pessoais com o HR Global Mobility.',
        message_options:{
        'required_field': 'Por favor preencher os campos mandatórios',
        },
        overlay: {
            message: '',
            message_options: {
                'user_added_success': 'Usuário cadastrado com sucesso.'
            },
            type: '',
            close_btn_action: 'success'
        },
        show_page_loader: false,
        loading: {

            initial: false
        },
    },
    components: {
        'text_input_standard' : Inputs.text_input_standard,
        'radio_button_standard' : RadioButtons.radio_button_standard,
        'input_field': Inputs.input_text,
        'input_date': Inputs.input_date,
        'text_area_standard': Inputs.text_area_standard,
        'button_standard': Buttons.button_standard,
        'loader': Loaders.loader,
        'checkbox_standard':Checkboxes.checkbox_standard,
        'checkbox_single': Checkboxes.checkbox_single,
        'header_standard': Headers.header_standard,
        'notification_info': Notifications.notification_info,
        'notification_toast': Notifications.notification_toast,
        'overlay_loader': Loaders.overlay_loader,
        'input_files': Inputs.input_files,
        'select_standard': Selects.select_standard,
        'select_common': Selects.select_common
    },
    methods:{

        check_same_pw(){
            if(this.user_data.sen!=this.user_data.confirmar_sen){
                this.toast.type = 'warning';
                this.toast.title = 'Você precisa digitar mesma senha para confirmação';
                this.toast.subtitle = '';
                this.toast.show = true;
                return true;
            }
            return false;
        },

        closeToast(){
            this.toast.show = false;
            this.toast.type = 'info';
            this.toast.title = '';
            this.toast.subtitle = '';
        },

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

            // Missing
            if(this.user_data.nome == false){
                ready_to_go = false;
                this.warning["nome"] = true;
            }

            if(this.email == false){
                ready_to_go = false;
                this.warning["email"] = true;
            }


            // Call backend API to add the data
            if(ready_to_go){

                // Set loader
                this.show_page_loader = true;
                axios.
                    post('/user-management/users/', this.user_data).
                    then(response => {
                        console.log(response.data);
                        this.overlay.message = this.overlay.message_options.user_added_success;
                        this.overlay.type = "Seu usuario foi cadastrado com sucesso"
                        this.loading.initial = false;
                        window.location = '/home_page';
                    })
            }
            else if(!ready_to_go){
                this.toast.type = 'warning';
                this.toast.title = 'Por favor preencher os campos obrigatórios';
                this.toast.subtitle = '';
                this.toast.show = true;
            }
        },
        closeButtonOverlayHandler: function (e) {
            if (this.overlay.close_btn_action == 'success') {
                window.location = "/home_page";
            }
        },

        showOverlay: function () {

            document.getElementById("custom-overlay").style.display = "block";
        },

        hideOverlay: function () {

            document.getElementById("custom-overlay").style.display = "none";
        },

        load_contexts: function(){
            axios.
                get('/context_management/context/')
                    .then(response => {
                        for(var x in response.data){
                            this.contexts.push({'value': response.data[x]._id, 'text': response.data[x].name});
                        }
                    });
        },
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
                            v-bind:warning="warning.nome"
                            v-bind:invalid="warning.nome"
                            >
                        </text_input_standard>
                   </div>
                   <div class="bx--col" style="">
                            <text_input_standard
                            v-model="user_data.email"
                            v-bind:label="'Email'"
                            v-bind:warning="warning.email"
                            v-bind:invalid="warning.email"
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
                            >
                        </text_input_standard>
                   </div>
                   <div class="bx--col" style="">
                            <text_input_standard
                            v-model="user_data.celular"
                            v-bind:label="'Celular'"
                            >
                        </text_input_standard>
                   </div>
                </div>
                <div class="bx--row" style="padding-top:16px">
                   <div class="bx--col" style="">
                            <text_input_standard
                            v-model="user_data.sen"
                            v-bind:select_id="'sen_select_id'"
                            v-bind:label="'Sen'"
                            v-bind:warning="warning.sen"
                            v-bind:invalid="warning.sen"
                            v-bind:mandatory="true"
                            :invalid_msg="required_field"
                            >
                        </text_input_standard>
                   </div>
                   <div class="bx--col" style="">
                            <text_input_standard
                            v-model="user_data.confirmar_sen"
                            v-bind:select_id="'confirmar_sen_select_id'"
                            v-bind:label="'Confirmar Senha'"
                            :warning_message="warning.confirmar_sen ? required_field : ''"
                            v-bind:mandatory="true"
                            v-on:change.native="check_same_pw()"
                            v-bind:warning="warning.confirmar_sen"
                            v-bind:invalid="warning.confirmar_sen"
                            :invalid_msg="required_field"
                            >
                        </text_input_standard>
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
                            @click.native="this.window.location='/home_page'"
                            >
                        </button_standard>
                     </div>
                </div>
            </div>
            <footer class="footer">
                <p>Precisa de ajuda ? Entre em contato conosco.</p>
            </footer>
            <notification_toast
                    :show="toast.show"
                    :type="toast.type"
                    :title="toast.title"
                    :subtitle="toast.subtitle"
                    v-on:close-toast="toast.show = false"
                    >
            </notification_toast>
            <overlay_loader
                    :is_visible="loading.initial"
            >
            </overlay_loader>
        </div>
    `
})