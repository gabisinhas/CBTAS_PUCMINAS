import * as Inputs from "/static/components/carbon-collections/inputs.js";
import * as Selects from "/static/components/collections/selection_menus.js";
import * as Checkboxes from "/static/components/carbon-collections/checkboxes.js";
import * as Buttons from "/static/components/carbon-collections/buttons.js";
import * as Overlays from "/static/components/collections/overlays.js";
import * as Loaders from '/static/components/carbon-collections/loaders.js'
import * as Notifications from '/static/components/carbon-collections/notifications.js';
import * as Headers from '/static/components/carbon-collections/headers.js';
import * as RadioButtons from '/static/components/carbon-collections/radio_buttons.js';


var edit_assessment = new Vue ({
    el: '#edit_assessment',
    data:{
        assessment_id: '',
        newco_user: false,
        business_data:{
            serial_number:'',
            first_name:'',
            last_name:'',
            email:'',
            phone:'',
            nationality:'',
            bus_unit:'',
            project_dept: '',
            email_copy: '',
            cbta_question:'',
            origin_country:'',
            destin_country:'',
            query_type:'',
            query_desc:'',
            planned_start:'',
            planned_end:'',
            residency_status:'',
            details_visa:'',
            query_pi: false,
        },
        // Information variables regarding page
        information: {
            title1: 'Attention:',
            subtitle1: 'Please visit the <a href="https://w3.kyndryl.net/hr/web/mobility/assignments/" target="_blank"><strong class="links">Global Mobility</strong></a> page and the <a href="https://w3.kyndryl.net/hr/askhr" target="_blank"><strong class="links">ASKHR bot</strong></a> before you submit a query/support request here. Your question may already be listed and answered there.',
            title2: 'Attention:',
            subtitle2: 'Please visit the <a href="https://w3.ibm.com/hr/web/mobility/assignments/" target="_blank"><strong class="links">Global Mobility</strong></a> page and the <a href="https://w3.ibm.com/hr/askhr/" target="_blank"><strong class="links">ASKHR bot</strong></a> before you submit a query/support request here. Your question may already be listed and answered there.',
        },
        attachments: {},
        warning:{
            serial_number: false,
            first_name: false,
            last_name: false,
            email: false,
            nationality: false,
            cbta_question: false,
            origin_country: false,
            destin_country: false,
            query_desc: false,
            planned_start: false,
            planned_end: false,
            query_pi: false,
            query_type: false
        },
        required_field: 'Required field',
        yes_no_options:[
            {'text': 'Yes', 'value': 'Yes'},
            {'text': 'No', 'value': 'No'}
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
        custom_message: ''
    },
    components: {
        'text_input_standard' : Inputs.text_input_standard,
        'radio_button_standard' : RadioButtons.radio_button_standard,
        'input_field': Inputs.input_text,
        'input_date': Inputs.input_date,
        'process_status_overlay': Overlays.process_status_overlay,
        'text_area_standard': Inputs.text_area_standard,
        'button_standard': Buttons.button_standard,
        'loader': Loaders.loader,
        'checkbox_standard':Checkboxes.checkbox_standard,
        'checkbox_single': Checkboxes.checkbox_single,
        'header_standard': Headers.header_standard,
        'notification_info': Notifications.notification_info,
        'overlay_loader': Loaders.overlay_loader,
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
                this.business_data.serial_number = response.data['serial_number'];
                this.business_data.first_name = response.data['first_name'];
                this.business_data.last_name = response.data['last_name'];
                this.business_data.email = response.data['email'];
                this.business_data.bus_unit = response.data['bus_unit'];
                this.business_data.phone = response.data['phone'],
                this.business_data.nationality = response.data['nationality'],
                this.business_data.project_dept = response.data['project_dept'],
                this.business_data.email_copy = response.data['email_copy'],
                this.business_data.cbta_question = response.data['cbta_question'],
                this.business_data.origin_country = response.data['origin_country'],
                this.business_data.destin_country = response.data['destin_country'],
                this.business_data.query_type = response.data['query_type'],
                this.business_data.query_desc = response.data['query_desc'],
                this.business_data.planned_start = response.data['planned_start'],
                this.business_data.planned_end = response.data['planned_end'],
                this.business_data.residency_status = response.data['residency_status'],
                this.business_data.details_visa = response.data['details_visa']
                this.newco_user = response.data[1]['newco_user'];
                this.loading.initial = false;
            })
    },
    methods:{

        get_url_parameters(){

            let params = (new URL(window.location.href)).searchParams;
            this.assessment_id = params.get('id');

        },
        check_dates: function(){
            // 1. Rest statues
            this.custom_message = 'Mandatory';
            this.warning.planned_start = false;

            // 1. Check if start date is lower than end date and end date not blank

            // 2. In case of tru set new status
            this.warning.planned_start = true;
            this.custom_message = 'Start date lower than end date';
        },
        submit_data: function(){
            // Clear Alert Message
            this.overlay.message = '';
            this.overlay.type = '';

            // 1. Iterate over all mandatory fields specified on warning object and set it as true in case of empty
            // 1.1 Define a list of keys that represents the mandatory fields
            var warning_keys = Object.keys(this.warning);
            var ready_to_go = true;
            for(var x in warning_keys){
                // 1.2 Set field warning flag as true if it is empty
                if(this.business_data[warning_keys[x]] == ""){
                   this.warning[warning_keys[x]] = true;
                   ready_to_go = false;
                }
            }
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
            <!-- Information section -->
            <div class= "bx--grid " style="padding-left: 25%; padding-right: 25%; margin-left: auto; margin-right: auto;">
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
                            v-bind:readonly="true"
                            v-bind:mandatory="true"
                            v-bind:invalid="warning.first_name"
                            :invalid_msg="required_field"
                            >
                        </text_input_standard>
                   </div>
                   <div class="bx--col" >
                        <text_input_standard
                            v-model="business_data.last_name"
                            v-bind:label="'Employee Last Name'"
                            v-bind:readonly="true"
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
                            v-bind:label="'IBM email'"
                            v-bind:readonly="true"
                            v-bind:mandatory="true"
                            v-bind:invalid="warning.email"
                            :invalid_msg="required_field"
                            >
                        </text_input_standard>
                    </div>
                    <div class="bx--col" >
                        <text_input_standard
                            v-model="business_data.phone"
                            v-bind:label="'Contact Phone#'"
                            >
                        </text_input_standard>
                    </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                    <div class="bx--col" >
                        <text_input_standard
                            v-model="business_data.nationality"
                            v-bind:label="'Citizenship / Nationality'"
                            v-bind:mandatory="true"
                            v-bind:invalid="warning.nationality"
                            :invalid_msg="required_field"
                            >
                        </text_input_standard>
                    </div>
                     <div class="bx--col" >
                        <text_input_standard
                             v-model="business_data.bus_unit"
                             v-bind:label="'Business Unit'"
                             >
                        </text_input_standard>
                    </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                    <div class="bx--col" >
                        <text_input_standard
                            v-model="business_data.project_dept"
                            v-bind:label="'Project/Dept'"
                            >
                        </text_input_standard>
                    </div>
                     <div class="bx--col" >
                        <text_input_standard
                            v-model="business_data.email_copy"
                            v-bind:label="'Email Ccd'"
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
                    <div class="bx--col" >
                        <radio_button_standard
                            v-model="business_data.cbta_question"
                            v-bind:label="'Have you already completed a CBTA assessment?'"
                            v-bind:options="yes_no_options"
                            v-bind:mandatory="true"
                            v-bind:group_id="'cbta_question_option'"
                            v-bind:aria_labelledby="'cbta_question_aria'"
                            v-bind:invalid="warning.cbta_question"
                            :invalid_msg="required_field"
                            >
                        </radio_button_standard>
                    </div>
                     <div class="bx--col" >
                        <p> add attachment </p>
                    </div>
                </div>
                <div class="bx--row" style="padding-top:16px;">
                    <div class="bx--col" >
                        <text_input_standard
                            v-model="business_data.origin_country"
                            v-bind:label="'Your current origin country'"
                            v-bind:mandatory="true"
                            v-bind:invalid="warning.origin_country"
                            :invalid_msg="required_field"
                            >
                        </text_input_standard>
                    </div>
                     <div class="bx--col" >
                        <text_input_standard
                            v-model="business_data.destin_country"
                            v-bind:label="'Destination Country'"
                            v-bind:mandatory="true"
                            v-bind:invalid="warning.destin_country"
                            :invalid_msg="required_field"
                        >
                        </text_input_standard>
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
                            >
                        </checkbox_standard>
                    </div>
                    <div class="bx--col" >
                        <input_date
                            style="margin-bottom: 6%; float: right; "
                            v-model="business_data.planned_start"
                            v-bind:label="'Planned Start Date'"
                            v-bind:mandatory="true"
                            :warning_message="warning.planned_start ? required_field : ''"
                            >
                        </input_date>
                        <input_date
                            v-model="business_data.planned_end"
                            style="float: right; padding-top: 8px;"
                            v-bind:label="'Planned End Date'"
                            v-bind:mandatory="true"
                            :warning_message="warning.planned_end ? required_field : ''"
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
                            >
                        </checkbox_single>
                    </div>
                </div>
                <div class="bx--row" style="padding-top:16px; padding-bottom:32px;">
                     <div class= "bx--col">
                     <button_standard
                            theme="Primary"
                            label="Submit"
                            v-on:click.native="submit_data()"
                            style="float: right;">
                            >
                        <button_standard
                            theme="tertiary"
                            label="Cancel"
                            style="float: right; margin-right: 16px;"
                            >
                        </button_standard>
                     </div>
                </div>
            </div>
            <footer class="footer">
                <a><img src="/static/images/IBM_logo_black.png"></a>
            </footer>
            <overlay_loader
                    :is_visible="loading.initial"
            ></overlay_loader>
        </div>
      `
    ,
});
//        get_user_data: function(){
//            // Call current user data
//            this.loading.initial = true;
//            axios.
//                get('/assessment-management/assessment/admin/<assessment_id>'+this.business_data.serial_number).
//                then(response =>{
//                    // Populate user data
//                    console.log(response.data);
//                    this.business_data.employee_id = response.data[1]['serial_number'];
//                    this.business_data.first_name = response.data[1]['first_name'];
//                    this.business_data.last_name = response.data[1]['last_name'];
//                    this.business_data.email = response.data[1]['mail'];
//                    this.business_data.bus_unit = response.data[1]['bus_unit'];
//                    this.business_data.people_manager_email = response.data[1]['manager_email'];
//                    this.business_data.manager_name = response.data[1]['manager_name'];
//                    this.loading.initial = false;
//                })
//        },
//
//        closeButtonOverlayHandler: function (e) {
//            if (this.overlay.close_btn_action == 'success') {
//                window.location = "/admin_request";
//            }
//        },
//
//        showOverlay: function () {
//            document.getElementById("custom-overlay").style.display = "block";
//        },
//
//        hideOverlay: function () {
//            document.getElementById("custom-overlay").style.display = "none";
//        },