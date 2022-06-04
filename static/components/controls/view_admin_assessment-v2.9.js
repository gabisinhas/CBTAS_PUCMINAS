import * as Inputs from "/static/components/carbon-collections/inputs.js";
import * as Selects from "/static/components/collections/selection_menus.js";
import * as Checkboxes from "/static/components/carbon-collections/checkboxes.js";
import * as Buttons from "/static/components/carbon-collections/buttons.js";
import * as Loaders from '/static/components/carbon-collections/loaders.js'
import * as Notifications from '/static/components/carbon-collections/notifications.js';
import * as Headers from '/static/components/carbon-collections/headers.js';
import * as RadioButtons from '/static/components/carbon-collections/radio_buttons.js';
import { select_common } from '/static/components/carbon-collections/selects.js'

var view_assessment = new Vue ({
    el: '#view_assessment',
    data:{
        view_mode: false,
        assessment_id: '',
        toast: {
            show: false,
            type: '',
            title: '',
            subtitle: ''
        },
        business_data:{
            _id: '',
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
            query_pi: false
        },
        // Information variables regarding page
        information: {
            title1: 'Attention:',
            subtitle1: 'Please visit the <a href="https://w3.kyndryl.net/hr/web/mobility/assignments/" target="_blank"><strong class="links">Global Mobility</strong></a> page and the <a href="https://w3.kyndryl.net/hr/askhr" target="_blank"><strong class="links">ASKHR bot</strong></a> before you submit a query/support request here. Your question may already be listed and answered there.',
            title2: 'Attention:',
            subtitle2: 'Please visit the <a href="https://w3.ibm.com/hr/web/mobility/assignments/" target="_blank"><strong class="links">Global Mobility</strong></a> page and the <a href="https://w3.ibm.com/hr/askhr/" target="_blank"><strong class="links">ASKHR bot</strong></a> before you submit a query/support request here. Your question may already be listed and answered there.',
        },
        warning:{
            cpf:false,
            nome:false,
            last_name:false,
            email:false,
            cellphone:false,
            nacionalidade:false,
            unidadeneg:false,
            project_dept: false,
            email_copy: false,
            origin_country:false,
            destin_country:false,
            query_type:false,
            query_desc:false,
            planned_start:false,
            planned_end:false,
            query_pi: false
        },
        required_field: 'Required field',
        yes_no_options:[
            {'text': 'Yes', 'value': 'Yes'},
            {'text': 'No', 'value': 'No'}
        ],
        status_options:[
            {'label': 'Opened', 'value': 'Opened'},
            {'label': 'Closed', 'value': 'Closed'}
        ],
        checkbox_query_type:[
            {'text': 'Immigration', 'value': 'immigration'},
            {'text': 'Tax', 'value': 'tax'},
            {'text': 'PWN (Posted Work Notification) Applicable for travellers into and within the European regions','value':'pwn'}
        ],
        checkbox_query_pi: 'By providing your personal information and clicking Submit, you are giving us your consent for collection and sharing your PI data within Global Mobility or with IBM approved third party service providers who act on behalf of IBM, anywhere in the world, where we do business.',
        overlay: {
            message: '',
            message_options: {
                'assessment_added_success': 'Your Cross Border Travel Assessment Support Form has been submitted successfully. Thank you for contacting us.'
            },
            type: '',
            close_btn_action: 'success'
        },
        show_page_loader: false,
        loading: {
            initial: false
        },
        message_options:{
        'required_field': 'Please fill the required fields',
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
        'select_common': select_common,
    },
    created() {
        // Get the ID parameter
        this.get_url_parameters();

        // 1. Start Loader
        this.loading.initial = true;

        // 2. Call current user data
        axios.
            get('/assessment-management/assessment/admin/' + this.assessment_id).
            then(response => {
                // Populate user data
                this.business_data._id = response.data['_id'];
                this.business_data.cpf = response.data['cpf'];
                this.business_data.nome = response.data['nome'];
                this.business_data.last_name = response.data['last_name'];
                this.business_data.email = response.data['email'];
                this.business_data.cellphone = response.data['cellphone'];
                this.business_data.nacionalidade = response.data['nacionalidade'];
                this.business_data.unidadeneg = response.data['unidadeneg'];
                this.business_data.project_dept = response.data['project_dept'];
                this.business_data.email_copy = response.data['email_copy'];
                this.business_data.origin_country = response.data['origin_country'];
                this.business_data.destin_country = response.data['destin_country'];
                this.business_data.query_type = response.data['query_type'];
                this.business_data.query_desc = response.data['query_desc'];
                this.business_data.planned_start = response.data['planned_start'];
                this.business_data.planned_end = response.data['planned_end'];
                this.business_data.query_pi = response.data['query_pi']
            })
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

    },
    methods:{

        check_same_country(){
            if(this.business_data.origin_country==this.business_data.destin_country){
                this.toast.type = 'warning';
                this.toast.title = 'You can not select the same Country for origin and destination';
                this.toast.subtitle = '';
                this.toast.show = true;
                this.business_data.destin_country = "";
            }

        },

        get_url_parameters(){

            let params = (new URL(window.location.href)).searchParams;
            this.assessment_id = params.get('id');

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
                this.toast.title = 'Planned start date should be greater than today.';
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
                this.toast.title = 'Planned end date should be greater than today.';
                this.toast.subtitle = '';
                this.toast.show = true;
                return true;
            }else if(temp_end_date <= temp_start_date){
                this.toast.type = 'warning';
                this.toast.title = 'Planned end date should be greater than planned start date.';
                this.toast.subtitle = '';
                this.toast.show = true;
                return true;
            }
            return false;
        },

        get_user_data: function(){

            // Call current user data
            this.loading.initial = true;
            axios.
                get('/assessment-management/user/'+this.business_data.cpf).
                then(response =>{
                    // Populate user data
                    this.business_data.nome = response.data[1]['nome'];
                    this.business_data.last_name = response.data[1]['last_name'];
                    this.business_data.email = response.data[1]['email'];
                    this.business_data.origin_country = response.data[1]['origin_country'];
                    this.business_data.destin_country = response.data[1]['destin_country'];
                    this.loading.initial = false;
                })
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


        submit_data: function(){

            // Set loader
            this.loading.initial = true;

            this.show_page_loader = true;

            axios.
                put('/assessment-management/assessment/', this.business_data).
                then(response => {

                    // Get doc updated
                    var raw_entry = response.data.doc;

                    // 1. Define control variables
                    var control_flag = true;
                    var add_control = false;
                    var delete_control = false;

                    // 4. Add delete cases to the form
                    if(delete_files.length > 0){
                        update_forms.append('delete', delete_files);
                    }

                    // 5. Process files changes
                    var entry_id = this.business_data._id;

                    let config = {
                      header : {
                       'Content-Type' : 'multipart/form-data'
                     }
                    }
                    if(delete_control || add_control){
                        axios.put('/assessment-management/assessment/' + this.business_data._id.replace(":","_._") + '/attachment', update_forms, config).then(
                          response2 => {
                            this.loading.initial = false;
                            window.location = '/admin_assessments?updated=' + this.business_data.assessment_id;
                            // redirect to home page with a message that the request (ID) was submitted with success
                          }
                        ).catch(function (error) {
                            this.file_submission_exception();
                            attachment_issue = true;
                        });
                    }
                    if(attachment_issue){
                        this.loading.initial = false;
                        window.location = '/admin_assessments?updated=' + this.business_data.assessment_id;
                    }
                })
        },

        file_size_exception(){
            this.toast.type = 'warning';
            this.toast.title = 'The attachment file size should not exceed 10MB';
            this.toast.subtitle = '';
            this.toast.show = true;
        },

        file_submission_exception(){
            this.toast.type = 'warning';
            this.toast.title = 'The system could not load the attachment file due some file incompatibility issue. Please try to upload it as PDF.';
            this.toast.subtitle = '';
            this.toast.show = true;
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
            <!-- Information section -->
            <div class= "bx--grid " style="padding-left: 4%; padding-right: 45%; margin-left: auto; margin-right: auto;">
                    <div class="bx--row">
                        <div v-if="newco_user === true" class="bx--col" >
                            <notification_info
                                :title="information.title1"
                                :subtitle="information.subtitle1"
                                >
                            </notification_info>
                        </div>
                        <div v-else class="bx--col" >
                            <notification_info
                                :title="information.title2"
                                :subtitle="information.subtitle2"
                                >
                            </notification_info>
                        </div>
                    </div>
                <!-- Personal Details Section -->
                <div class="bx--row" style="padding-top:28px; padding-bottom: 16px;">
                    <div class="bx--col" style="margin-left: auto; margin-right: auto;">
                        <img src="/static/images/details_black.png" style="float:left; vertical-align: bottom; padding-top:3px;"/>
                        <h2 class="h1" style="float:left; vertical-align: bottom;">&nbsp;Personal Details</h2>
                    </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                    <!-- Personal Details Fields -->
                   <div class="bx--col">
                        <text_input_standard
                            v-model="business_data.serial_number"
                            v-bind:label="'Employee Id (CNUM)'"
                            v-bind:mandatory="true"
                            v-on:change.native="get_user_data()"
                            v-bind:invalid="warning.serial_number"
                            :invalid_msg="required_field"
                            v-bind:readonly="true"
                            :disabled="true"
                            >
                        </text_input_standard>
                   </div>
                   <div class="bx--col">
                   </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                    <div class="bx--col" >
                        <text_input_standard
                            v-model="business_data.first_name"
                            v-bind:label="'Employee First Name'"
                            v-bind:mandatory="true"
                            v-bind:invalid="warning.first_name"
                            :invalid_msg="required_field"
                            v-bind:readonly="true"
                            :disabled="true"
                            >
                        </text_input_standard>
                   </div>
                   <div class="bx--col" >
                        <text_input_standard
                            v-model="business_data.last_name"
                            v-bind:label="'Employee Last Name'"
                            v-bind:mandatory="true"
                            v-bind:invalid="warning.last_name"
                            :invalid_msg="required_field"
                            v-bind:readonly="true"
                            :disabled="true"
                            >
                        </text_input_standard>
                   </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                    <div class="bx--col" >
                        <text_input_standard
                            v-model="business_data.email"
                            v-bind:label="'IBM email'"
                            v-bind:mandatory="true"
                            v-bind:invalid="warning.email"
                            :invalid_msg="required_field"
                            v-bind:readonly="true"
                            :disabled="true"
                            >
                        </text_input_standard>
                    </div>
                    <div class="bx--col" >
                        <text_input_standard
                            v-model="business_data.phone"
                            v-bind:label="'Contact Phone#'"
                            :disabled="view_mode"
                            >
                        </text_input_standard>
                    </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                    <div class="bx--col" >
                        <select_common
                            v-model="business_data.nationality"
                            v-bind:select_id="'origin_country_select_id'"
                            v-bind:options="country_options"
                            v-bind:label="'Citizenship / Nationality'"
                            v-bind:mandatory="true"
                            v-bind:invalid="warning.nationality"
                            :invalid_msg="required_field"
                            :disabled="view_mode"
                        >
                        </select_common>
                    </div>
                     <div class="bx--col" >
                        <text_input_standard
                             v-model="business_data.bus_unit"
                             v-bind:label="'Business Unit'"
                             :disabled="view_mode"
                             >
                        </text_input_standard>
                    </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                    <div class="bx--col" >
                        <text_input_standard
                            v-model="business_data.project_dept"
                            v-bind:label="'Project/Dept'"
                            :disabled="view_mode"
                            >
                        </text_input_standard>
                    </div>
                     <div class="bx--col" >
                        <text_input_standard
                            v-model="business_data.email_copy"
                            v-bind:label="'Email Ccd'"
                            :disabled="view_mode"
                            >
                        </text_input_standard>
                    </div>
                </div>
                <!-- Travel Details Section -->
                <div class="bx--row" style="padding-top:38px; padding-bottom:16px;">
                    <div class="bx--col" style="margin-left: auto; margin-right: auto;">
                        <img src="/static/images/travel_icon.png" style="float:left; vertical-align: bottom; padding-top:3px;"/>
                        <h2 class="h1" style="float:left; vertical-align: bottom;">&nbsp;Travel Details</h2>
                    </div>
                </div>
                 <div class="bx--row" style="padding-top:16px;">
                    <div class="bx--col" style="width: 50%;">
                        <radio_button_standard
                            v-model="business_data.cbta_question"
                            v-bind:label="'Have you already completed a CBTA assessment?'"
                            v-bind:options="yes_no_options"
                            v-bind:mandatory="true"
                            v-bind:group_id="'cbta_question_option'"
                            v-bind:aria_labelledby="'cbta_question_aria'"
                            v-bind:invalid="warning.cbta_question"
                            :invalid_msg="required_field"
                            :disabled="view_mode"
                            >
                        </radio_button_standard>
                    </div>
                     <div class="bx--col" style="width: 50%;">
                        <div>
                            <input_files
                                v-bind:label="'CBTA assessment screenshot'"
                                v-bind:data_table="attachments"
                                v-bind:mandatory="true"
                                v-bind:readonly="false"
                                v-on:add_action="add_attachment($event)"
                                v-on:delete_action="delete_attachment($event)"
                                v-on:file_size_exception="file_size_exception()"
                            >
                            {{ view_mode }}
                            </input_files>
                        </div>
                    </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                    <div class="bx--col" >
                        <select_common
                            v-model="business_data.origin_country"
                            v-bind:select_id="'origin_country_select_id'"
                            v-bind:options="country_options"
                            v-bind:label="'Your current origin country'"
                            v-bind:mandatory="true"
                            v-bind:invalid="warning.origin_country"
                            :invalid_msg="required_field"
                            v-on:change.native="check_same_country()"
                            :disabled="view_mode"
                        >
                        </select_common>
                    </div>
                     <div class="bx--col" >
                        <select_common
                            v-model="business_data.destin_country"
                            v-bind:select_id="'destin_country_select_id'"
                            v-bind:options="country_options"
                            v-bind:label="'Destination Country'"
                            v-bind:mandatory="true"
                            v-bind:invalid="warning.destin_country"
                            :invalid_msg="required_field"
                            v-on:change.native="check_same_country()"
                            :disabled="view_mode"
                        > </select_common>
                    </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                    <div class="bx--col" >
                        <text_area_standard
                            v-model="business_data.query_desc"
                            v-bind:label="'Query Description (Only Related to Immigration/Tax/PWN)'"
                            :placeholder="'Enter description here'"
                            v-bind:mandatory="true"
                            v-bind:invalid="warning.query_desc"
                            :invalid_msg="required_field"
                            :disabled="view_mode"
                            >
                        </text_area_standard>
                    </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                    <div class="bx--col" >
                        <checkbox_standard
                            v-model="business_data.query_type"
                            v-bind:label="'Type of Query'"
                            v-bind:options="checkbox_query_type"
                            v-bind:group_id="'query_type_option'"
                            v-bind:aria_labelledby="'query_type_aria'"
                            v-bind:warning="warning.query_type"
                            v-bind:mandatory="true"
                            :disabled="view_mode"
                            >
                        </checkbox_standard>
                    </div>
                    <div class="bx--col" >
                        <input_date
                            style="margin-bottom: 6%; float: right; "
                            v-model="business_data.planned_start"
                            v-bind:label="'Planned Start Date'"
                            v-bind:mandatory="true"
                            v-bind:readonly="view_mode"
                            >
                        </input_date>
                        <input_date
                            v-model="business_data.planned_end"
                            style="float: right; padding-top: 8px;"
                            v-bind:label="'Planned End Date'"
                            v-bind:mandatory="true"
                            v-bind:readonly="view_mode"
                            >
                        </input_date>
                    </div>
                </div>
                <div class="bx--row" style="padding-top:28px;">
                    <div class="bx--col" >
                        <radio_button_standard
                            v-model="business_data.residency_status"
                            v-bind:label="'Do you hold temporary/permanent work/residency status for the destination country (or) another country which you believe may impact your immigration requirements?'"
                            v-bind:options="yes_no_options"
                            v-bind:mandatory="false"
                            v-bind:group_id="'residency_status_option'"
                            v-bind:aria_labelledby="'residency_status_aria'"
                            v-bind:invalid="warning.residency_status"
                            :invalid_msg="required_field"
                            :disabled="view_mode"
                            >
                        </radio_button_standard>
                    </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                     <div class="bx--col" >
                        <text_area_standard
                            v-model="business_data.details_visa"
                            :placeholder="'Enter details here'"
                            v-bind:label="'Details of temporary / permanent work / residency status (Country, Visa Type, Validity etc), related to question above.'"
                            :disabled="view_mode"
                            >
                        </text_area_standard>
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
                            :disabled="true"
                            >
                        </checkbox_single>
                    </div>
                </div>
                <!--
                <div class="bx--row" style="padding-top:16px;">
                    <div class="bx--col" >
                        <select_common
                            v-model="business_data.status"
                            :select_id="'business_data_status'"
                            :label="'Request Status'"
                            :options="status_options"
                        ></select_common>
                    </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                    <div class="bx--col" >
                        <text_area_standard
                            v-model="business_data.comments"
                            :placeholder="'Admin Comments'"
                            v-bind:label="''"
                            :disabled="false"
                            >
                        </text_area_standard>
                    </div>
                </div>
                -->
                <div class="bx--row" style="padding-top:16px; padding-bottom:32px;">
                     <div class= "bx--col" >
                        <button_standard
                            theme="Primary"
                            label="Submit"
                            v-on:click.native="submit_data()"
                            style="float: right;"
                            v-show="!view_mode">
                            >
                        </button_standard>
                        <button_standard
                            theme="tertiary"
                            label="Cancel"
                            style="float: right; margin-right: 16px;"
                            @click.native="this.window.location='/admin_assessments'"
                            >
                        </button_standard>
                     </div>
                </div>
            </div>
            <footer class="footer">
                <a><img src="/static/images/IBM_logo_black.png"></a>
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