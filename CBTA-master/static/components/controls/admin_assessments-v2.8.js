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

var admin_assessments = new Vue ({
    el: '#admin_assessments',
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

        // Data header
        data_table_header: ['Assessment', 'Employee Name', 'Employee ID', 'IBM Email', 'Origin', 'Destination', 'Type of Query', 'Created Date'],

        // Data table
        data_table: [],

        // Data table raw
        data_table_raw:{

        },

        // Export data
        data_export:[],

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
        'data_table_edit': DataTables.data_table_edit,
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

        updated: function(new_data, old_data){
            if(new_data){
                this.toast.type = 'success';
                this.toast.title = 'The request ' + new_data + ' was updated successfully';
                this.toast.subtitle = '';
                this.toast.show = true;
            }
        }
    },

    methods:{

        get_url_parameters(){
            let params = (new URL(window.location.href)).searchParams;
            this.updated = params.get('updated');
        },

        closeToast(){
            this.toast.show = false;
            this.toast.type = 'info';
            this.toast.title = '';
            this.toast.subtitle = '';
        },

        // -- Business methods --- //
        edit_item: function(id){

            window.location = "/view_admin_assessment?id=" + id.split(":")[1];

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
            .get("/assessment-management/assessment/admin/")
            .then(
                response => {

                    // Clean data
                    this.data_table_raw = {};
                    this.data_table = [];
                    this.data_export = []

                    // Parse result data
                    var query = "";
                    for(var x in response.data.assessments){

                        // Prepare export data
                        this.data_export.push({
                            'Assessment ID': response.data.assessments[x].assessment_id,
                            'Serial Number': response.data.assessments[x].serial_number,
                            'First Name': response.data.assessments[x].first_name,
                            'Last Name': response.data.assessments[x].last_name.replace(",", " "),
                            'Email': response.data.assessments[x].email,
                            'Phone': response.data.assessments[x].phone.replace(",", " "),
                            'Nationality': response.data.assessments[x].nationality,
                            'Business Unit': response.data.assessments[x].bus_unit.replace(",", " "),
                            'Project/Dept': response.data.assessments[x].project_dept.replace(",", " "),
                            'Email Copy': response.data.assessments[x].email_copy.replace(",", " "),
                            'CBTA question': response.data.assessments[x].cbta_question,
                            'Origin Country': response.data.assessments[x].origin_country,
                            'Destination Country': response.data.assessments[x].destin_country,
                            'Query Type': response.data.assessments[x].query_type,
                            'Query Description': response.data.assessments[x].query_desc.replace(",", " "),
                            'Planned Start': response.data.assessments[x].planned_start,
                            'Planned End': response.data.assessments[x].planned_end,
                            'Residency Status': response.data.assessments[x].residency_status,
                            'Details Visa': response.data.assessments[x].details_visa.replace(",", " "),
                            'Created Date': response.data.assessments[x].created_date,
                            'Created By': response.data.assessments[x].created_by
                        });

                        this.data_table_raw[response.data.assessments[x]._id] = response.data.assessments[x];
                        for(var idx in response.data.assessments[x].query_type){
                            if(query==""){
                                query = response.data.assessments[x].query_type[idx].charAt(0).toUpperCase() + response.data.assessments[x].query_type[idx].slice(1);
                            }else{
                                query = query + " " + response.data.assessments[x].query_type[idx].charAt(0).toUpperCase() + response.data.assessments[x].query_type[idx].slice(1);
                            }
                        }
                        this.data_table.push([response.data.assessments[x]._id, response.data.assessments[x].assessment_id, response.data.assessments[x].first_name, response.data.assessments[x].serial_number, response.data.assessments[x].email, response.data.assessments[x].origin_country, response.data.assessments[x].destin_country, query , response.data.assessments[x].created_date]);
                        query = "";
                    }

                    // Reset the loader
                    this.loading.initial = false;

                }
            );

        },

        // Export file from json to csv
        json_to_csv_standard(json_data, file_name, additional_text) {

            //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
            var arrData = typeof json_data != 'object' ? JSON.parse(json_data) : json_data;

            var CSV = 'sep=,' + '\r\n';

            // Add additional text
            for(var idx in additional_text){
                var row = additional_text[idx] + '\r\n';
                CSV += row + '\r\n';
            }

            // Extract each row
            for (var i = 0; i < arrData.length; i++) {
                // Generate header data
                if(i==0){
                    var row = "";
                    for(var key in arrData[i]){
                        row += key + ',';
                    }
                    row.slice(0, row.length - 1);

                    //add a line break after each row
                    CSV += row + '\r\n';
                }

                // Generate body data
                var row = "";
                for (var key in arrData[i]) {
                    row += '"' + arrData[i][key] + '",';
                }
                row.slice(0, row.length - 1);

                //add a line break after each row
                CSV += row + '\r\n';
            }

            if (CSV == '') {
                alert("Invalid data");
                return;
            }

            // Download the file
            const blob = new Blob([CSV], {type: "text/plain;charset=windows-1252"})
            const e = document.createEvent('MouseEvents'),
            a = document.createElement('a');
            a.download = file_name + ".csv";
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);

    //        var file = new File([CSV], file_name + ".csv", {type: "text/plain;charset=windows-1252"});
    //        saveAs(file);

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
            <div class= "bx--grid" style="padding-left: 4%;  margin-left: auto; margin-right: auto; padding-bottom: 200px;">
                <!-- Admin Requests -->
                <div class="bx--row" style="padding-top:48px; padding-bottom:42px;">
                    <div class="bx--col" >
                        <img style="float:left; padding-top: 6px; width: 32px; height: 32px;" src="/static/images/admin_assessment.svg"/>
                        <h2 class="h1" style="float: left; padding-left:8px;">Admin Requests</h2>
                    </div>
                </div>
                <!-- Information section -->
                <!-- Main content -->
                <div class="bx--row" style="">
                    <data_table_edit v-if="!view_flag"
                        v-bind:title="'My Assessments'"
                        v-bind:data_header="data_table_header"
                        v-bind:data_table="data_table"
                        v-on:edit_action="edit_item($event)"
                        v-on:export="json_to_csv_standard(data_export, 'assessments_export', null)"
                        style="padding-left: 16px;"
                        >
                    </data_table_edit>
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