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
            <div class="ds-table-container">
                <!-- Add Option-->
                <div class="ds-row ds-pad-b-1 ds-pad-r-1" v-if="has_records() && add_button">
                    <button class="ds-icon-small ds-text-blue-6 ds-icon-add ds-icon-button-dark ds-float-right" aria-label="Add item" v-on:click="add_action()">Add</button>
                </div>
                <!-- Table content -->
                <table class="ds-table ds-table-compact" v-if="has_records()">
                    <thead>
                        <tr>
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

    },
    data: function() {
        return {}
    },
    methods: {
        view_action: function(id){
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
            <div class="ds-table-container">
                <!-- Table content -->
                <table class="ds-table ds-table-compact" v-if="has_records()">
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
                                <button class="ds-icon-medium ds-icon-view ds-icon-button-dark" aria-label="View item" v-on:click="view_action(row[0])"></button>
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

export var data_table_search = {
    props: {
        title: {type: String, default: 'Title'},
        data_header: {type: Array},
        data_table: {type: Array},
        add_link: {type: String, default: '/'},
        edit_link: {type: String, default: '/'}
    },
    methods: {
        add_redirect: function(){
            window.location = this.add_link;
        },
        edit_redirect: function(id){
            window.location = this.edit_link + "?id="+ id;
        }
    },
    template: `
        <div class="ds-table-container">
            <div class="ds-row ds-pad-b-1">
                <div class="ds-col-8 ds-text-align-left">
                    <input class="ds-input" placeholder="Type to search"></input>
                </div>
                <div class="ds-col-4 ds-text-align-right">
                    <button class="ds-primary ds-button ds-display-inline-block" v-on:click="add_redirect()">
                        <span class="ds-icon-add"></span> Add
                    </button>
                </div>
            </div>
            <table class="ds-table ds-hover ds-table-compact ds-striped">
                <thead>
                    <tr>
                        <th v-for="item in data_header">{{item}}</th>
                        <th style="width: 80px;">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in data_table">
                        <td v-for="value in row">
                            {{value}}
                        </td>
                        <td style="width: 80px;">
                            <button class="ds-icon-medium ds-icon-edit ds-icon-button-dark" aria-label="Edit item" v-on:click="edit_redirect(row[0])"></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
};

export var data_table_files = {
    props: {
        data_table: {type: Object}
    },
//    created: function(){
//        for(var x in this.data_table){
//            this.delete_flag.push(false);
//        }
//    },
    data: function() {
        return {
            'input_file': '',
            'input_id': ''
        }
    },
    created(){
        this.input_id = Math.random().toString(36).substring(7);
    },
    methods: {
        add_action: function(event){
            this.input_file = '';
            this.$emit('add_action', event);
        },
        delete_action: function(event){
            this.$emit('delete_action', event);
        }
    },
    template: `
        <div>
             <table>
                <tr v-for="(item, key) in data_table">
                    <!-- File name -->
                    <td>
                        <a v-bind:href="item.href" v-if="item.href">{{ item.name }}</a>
                        <span v-html="item.name" class="ds-text" v-else/>
                    </td>
                    <!-- Delete file -->
                    <td>
                        <button class="ds-icon-small ds-icon-close-outline ds-icon-button-dark" aria-label="Delete item" v-on:click="delete_action(item.name)" ></button>
                    </td>
                </tr>
            </table>
            <div class="ds-pad-t-1">
                <label v-bind:for="input_id" class="ds-icon-medium ds-icon-attachment ds-icon-button-dark">
                    <input v-bind:id="input_id" type="file"  @change="add_action($event)" style="opacity: 0;">
                </label>
            </div>
        </div>
    `
};