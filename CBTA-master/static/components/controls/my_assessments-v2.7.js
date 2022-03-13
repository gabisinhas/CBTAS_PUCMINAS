import * as Inputs from "/static/components/carbon-collections/inputs.js";
import * as Selects from "/static/components/carbon-collections/selects.js";
import * as Checkboxes from "/static/components/carbon-collections/checkboxes.js";
import * as Buttons from "/static/components/carbon-collections/buttons.js";
import * as Overlays from "/static/components/carbon-collections/loaders.js";
import * as Radiobuttons from "/static/components/carbon-collections/radio_buttons.js";
import * as Loaders from "/static/components/carbon-collections/loaders.js";
import * as DataTables from "/static/components/carbon-collections/data_tables.js";
import * as Headers from '/static/components/carbon-collections/headers.js';
import * as Notifications from '/static/components/carbon-collections/notifications.js';

var my_assessments = new Vue ({
    el: '#my_assessments',
    // Reactive variables to support the process
    data:{

        loading:{

            initial: false
        },

        toast: {
            show: false,
            type: '',
            title: '',
            subtitle: ''
        },

        // View flag that shows the view item if true and data table if false
        view_flag: false,

        // Flag to show toast message when a request is submitted
        submitted: false,

        // Flag in case of attachment issue
        attachment_issue: false,

        // Data header
        data_table_header: ['Assessment', 'Employee Name', 'Employee ID', 'IBM Email', 'Origin', 'Destination','Type of Queries' ,'Created Date'],

        // Data table
        data_table: [],

        // Data table raw
        data_table_raw:{
            'partition:key': {
                    serial_number:'A',
                    first_name:'A',
                    last_name:'A',
                    email:'A',
                    phone:'A',
                    nationality:'A',
                    bus_unit:'A',
                    project_dept: 'A',
                    email_copy: 'A',
                    cbta_question:'A',
                    origin_country:'A',
                    destin_country:'A',
                    query_type:'A',
                    query_desc:'A',
                    planned_start:'A',
                    planned_end:'A',
                    residency_status:'A',
                    details_visa:'A'
            },
            'partition:key2': {
                    serial_number:'B',
                    first_name:'B',
                    last_name:'B',
                    email:'B',
                    phone:'B',
                    nationality:'B',
                    bus_unit:'B',
                    project_dept: 'B',
                    email_copy: 'B',
                    cbta_question:'B',
                    origin_country:'B',
                    destin_country:'B',
                    query_type:'B',
                    query_desc:'B',
                    planned_start:'B',
                    planned_end:'B',
                    residency_status:'B',
                    details_visa:'B'
            }
        },

        // Business data control
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
            details_visa:''
        },

        // Default components data options
        yes_no_options:[
            {'text': 'Yes', 'value': 'Yes'},
            {'text': 'No', 'value': 'No'}
        ],
        checkbox_query_type:[
            {'text': 'Immigration', 'value': 'immigration'},
            {'text': 'Tax', 'value': 'tax'},
            {'text': 'PWN (Posted Work Notification) Applicable for travellers into and within the European regions','value':'pwn'}
        ],
    },

    components:{
        'data_table_view': DataTables.data_table_view,
        'input_field': Inputs.text_input_standard,
        'input_text':  Inputs.text_input_standard,
        'input_date': Inputs.input_date,
        'radio_buttons_vertical': Radiobuttons.radio_button_standard,
        'radio_buttons_horizontal': Radiobuttons.radio_button_standard,
        'process_status_overlay': Loaders.overlay_loader,
        'text_area': Inputs.text_area_standard,
        'button_cancel': Buttons.button_standard,
        'button_submit': Buttons.button_standard,
        'loader': Loaders.overlay_loader,
        'checkbox_vertical':Checkboxes.checkbox_standard,
        'notification_toast': Notifications.notification_toast,
        'header_standard': Headers.header_standard,
        'overlay_loader': Loaders.overlay_loader,
    },

    created() {

        // Load the this.data_table from the backend
        this.get_data();

        // Get parameters
        this.get_url_parameters();
    },

    watch:{

        submitted: function(new_data, old_data){
            if(new_data){
                if(this.attachment_issue){
                    this.toast.type = 'warning';
                    this.toast.title = 'The request ' + new_data + ' was submitted, however due to some file incompatibility the attachment was not uploaded. Please send the file to the support team.';
                    this.toast.subtitle = '';
                    this.toast.show = true;
                }else{
                    this.toast.type = 'success';
                    this.toast.title = 'The request ' + new_data + ' was submitted successfully';
                    this.toast.subtitle = '';
                    this.toast.show = true;
                }
            }
        }
    },

    methods:{

        get_url_parameters(){

            let params = (new URL(window.location.href)).searchParams;
            this.submitted = params.get('submitted');
            if(params.get('attachment') == "issue"){
                this.attachment_issue = true;
            }
        },

        closeToast(){
            this.toast.show = false;
            this.toast.type = 'info';
            this.toast.title = '';
            this.toast.subtitle = '';
        },

        // -- Business methods --- //
        view_item: function(id){

            window.location = "/view_assessment?id=" + id.split(":")[1];

        },

        // Cancel and back to the main list
        cancel: function(){

            this.view_flag = false;
        },

        // Get current user assessments
        get_data: function(){
            // Set the loader
            this.loading.initial = true;

            // Call data to be showed at loading page
            axios
            .get("/assessment-management/assessment/user/")
            .then(
                response => {

                    // Clean data
                    this.data_table_raw = {};
                    this.data_table = [];

                    // Parse result data
                    var query = "";
                    for(var x in response.data){

                        this.data_table_raw[response.data[x]._id] = response.data[x];
                        for(var idx in response.data[x].query_type){
                            if(query==""){
                                query = response.data[x].query_type[idx].charAt(0).toUpperCase() + response.data[x].query_type[idx].slice(1);
                            }else{
                                query = query + " " + response.data[x].query_type[idx].charAt(0).toUpperCase() + response.data[x].query_type[idx].slice(1);
                            }
                        }
                        this.data_table.push([response.data[x]._id, response.data[x].assessment_id, response.data[x].first_name, response.data[x].serial_number, response.data[x].email, response.data[x].origin_country, response.data[x].destin_country, query , response.data[x].created_date]);
                        query = "";
                    }

                    // Reset the loader
                    this.loading.initial = false;

                }
            );

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
            <div class= "bx--grid" style="padding-left: 4%; padding-right: 45%; margin-left: auto; margin-right: auto; padding-bottom: 200px;">
                <!-- My Assessments Requests -->
                <div class="bx--row" style="padding-top:48px; padding-bottom:42px;">
                    <div class="bx--col" >
                        <img style="float:left; padding-top: 6px;" src="/static/images/identification_black.png"/>
                        <h2 class="h1" style="float: left; padding-left:8px;">View My Requests</h2>
                    </div>
                </div>
                <!-- Information section -->
                <!-- Main content -->
                <div class="bx--row" style="">
                    <data_table_view v-if="!view_flag"
                        v-bind:title="'My Assessments'"
                        v-bind:data_header="data_table_header"
                        v-bind:data_table="data_table"
                        v-on:view_action="view_item($event)"
                        style="padding-left: 16px;"
                        >
                    </data_table_view>
                </div>
            </div>
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
            <footer class="footer">
                <a><img src="/static/images/IBM_logo_black.png"></a>
            </footer>
        </div>
      `
    ,


})