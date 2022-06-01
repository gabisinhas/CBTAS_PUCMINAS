import * as Inputs from "/static/components/carbon-collections/inputs.js";
import * as Checkboxes from "/static/components/carbon-collections/checkboxes.js";
import * as Buttons from "/static/components/carbon-collections/buttons.js";
import * as Loaders from '/static/components/carbon-collections/loaders.js';
import * as Selects from '/static/components/carbon-collections/selects.js';
import * as Notifications from '/static/components/carbon-collections/notifications.js';
import * as Headers from '/static/components/carbon-collections/headers.js';
import * as RadioButtons from '/static/components/carbon-collections/radio_buttons.js';


var add_assessment = new Vue ({
    el: '#add_assessment_new',
    data:{
        toast: {
            show: false,
            type: '',
            title: '',
            subtitle: ''
        },
        business_data:{
            cpf:'',
            nome:'',
            last_name:'',
            email:'',
            cellphone:'',
            nacionalidade:'',
            unidadeneg:'',
            project_dept: '',
            email_copy: '',
            origin_country:'',
            destin_country:'',
            query_type:[],
            query_desc:'',
            planned_start:'',
            planned_end:'',
            query_pi: '',
        },
        warning:{
            cpf: false,
            nome: false,
            last_name: false,
            email: false,
            nacionalidade: false,
            origin_country: false,
            destin_country: false,
            query_desc: false,
            planned_start: false,
            planned_end: false,
            query_pi: false,
            query_type: false
        },
        required_field: 'Campo Obrigatório',
        yes_no_options:[
            {'text': 'Sim', 'value': 'Sim'},
            {'text': 'Não', 'value': 'Não'}
        ],
        checkbox_query_type:[
            {'text': 'Immigração', 'value': 'immigration'},
            {'text': 'Taxas', 'value': 'tax'},
            {'text': 'Pós Trabalho','value':'pwn'}
        ],
        checkbox_query_pi: 'Ao fornecer sua informação pessoal e ao clicar no botão ENVIAR, você está consentindo em compartilhar dados pessoais com o HR Global Mobility.',
        overlay: {
            message: '',
            message_options: {
                'assessment_added_success': 'Seu formulário foi submetido com sucesso.'
            },
            type: '',
            close_btn_action: 'success'
        },
        show_page_loader: false,
        loading: {

            initial: false
        },
        message_options:{
        'required_field': 'Por favor preencher os campos mandatórios',
        },
        custom_message: '',
        country_options:[
    {
      "text": "Afghan",
      "value": "Afghan"
    },
    {
      "text": "Albania",
      "value": "Albania"
    },
    {
      "text": "Algeria",
      "value": "Algeria"
    },
    {
      "text": "Angola",
      "value": "Angola"
    },
    {
      "text": "Argentina",
      "value": "Argentina"
    },
    {
      "text": "Armenia",
      "value": "Armenia"
    },
    {
      "text": "Aruba",
      "value": "Aruba"
    },
    {
      "text": "Australia",
      "value": "Australia"
    },
    {
      "text": "Austria",
      "value": "Austria"
    },
    {
      "text": "Azerbaijan",
      "value": "Azerbaijan"
    },
    {
      "text": "Bahamas",
      "value": "Bahamas"
    },
    {
      "text": "Bahrain",
      "value": "Bahrain"
    },
    {
      "text": "Bangladesh",
      "value": "Bangladesh"
    },
    {
      "text": "Barbados",
      "value": "Barbados"
    },
    {
      "text": "Belarus",
      "value": "Belarus"
    },
    {
      "text": "Belgium",
      "value": "Belgium"
    },
    {
      "text": "Benin",
      "value": "Benin"
    },
    {
      "text": "Bermuda",
      "value": "Bermuda"
    },
    {
      "text": "Bolivia",
      "value": "Bolivia"
    },
    {
      "text": "Bosnia",
      "value": "Bosnia"
    },
    {
      "text": "Botswana",
      "value": "Botswana"
    },
    {
      "text": "Brazil",
      "value": "Brazil"
    },
    {
      "text": "Brunei",
      "value": "Brunei"
    },
    {
      "text": "Bulgaria",
      "value": "Bulgaria"
    },
    {
      "text": "Burkina Faso",
      "value": "Burkina Faso"
    },
    {
      "text": "Burundi",
      "value": "Burundi"
    },
    {
      "text": "Cambodia",
      "value": "Cambodia"
    },
    {
      "text": "Cameroon",
      "value": "Cameroon"
    },
    {
      "text": "Canada",
      "value": "Canada"
    },
    {
      "text": "Cape Verde Isle",
      "value": "Cape Verde Isle"
    },
    {
      "text": "Cayman Islands",
      "value": "Cayman Islands"
    },
    {
      "text": "CenAfRep",
      "value": "CenAfRep"
    },
    {
      "text": "Chad",
      "value": "Chad"
    },
    {
      "text": "Chile",
      "value": "Chile"
    },
    {
      "text": "Colombia",
      "value": "Colombia"
    },
    {
      "text": "Comoros",
      "value": "Comoros"
    },
    {
      "text": "Congo",
      "value": "Congo"
    },
    {
      "text": "Costa Rica",
      "value": "Costa Rica"
    },
    {
      "text": "Croatia",
      "value": "Croatia"
    },
    {
      "text": "Curacao",
      "value": "Curacao"
    },
    {
      "text": "Cyprus",
      "value": "Cyprus"
    },
    {
      "text": "Czech Republic",
      "value": "Czech Republic"
    },
    {
      "text": "Dem. Rep. Congo",
      "value": "Dem. Rep. Congo"
    },
    {
      "text": "Denmark",
      "value": "Denmark"
    },
    {
      "text": "Dominican Repub",
      "value": "Dominican Repub"
    },
    {
      "text": "Ecuador",
      "value": "Ecuador"
    },
    {
      "text": "Egypt",
      "value": "Egypt"
    },
    {
      "text": "El Salvador",
      "value": "El Salvador"
    },
    {
      "text": "EqGuinea",
      "value": "EqGuinea"
    },
    {
      "text": "Eritrea",
      "value": "Eritrea"
    },
    {
      "text": "Estonia",
      "value": "Estonia"
    },
    {
      "text": "Ethiopia",
      "value": "Ethiopia"
    },
    {
      "text": "Fiji",
      "value": "Fiji"
    },
    {
      "text": "Finland",
      "value": "Finland"
    },
    {
      "text": "France",
      "value": "France"
    },
    {
      "text": "French Guiana",
      "value": "French Guiana"
    },
    {
      "text": "FrenchPolynesia",
      "value": "FrenchPolynesia"
    },
    {
      "text": "Gabon",
      "value": "Gabon"
    },
    {
      "text": "Gambia",
      "value": "Gambia"
    },
    {
      "text": "GCG-China",
      "value": "GCG-China"
    },
    {
      "text": "GCG-Hong Kong",
      "value": "GCG-Hong Kong"
    },
    {
      "text": "GCG-Taiwan",
      "value": "GCG-Taiwan"
    },
    {
      "text": "Georgia",
      "value": "Georgia"
    },
    {
      "text": "Germany",
      "value": "Germany"
    },
    {
      "text": "Ghana",
      "value": "Ghana"
    },
    {
      "text": "GNBIssau",
      "value": "GNBIssau"
    },
    {
      "text": "Greece",
      "value": "Greece"
    },
    {
      "text": "Guadeloupe",
      "value": "Guadeloupe"
    },
    {
      "text": "Guatemala",
      "value": "Guatemala"
    },
    {
      "text": "Guinea",
      "value": "Guinea"
    },
    {
      "text": "Guyana",
      "value": "Guyana"
    },
    {
      "text": "Haiti",
      "value": "Haiti"
    },
    {
      "text": "Honduras",
      "value": "Honduras"
    },
    {
      "text": "Hungary",
      "value": "Hungary"
    },
    {
      "text": "Iceland",
      "value": "Iceland"
    },
    {
      "text": "India",
      "value": "India"
    },
    {
      "text": "Indonesia",
      "value": "Indonesia"
    },
    {
      "text": "Iran",
      "value": "Iran"
    },
    {
      "text": "Iraq",
      "value": "Iraq"
    },
    {
      "text": "Ireland",
      "value": "Ireland"
    },
    {
      "text": "Israel",
      "value": "Israel"
    },
    {
      "text": "Italy",
      "value": "Italy"
    },
    {
      "text": "Ivory Coast",
      "value": "Ivory Coast"
    },
    {
      "text": "Jamaica",
      "value": "Jamaica"
    },
    {
      "text": "Japan",
      "value": "Japan"
    },
    {
      "text": "Jordan",
      "value": "Jordan"
    },
    {
      "text": "Kazakhstan",
      "value": "Kazakhstan"
    },
    {
      "text": "Kenya",
      "value": "Kenya"
    },
    {
      "text": "Kiribati",
      "value": "Kiribati"
    },
    {
      "text": "Korea",
      "value": "Korea"
    },
    {
      "text": "Kuwait",
      "value": "Kuwait"
    },
    {
      "text": "Kyrgyzst",
      "value": "Kyrgyzst"
    },
    {
      "text": "Laos",
      "value": "Laos"
    },
    {
      "text": "Latvia",
      "value": "Latvia"
    },
    {
      "text": "Lebanon",
      "value": "Lebanon"
    },
    {
      "text": "Lesotho",
      "value": "Lesotho"
    },
    {
      "text": "Liberia",
      "value": "Liberia"
    },
    {
      "text": "Libya",
      "value": "Libya"
    },
    {
      "text": "Liechtenstein",
      "value": "Liechtenstein"
    },
    {
      "text": "Lithuania",
      "value": "Lithuania"
    },
    {
      "text": "Luxembourg",
      "value": "Luxembourg"
    },
    {
      "text": "Macao",
      "value": "Macao"
    },
    {
      "text": "Macedonia",
      "value": "Macedonia"
    },
    {
      "text": "Madagascar",
      "value": "Madagascar"
    },
    {
      "text": "Malawi",
      "value": "Malawi"
    },
    {
      "text": "Malaysia",
      "value": "Malaysia"
    },
    {
      "text": "Maldives",
      "value": "Maldives"
    },
    {
      "text": "Mali",
      "value": "Mali"
    },
    {
      "text": "Malta",
      "value": "Malta"
    },
    {
      "text": "Martinique",
      "value": "Martinique"
    },
    {
      "text": "Maurit",
      "value": "Maurit"
    },
    {
      "text": "Mauritius",
      "value": "Mauritius"
    },
    {
      "text": "Mayotte",
      "value": "Mayotte"
    },
    {
      "text": "Mexico",
      "value": "Mexico"
    },
    {
      "text": "Moldavia",
      "value": "Moldavia"
    },
    {
      "text": "Montenegro",
      "value": "Montenegro"
    },
    {
      "text": "Morocco",
      "value": "Morocco"
    },
    {
      "text": "Mozambique",
      "value": "Mozambique"
    },
    {
      "text": "Myanmar",
      "value": "Myanmar"
    },
    {
      "text": "Namibia",
      "value": "Namibia"
    },
    {
      "text": "Nepal",
      "value": "Nepal"
    },
    {
      "text": "Netherland Ant",
      "value": "Netherland Ant"
    },
    {
      "text": "Netherlands",
      "value": "Netherlands"
    },
    {
      "text": "New Caledonia",
      "value": "New Caledonia"
    },
    {
      "text": "New Zealand",
      "value": "New Zealand"
    },
    {
      "text": "Nicaragua",
      "value": "Nicaragua"
    },
    {
      "text": "Niger",
      "value": "Niger"
    },
    {
      "text": "Nigeria",
      "value": "Nigeria"
    },
    {
      "text": "Norway",
      "value": "Norway"
    },
    {
      "text": "Oman",
      "value": "Oman"
    },
    {
      "text": "Pakistan",
      "value": "Pakistan"
    },
    {
      "text": "Panama",
      "value": "Panama"
    },
    {
      "text": "PapNewGU",
      "value": "PapNewGU"
    },
    {
      "text": "Paraguay",
      "value": "Paraguay"
    },
    {
      "text": "Peru",
      "value": "Peru"
    },
    {
      "text": "Philippines",
      "value": "Philippines"
    },
    {
      "text": "Poland",
      "value": "Poland"
    },
    {
      "text": "Portugal",
      "value": "Portugal"
    },
    {
      "text": "Qatar",
      "value": "Qatar"
    },
    {
      "text": "Republic of Dji",
      "value": "Republic of Dji"
    },
    {
      "text": "Reunion",
      "value": "Reunion"
    },
    {
      "text": "Romania",
      "value": "Romania"
    },
    {
      "text": "Russia",
      "value": "Russia"
    },
    {
      "text": "Rwanda",
      "value": "Rwanda"
    },
    {
      "text": "Saudi Arabia",
      "value": "Saudi Arabia"
    },
    {
      "text": "Senegal",
      "value": "Senegal"
    },
    {
      "text": "Serbia",
      "value": "Serbia"
    },
    {
      "text": "Serbia Monteneg",
      "value": "Serbia Monteneg"
    },
    {
      "text": "Seychelles",
      "value": "Seychelles"
    },
    {
      "text": "Sierra Leone",
      "value": "Sierra Leone"
    },
    {
      "text": "Singapore",
      "value": "Singapore"
    },
    {
      "text": "Slovakia",
      "value": "Slovakia"
    },
    {
      "text": "Slovenia",
      "value": "Slovenia"
    },
    {
      "text": "Somalia",
      "value": "Somalia"
    },
    {
      "text": "South Africa",
      "value": "South Africa"
    },
    {
      "text": "Spain",
      "value": "Spain"
    },
    {
      "text": "Sri Lanka",
      "value": "Sri Lanka"
    },
    {
      "text": "SSudan",
      "value": "SSudan"
    },
    {
      "text": "St Lucia",
      "value": "St Lucia"
    },
    {
      "text": "STome&Principe",
      "value": "STome&Principe"
    },
    {
      "text": "Surinam",
      "value": "Surinam"
    },
    {
      "text": "Swaziland",
      "value": "Swaziland"
    },
    {
      "text": "Sweden",
      "value": "Sweden"
    },
    {
      "text": "Switzerland",
      "value": "Switzerland"
    },
    {
      "text": "Syria",
      "value": "Syria"
    },
    {
      "text": "Tajikist",
      "value": "Tajikist"
    },
    {
      "text": "Tanzania",
      "value": "Tanzania"
    },
    {
      "text": "Thailand",
      "value": "Thailand"
    },
    {
      "text": "Timor",
      "value": "Timor"
    },
    {
      "text": "Togo",
      "value": "Togo"
    },
    {
      "text": "Trinidad",
      "value": "Trinidad"
    },
    {
      "text": "Tunisia",
      "value": "Tunisia"
    },
    {
      "text": "Turkey",
      "value": "Turkey"
    },
    {
      "text": "Turkmen",
      "value": "Turkmen"
    },
    {
      "text": "UAE",
      "value": "UAE"
    },
    {
      "text": "Uganda",
      "value": "Uganda"
    },
    {
      "text": "Ukraine",
      "value": "Ukraine"
    },
    {
      "text": "United Kingdom",
      "value": "United Kingdom"
    },
    {
      "text": "Uruguay",
      "value": "Uruguay"
    },
    {
      "text": "USA",
      "value": "USA"
    },
    {
      "text": "Uzbekistan",
      "value": "Uzbekistan"
    },
    {
      "text": "Vanuatu",
      "value": "Vanuatu"
    },
    {
      "text": "Venezuela",
      "value": "Venezuela"
    },
    {
      "text": "Vietnam",
      "value": "Vietnam"
    },
    {
      "text": "Wal&Fut",
      "value": "Wal&Fut"
    },
    {
      "text": "Yemen",
      "value": "Yemen"
    },
    {
      "text": "Yugoslavia",
      "value": "Yugoslavia"
    },
    {
      "text": "Zambia",
      "value": "Zambia"
    },
    {
      "text": "Zimbabwe",
      "value": "Zimbabwe"
    }
        ]
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

    created() {
        console.log(" Check point");
        // 1. Start Loader
        //this.loading.initial = true;
    },

    computed: {
        start_date() {
            return this.business_data.planned_start;
        },
        end_date() {
            return this.business_data.planned_end;
        }
    },

    watch:{

        start_date: function(newValue, oldValue){

            this.check_planned_start_date();

        },
        end_date: function(newValue, oldValue){

            this.check_planned_end_date();
        }

    },

    methods:{

        check_same_country(){
            if(this.business_data.origin_country==this.business_data.destin_country){
                this.toast.type = 'warning';
                this.toast.title = 'Você não pode selecionar o mesmo país de origem e destino';
                this.toast.subtitle = '';
                this.toast.show = true;
                this.business_data.destin_country = "";
            }

        },

        closeToast(){
            this.toast.show = false;
            this.toast.type = 'info';
            this.toast.title = '';
            this.toast.subtitle = '';
        },

        check_planned_start_date: function(){
            var current_date = new Date();
            current_date.setHours(0, 0, 0, 0);

            var temp_start_date = new Date(this.business_data.planned_start+"T00:00:00");
            var temp_end_date = new Date(this.business_data.planned_end+"T00:00:00");

            if(temp_start_date < current_date){
                this.toast.type = 'warning';
                this.toast.title = 'Data de início planejada deve ser maior que a data de hoje.';
                this.toast.subtitle = '';
                this.toast.show = true;
                return true;
            }

            return false;
        },

        check_planned_end_date: function(){
            var current_date = new Date();
            current_date.setHours(0, 0, 0, 0);

            var temp_start_date = new Date(this.business_data.planned_start+"T00:00:00");
            var temp_end_date = new Date(this.business_data.planned_end+"T00:00:00");

            if(temp_end_date <= current_date){
                this.toast.type = 'warning';
                this.toast.title = 'Data de fim planejada deve ser maior que a data de hoje.';
                this.toast.subtitle = '';
                this.toast.show = true;
                return true;
            }else if(temp_end_date <= temp_start_date){
                this.toast.type = 'warning';
                this.toast.title = 'Data de fim planejada deve ser maior que a data de início planejada.';
                this.toast.subtitle = '';
                this.toast.show = true;
                return true;
            }
            return false;

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
            var ready_to_go_date = true;
            for(var x in this.warning){
                if(this.business_data[x] == ""){
                   this.warning[x] = true;
                   ready_to_go = false;
                }
            }

            // Missing
            if(this.business_data.query_pi == false){
                ready_to_go = false;
                this.warning["query_pi"] = true;
            }

            // Missing Consent Check Box
            if(this.business_data.query_type.length == 0){
                ready_to_go = false;
                this.warning["query_type"] = true;
            }

            // Check start / end dates
            var ready_to_go_dates = true;
            if(this.check_planned_start_date() || this.check_planned_end_date()){
                ready_to_go_dates = false;
            }

            // 2. Call backend API to add the data
            if(ready_to_go && ready_to_go_dates){

                // Set loader
                this.show_page_loader = true;
                axios.
                    post('/assessment-management/assessment/', this.business_data).
                    then(response => {
                        console.log(response.data);
                        this.overlay.message = this.overlay.message_options.assessment_added_success;
                        this.overlay.type = "Seu formulario foi recebido com sucesso"
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
                window.location = "/my_assessments";
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
            <div class= "bx--grid " style="padding-left: 4%; padding-right: 45%; margin-left: auto; margin-right: auto;">
                <!-- Personal Details Section -->
                <div class="bx--row" style="padding-top:28px; padding-bottom: 16px;">
                    <div class="bx--col" style="margin-left: auto; margin-right: auto;">
                        <img src="/static/images/details_black.png" style="float:left; vertical-align: bottom; padding-top:3px;"/>
                        <h2 class="h1" style="float:left; vertical-align: bottom;">&nbsp;Dados Pessoais</h2>
                    </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                    <!-- Personal Details Fields -->
                   <div class="bx--col">
                        <text_input_standard
                            v-model="business_data.cpf"
                            v-bind:label="'CPF'"
                            v-bind:mandatory="true"
                            v-bind:invalid="warning.cpf"
                            :invalid_msg="required_field"
                            >
                        </text_input_standard>
                   </div>
                   <div class="bx--col">
                   </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                    <div class="bx--col" >
                        <text_input_standard
                            v-model="business_data.nome"
                            v-bind:label="'Nome'"
                            v-bind:mandatory="true"
                            v-bind:invalid="warning.nome"
                            :invalid_msg="required_field"
                            >
                        </text_input_standard>
                   </div>
                   <div class="bx--col" >
                        <text_input_standard
                            v-model="business_data.last_name"
                            v-bind:label="'Sobrenome'"
                            v-bind:mandatory="true"
                            v-bind:invalid="warning.last_name"
                            :invalid_msg="required_field"
                            >
                        </text_input_standard>
                   </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                    <div class="bx--col" >
                        <text_input_standard
                            v-model="business_data.email"
                            v-bind:label="'email'"
                            v-bind:mandatory="true"
                            v-bind:invalid="warning.email"
                            :invalid_msg="required_field"
                            >
                        </text_input_standard>
                    </div>
                    <div class="bx--col" >
                        <text_input_standard
                            v-model="business_data.cellphone"
                            v-bind:label="'Telefone de Contato#'"
                            >
                        </text_input_standard>
                    </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                    <div class="bx--col" >
                        <select_common
                            v-model="business_data.nacionalidade"
                            v-bind:select_id="'nationality_select_id'"
                            v-bind:options="country_options"
                            v-bind:label="'Nacionalidade'"
                            v-bind:mandatory="true"
                            v-bind:invalid="warning.nacionalidade"
                            :invalid_msg="required_field"
                        >
                        </select_common>
                    </div>
                     <div class="bx--col" >
                        <text_input_standard
                             v-model="business_data.unidadeneg"
                             v-bind:label="'Unidade de Negócio'"
                             >
                        </text_input_standard>
                    </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                    <div class="bx--col" >
                        <text_input_standard
                            v-model="business_data.project_dept"
                            v-bind:label="'Projeto'"
                            >
                        </text_input_standard>
                    </div>
                     <div class="bx--col" >
                        <text_input_standard
                            v-model="business_data.email_copy"
                            v-bind:label="'Email em cópia'"
                            >
                        </text_input_standard>
                    </div>
                </div>
                <!-- Travel Details Section -->
                <div class="bx--row" style="padding-top:38px; padding-bottom:16px;">
                    <div class="bx--col" style="margin-left: auto; margin-right: auto;">
                        <img src="/static/images/travel_icon.png" style="float:left; vertical-align: bottom; padding-top:3px;"/>
                        <h2 class="h1" style="float:left; vertical-align: bottom;">&nbsp;Detalhes da Viagem</h2>
                    </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                    <div class="bx--col" >
                        <select_common
                            v-model="business_data.origin_country"
                            v-bind:select_id="'origin_country_select_id'"
                            v-bind:options="country_options"
                            v-bind:label="'País de Origem'"
                            v-bind:mandatory="true"
                            v-bind:invalid="warning.origin_country"
                            :invalid_msg="required_field"
                            v-on:change.native="check_same_country()"
                        >
                        </select_common>
                    </div>
                     <div class="bx--col" >
                        <select_common
                            v-model="business_data.destin_country"
                            v-bind:select_id="'destin_country_select_id'"
                            v-bind:options="country_options"
                            v-bind:label="'País de Destino'"
                            v-bind:mandatory="true"
                            v-bind:invalid="warning.destin_country"
                            :invalid_msg="required_field"
                            v-on:change.native="check_same_country()"
                        > </select_common>
                    </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                    <div class="bx--col" >
                        <text_area_standard
                            v-model="business_data.query_desc"
                            v-bind:label="'Qual é a sua dúvida? (Immigration/Tax/PWN)'"
                            :placeholder="'Por favor insira sua dúvida aqui'"
                            v-bind:mandatory="true"
                            v-bind:invalid="warning.query_desc"
                            :invalid_msg="required_field"
                            >
                        </text_area_standard>
                    </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                    <div class="bx--col" >
                        <checkbox_standard
                            v-model="business_data.query_type"
                            v-bind:label="'A qual assunto a sua pergunta está relacionada?'"
                            v-bind:options="checkbox_query_type"
                            v-bind:group_id="'query_type_option'"
                            v-bind:aria_labelledby="'query_type_aria'"
                            v-bind:warning="warning.query_type"
                            v-bind:mandatory="true"
                            >
                        </checkbox_standard>
                    </div>
                    <div class="bx--col" >
                        <input_date
                            style="margin-bottom: 6%; float: right; "
                            v-model="business_data.planned_start"
                            v-bind:label="'Data Planejada de Início'"
                            v-bind:mandatory="true"
                            :warning_message="warning.planned_start ? required_field : ''"
                            >
                        </input_date>
                        <input_date
                            v-model="business_data.planned_end"
                            style="float: right; padding-top: 8px;"
                            v-bind:label="'Planejada de Fim'"
                            v-bind:mandatory="true"
                            :warning_message="warning.planned_end ? required_field : ''"
                            >
                        </input_date>
                    </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                    <div class="bx--col" >
                        <checkbox_single
                            :checkbox_id = "'query_pi_id'"
                            v-model="business_data.query_pi"
                            v-bind:option_label="checkbox_query_pi"
                            v-bind:group_id="'query_type_option'"
                            v-bind:aria_labelledby="'query_type_aria'"
                            v-bind:warning="warning.query_pi"
                            >
                        </checkbox_single>
                    </div>
                </div>
                <div class="bx--row" style="padding-top:16px; padding-bottom:32px;">
                     <div class= "bx--col">
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
                            style="float: right; margin-right: 16px;"
                            @click.native="this.window.location='/home_page'"
                            >
                        </button_standard>
                     </div>
                </div>
            </div>
            <footer class="footer">
                <a><img src=""></a>
            </footer>
            <notification_toast
                    :show="toast.show"
                    :type="toast.type"
                    :title="toast.title"
                    :subtitle="toast.subtitle"
                    v-on:close-toast="toast.show = false"
            ></notification_toast>
            <overlay_loader
                    :is_visible="loading.initial"
            ></overlay_loader>
        </div>
      `
})