export var data_table = {
    props: {
        title: {type: String, default: 'Title'},
        data_header: {type: Array},
        data_table: {type: Array},
        add_button: {type: Boolean},
        delete_button: {type: Boolean}
    },
    created: function(){
        for(var x in this.data_table){
            this.delete_flag.push(false);
        }
    },
    data: function() {
        return {
            'delete_flag': []
        }
    },
    methods: {
        add_action: function(){
            console.log("test");
            this.$emit('add_action', true);
        },
        edit_action: function(id){
            this.$emit('edit_action', id);
        },
        delete_action: function(id){
            console.log("Test" + id);
            this.$emit('delete_action', id);
        },
        has_records: function(id){
            if(this.data_table.length > 0 ){
                return true;
            }
            return false;
        }
    },
    template: `
        <div>
            <!-- Add Option-->
            <div class="bx--row" v-if="has_records() && add_button">
                <button class="ds-icon-small ds-text-blue-6 ds-icon-add ds-icon-button-dark ds-float-right" aria-label="Add item" v-on:click="add_action()">Add</button>
            </div>
            <!-- Table content -->
            <table class="bx--data-table" v-if="has_records()">
                <thead>
                    <tr style="background-color: #3374a0">
                        <th v-for="item in data_header">{{item}}</th>
                        <th style="width: 80px;">Edit</th>
                        <th style="width: 80px;" v-if="delete_button">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in data_table">
                        <template v-for="(value, index) in row">
                            <td v-if="index > 0">
                                {{value}}
                            </td>
                        </template>
                        <td style="width: 80px;">
                            <button class="ds-icon-medium ds-icon-edit ds-icon-button-dark" aria-label="Edit item" v-on:click="edit_action(row[0])"></button>
                        </td>
                        <td v-if="delete_button">
                            <a class="ds-caption-small" v-on:click="delete_action(row[0])" v-if="delete_flag[index]">Click to confirm</a>
                            <button class="ds-icon-medium ds-icon-close-outline ds-icon-button-dark" aria-label="Delete item" v-on:click="$set(delete_flag, index, true)" v-if="!delete_flag[index]"></button>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            <!-- No content -->
            <div class="ds-row ds-pad-b-1 ds-pad-r-1 ds-text-align-center" v-if="!has_records()">
                <p class="ds-label ds-centered">No records found</p>
                <button class="ds-icon-small ds-text-blue-6 ds-icon-add ds-icon-button-dark" aria-label="Add item" v-on:click="add_action()">Add</button>
            </div>
        </div>
    `
};

export var data_table_view = {
    props: {
        title: {type: String, default: 'Title'},
        data_header: {type: Array},
        data_table: {type: Array}
    },
    created: function(){
        console.log("test");
        console.log(this.data_table);
        console.log(this.data_header);
    },
    data: function() {
        return {}
    },
    methods: {
        view_action: function(id){
            console.log("ckp");
            this.$emit('view_action', id);
        },
        has_records: function(id){
            if(this.data_table.length > 0 ){
                return true;
            }
            return false;
        }
    },
    template: `
        <div>
            <div v-if="has_records()">
                <!-- Table content -->
                <table class="bx--data-table bx--data-table--zebra" v-if="has_records()">
                    <thead>
                        <tr>
                            <th v-for="item in data_header">{{item}}</th>
                            <th style="width: 80px;">View</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in data_table">
                            <template v-for="(value, index) in row">
                                <td v-if="index > 0">
                                    {{value}}
                                </td>
                            </template>
                            <td style="width: 80px;">
                                <svg focusable="false" aria-label="View item" v-on:click="view_action(row[0])" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 32 32" aria-hidden="true"><path d="M30.94,15.66A16.69,16.69,0,0,0,16,5,16.69,16.69,0,0,0,1.06,15.66a1,1,0,0,0,0,.68A16.69,16.69,0,0,0,16,27,16.69,16.69,0,0,0,30.94,16.34,1,1,0,0,0,30.94,15.66ZM16,25c-5.3,0-10.9-3.93-12.93-9C5.1,10.93,10.7,7,16,7s10.9,3.93,12.93,9C26.9,21.07,21.3,25,16,25Z"></path><path d="M16,10a6,6,0,1,0,6,6A6,6,0,0,0,16,10Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,16,20Z"></path><title>View</title></svg>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else style="padding-bottom: 200px;">
                No records!
            </div>
        </div>
    `
};

export var data_table_edit = {
    props: {
        title: {type: String, default: 'Title'},
        data_header: {type: Array},
        data_table: {type: Array}
    },
    created: function(){
        console.log(this.data_table);
        console.log(this.data_header);
    },
    data: function() {
        return {}
    },
    methods: {
        data_export(){
            var export_json = [];
            var current_data = {};
            for(var row in this.data_table){
                for(var column=1; column<this.data_table[row].length; column++){
                    current_data[this.data_header[column-1]] = this.data_table[row][column];
                }
                export_json.push(current_data);
                current_data = {};
            }
            console.log(export_json);
            return export_json;
        },
        edit_action: function(id){

            this.$emit('edit_action', id);
        },
        has_records: function(id){
            if(this.data_table.length > 0 ){
                return true;
            }
            return false;
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
            <div v-if="has_records()">
                <!-- Export -->
                <a href="#" v-on:click="$emit('export')" style="float:right; padding-bottom: 4px; padding-right: 6px;">Export</a>
                <!-- Table content -->
                <table class="bx--data-table bx--data-table--zebra">
                    <thead>
                        <tr>
                            <th v-for="item in data_header">{{item}}</th>
                            <th style="width: 80px;">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in data_table">
                            <template v-for="(value, index) in row">
                                <td v-if="index > 0">
                                    {{value}}
                                </td>
                            </template>
                            <td style="width: 80px;">
                                <img src="/static/images/edit.svg" v-on:click="edit_action(row[0])" width="18" height="18"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else style="padding-bottom: 200px;">
                No records!
            </div>

        </div>
    `
};