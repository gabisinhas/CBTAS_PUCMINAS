import * as Utils from "/static/components/util/common.js";

export var text_input_standard = {
    /*
    Standard Input Text. See the detailed props below:

    value(required)	        Purpose: v-model prop from parent component

    light_theme(optional)	Purpose: backgroung color for input field
                            Options: true or false - default value for prop is True (which applies the white color)

    label(optional)	        Purpose: Input Field Title

    helper_txt(optional)    Purpose: Provide additional help text for the user

    invalid(optional)       Purpose: Highlight the input field with red indicating the value entered is not valid

    invalid_msg(optional)   Purpose: Provide an custom message explaining why the value entered is not valid

    disabled(optional)      Purpose: Disable input field

    placeholder(optional)	Purpose: Provide a placeholder help text inside input field
    */
    props: {
        value: {required: true},
        light_theme: {type: Boolean, default: true},
        label: {type: String, default: ''},
        helper_txt: {type: String, default: ''},
        helper_txt_below: {type: String, default: ''},
        invalid: {type: Boolean, default: false},
        invalid_msg: {type: String, default: 'Invalid value'},
        disabled: {type: Boolean, default: false},
        placeholder: {type: String, default: ''},
        readonly: {type: Boolean, default: false},
        mandatory: {type: Boolean, default: false},
    },
    template: `
        <div class="bx--form-item bx--text-input-wrapper">
            <label for="text-input" class="bx--label" :class="{ 'red-asterisk-req': mandatory }"> {{ label }} </label>
            <div v-if="helper_txt" class="bx--form__helper-text">
                {{ helper_txt }}
            </div>            
            <div class="bx--text-input__field-wrapper" :data-invalid="invalid">
                <svg v-if="invalid" focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--text-input__invalid-icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M8,1C4.2,1,1,4.2,1,8s3.2,7,7,7s7-3.1,7-7S11.9,1,8,1z M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2\tc-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z"></path><path d="M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8\tc0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z" data-icon-path="inner-path" opacity="0"></path></svg>
                </svg>
                <input id="text-input" type="text" class="bx--text-input"
                       :value="value"
                       @input="$emit('input', $event.target.value)"
                       :class="{ 'bx--text-input--light': light_theme, 'bx--text-input--invalid' : invalid }"
                       :disabled="disabled"
                       :placeholder="placeholder"
                       :readonly="readonly">
            </div>
            <div v-if="helper_txt_below" class="bx--form__helper-text">
                {{ helper_txt_below }}
            </div>
            <div class="bx--form-requirement">
                {{ invalid_msg }}
            </div>
        </div>
    `
};

export var number_input_standard = {
    /*
    Standard Input Number. See the detailed props below:

    value(required)	        Purpose: v-model prop from parent component

    light_theme(optional)	Purpose: backgroung color for input field
                            Options: true or false - default value for prop is True (which applies the white color)

    label(optional)	        Purpose: Input Field Title

    helper_txt(optional)    Purpose: Provide additional help text for the user

    invalid(optional)       Purpose: Highlight the input field with red indicating the value entered is not valid

    invalid_msg(optional)   Purpose: Provide an custom message explaining why the value entered is not valid

    disabled(optional)      Purpose: Disable input field

    placeholder(optional)	Purpose: Provide a placeholder help text inside input field
    */
    props: {
        value: {required: true},
        light_theme: {type: Boolean, default: true},
        label: {type: String, default: ''},
        helper_txt: {type: String, default: ''},
        helper_txt_below: {type: String, default: ''},
        invalid: {type: Boolean, default: false},
        invalid_msg: {type: String, default: 'Invalid value'},
        disabled: {type: Boolean, default: false},
        placeholder: {type: String, default: ''},
    },
    template: `
        <div class="bx--form-item">
            <div :data-invalid="invalid" data-numberinput class="bx--number" :class="{ 'bx--number--light': light_theme }">
                <label for="number-input" class="bx--label">{{ label }}</label>
                <div v-if="helper_txt" class="bx--form__helper-text">
                    {{ helper_txt }}
                </div>
                <div class="bx--number__input-wrapper">
                    <input id="number-input" type="number" class="bx--text-input" role="alert" aria-atomic="true"
                           :value="value"
                           @input="$emit('input', $event.target.value)"
                           :class="{ 'bx--text-input--invalid' : invalid }"
                           :disabled="disabled"
                           :placeholder="placeholder">
                    <svg v-if="invalid" focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;"
                         xmlns="http://www.w3.org/2000/svg" class="bx--number__invalid" width="16" height="16"
                         viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M8,1C4.2,1,1,4.2,1,8s3.2,7,7,7s7-3.1,7-7S11.9,1,8,1z M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2\tc-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z"></path>
                        <path d="M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8\tc0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z"
                              data-icon-path="inner-path" opacity="0"></path>
                    </svg>
                    <div class="bx--number__controls">
                        <button aria-label="increase number input" class="bx--number__control-btn up-icon" type="button"
                                aria-live="polite" aria-atomic="true">
                            <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;"
                                 xmlns="http://www.w3.org/2000/svg" width="8" height="4" viewBox="0 0 8 4" aria-hidden="true">
                                <path d="M0 4L4 0 8 4z"></path>
                            </svg>
                        </button>
                        <button aria-label="decrease number input" class="bx--number__control-btn down-icon" type="button"
                                aria-live="polite" aria-atomic="true">
                            <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;"
                                 xmlns="http://www.w3.org/2000/svg" width="8" height="4" viewBox="0 0 8 4" aria-hidden="true">
                                <path d="M8 0L4 4 0 0z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="bx--form-requirement">
                    {{ invalid_msg }}
                </div>
            </div>
        </div>
    `
};

export var text_area_standard = {
    /*
    Standard Text area. See the detailed props below:

    value(required)	        Purpose: v-model prop from parent component

    light_theme(optional)	Purpose: backgroung color for input field
                            Options: true or false - default value for prop is True (which applies the white color)

    label(optional)	        Purpose: Input Field Title

    helper_txt(optional)    Purpose: Provide additional help text for the user

    invalid(optional)       Purpose: Highlight the input field with red indicating the value entered is not valid

    invalid_msg(optional)   Purpose: Provide an custom message explaining why the value entered is not valid

    disabled(optional)      Purpose: Disable input field

    placeholder(optional)	Purpose: Provide a placeholder help text inside input field
    */
    props: {
        value: {type: String, required: true},
        light_theme: {type: Boolean, default: true},
        label: {type: String, default: ''},
        helper_txt: {type: String, default: ''},
        invalid: {type: Boolean, default: false},
        disabled: {type: Boolean, default: false},
        placeholder: {type: String, default: ''},
        mandatory: {type: Boolean, default: false},
        invalid_msg: {type: String, default: 'Invalid value'},
    },
    template: `
        <div class="bx--form-item">
          <label :for="label" class="bx--label" :class="{ 'red-asterisk-req': mandatory }">{{ label }}&nbsp;</label>
          <div class="bx--form__helper-text">
            {{ helper_txt }}
          </div>          
          <div class="bx--text-area__wrapper" style="margin-bottom: 0.5rem;" :data-invalid="invalid">
            <svg v-if="invalid" focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--text-area__invalid-icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M8,1C4.2,1,1,4.2,1,8s3.2,7,7,7s7-3.1,7-7S11.9,1,8,1z M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2\tc-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z"></path><path d="M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8\tc0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z" data-icon-path="inner-path" opacity="0"></path></svg>
            <textarea :id="label" class="bx--text-area bx--text-area--invalid bx--text-area--v2" :class="{'bx--text-area--light':light_theme}" rows="2" cols="60" :placeholder="placeholder"
                :value="value"
                @input="$emit('input', $event.target.value)"
                :disabled="disabled"
            ></textarea>
          </div>
        </div>
    `
};

export var text_input_edit_icon = {
    /*
    Standard Input Text. See the detailed props below:

    value(required)	        Purpose: v-model prop from parent component

    light_theme(optional)	Purpose: backgroung color for input field
                            Options: true or false - default value for prop is True (which applies the white color)

    label(optional)	        Purpose: Input Field Title

    helper_txt(optional)    Purpose: Provide additional help text for the user

    invalid(optional)       Purpose: Highlight the input field with red indicating the value entered is not valid

    invalid_msg(optional)   Purpose: Provide an custom message explaining why the value entered is not valid

    disabled(optional)      Purpose: Disable input field

    placeholder(optional)	Purpose: Provide a placeholder help text inside input field
    */
    props: {
        value: {type: String, required: true},
        light_theme: {type: Boolean, default: true},
        label: {type: String, default: ''},
        helper_txt: {type: String, default: ''},
        invalid: {type: Boolean, default: false},
        invalid_msg: {type: String, default: 'Invalid value'},
        disabled: {type: Boolean, default: false},
        placeholder: {type: String, default: ''},

    },
    template: `
        <div class="bx--form-item bx--text-input-wrapper">
            <label for="text-input" class="bx--label">{{ label }}</label>
            <div v-if="helper_txt" class="bx--form__helper-text">
                {{ helper_txt }}
            </div>            
            <div class="bx--text-input__field-wrapper" :data-invalid="invalid">
                <input id="text-input" type="text" class="bx--text-input"
                       :value="value"
                       @input="$emit('input', $event.target.value)"
                       :class="{ 'bx--text-input--light': light_theme , 'bx--text-input--invalid' : invalid }"
                       :disabled="disabled"
                       :placeholder="placeholder">
                <button v-if="disabled" type="button"
                  class="bx--text-input--password__visibility__toggle bx--tooltip__trigger bx--tooltip--a11y bx--tooltip--top bx--tooltip--align-end">
                  <span class="bx--assistive-text">This field cannot be edited</span>
                  <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 32 32" aria-hidden="true"><path d="M30 28.6L3.4 2 2 3.4l10.1 10.1L4 21.6V28h6.4l8.1-8.1L28.6 30 30 28.6zM9.6 26H6v-3.6l7.5-7.5 3.6 3.6L9.6 26zM29.4 6.2L29.4 6.2l-3.6-3.6c-.8-.8-2-.8-2.8 0l0 0 0 0-8 8 1.4 1.4L20 8.4l3.6 3.6L20 15.6l1.4 1.4 8-8C30.2 8.2 30.2 7 29.4 6.2L29.4 6.2zM25 10.6L21.4 7l3-3L28 7.6 25 10.6z"></path></svg>
                </button>                       
            </div>
            <div class="bx--form-requirement">
                {{ invalid_msg }}
            </div>
        </div>
    `
};

export var input_text_list_options_employee = {
    props: {
        value: {type: String, required: true},
        light_theme: {type: Boolean, default: true},
        label: {type: String, default: ''},
        helper_txt: {type: String, default: ''},
        invalid: {type: Boolean, default: false},
        invalid_msg: {type: String, default: 'Invalid value'},
        disabled: {type: Boolean, default: false},
        placeholder: {type: String, default: ''},
        data: {type: Array},
        data_uri: {type: String, default: null}

    },
    data: function () {
        return {
            show_list: false,
            loading_list: false,
            option_list: [],
            request_on: false,
            new_value: '',
        }
    },
    methods: {

        process_list: function () {

            // 1. Check the minimum size of user input and there is no process running
            if(this.value.length >=4 && !this.request_on){

               // 1. External data source
               if(this.data_uri != null){

                    if(!this.request_on){

                        this.request_on=true;
                        setTimeout(() => {
                            // Set flags
                            this.show_list = false;
                            this.loading_list = false;

                            // Reset option list
                            this.option_list = [];

                            // Set flags
                            this.show_list = true;
                            this.loading_list = true;

                            // Call API source data
                            axios
                                .get(this.data_uri+this.value)
                                .then(response => (
                                    this.option_list = response.data,
                                    this.loading_list = false,
                                    this.request_on = false
                                )
                            )
                        },2000);
                    }

               // 2. Internal data source
               }else{

                    // Set flags
                    this.show_list = false;
                    this.loading_list = false;

                    // Reset option list
                    this.option_list = [];

                    // Set flags
                    this.show_list = true;
                    this.loading_list = true;

                    // Search the typed value in the data list and add to the option_list
                    var x;
                    for(x in this.data){
                        // 1. Search in employee serial number
                        if(this.data[x].employee_serial_number.toLowerCase().includes(this.value.toLowerCase())){
                            this.option_list.push(this.data[x]);
                            continue;
                        }
                        // 2. Search in employee name
                        if(this.data[x].employee_name.toLowerCase().includes(this.value.toLowerCase())){
                            this.option_list.push(this.data[x]);
                            continue;
                        }
                        // 3. Search in employee email
                        if(this.data[x].employee_email.toLowerCase().includes(this.value.toLowerCase())){
                            this.option_list.push(this.data[x]);
                            continue;
                        }

                        // Reset loading flag
                        this.loading_list = false;
                    }
                }
            }
        },

        process_selected: function (name, email, serial) {
            this.show_list = false;
            this.loading_list = false;
            this.new_value = {
                'name': name,
                'email': email,
                'serial': serial
            };
            this.$emit('UserSelected', this.new_value);
        },

        image_uri: function(serial_number){
            return 'https://unified-profile-api.us-south-k8s.intranet.ibm.com/v3/image/' + serial_number
        },

        id_generation: function(){
            return Math.random().toString();
        }
    },
    template: `
        <div class="bx--form-item bx--text-input-wrapper">
            <label for="text-input" class="bx--label">{{ label }}</label>
            <div v-if="helper_txt" class="bx--form__helper-text">
                {{ helper_txt }}
            </div>            
            <div class="bx--text-input__field-wrapper" :data-invalid="invalid">
                <svg v-if="invalid" focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--text-input__invalid-icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M8,1C4.2,1,1,4.2,1,8s3.2,7,7,7s7-3.1,7-7S11.9,1,8,1z M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2\tc-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z"></path><path d="M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8\tc0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z" data-icon-path="inner-path" opacity="0"></path></svg>
                </svg>
                <input id="text-input" type="text" class="bx--text-input"
                       :value="value"
                       @input="$emit('input', $event.target.value)"
                       :class="{ 'bx--text-input--light': light_theme, 'bx--text-input--invalid' : invalid }"
                       :disabled="disabled"
                       :placeholder="placeholder"
                       @keyup="process_list()">
            </div>
            <div class="bx--form-requirement">
                {{ invalid_msg }}
            </div>
            <div v-if="this.show_list" style="width: calc(100% - 1285px); min-width: 328px; max-width: 353px;z-index: 2; position: absolute; padding-top: 4rem">
                <div v-if="option_list.length == 0 && request_on==false">
                    No records
                </div>
                <div v-else>
                    <table class="bx--data-table" style="width:unset;">
                        <tbody style="cursor: pointer">
                            <tr v-for="item in option_list" v-on:click="process_selected(item.employee_name, item.employee_email, item.employee_serial_number)">
                                <td class="bx--custom-pad-t-0_5 bx--custom-pad-b-0_5" style="background: white"><img
                                         width="45"
                                         height="45"
                                         v-bind:src="image_uri(item.employee_serial_number)"
                                         style="border-radius: 50%"/>
                                </td>
                                <td class="bx--custom-pad-t-0_5 bx--custom-pad-b-0_5" style="background: white; padding-left: unset;width: 100%;">
                                    <strong>{{ item.employee_name }}</strong><br>
                                    <span style="margin-top: 0.125rem;">{{ item.employee_email }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="loading_list" data-loading class="bx--loading bx--loading--small">
                      <svg class="bx--loading__svg" viewBox="-75 -75 150 150">
                        <title>Loading</title>
                        <circle class="bx--loading__background" cx="0" cy="0" r="26.8125" />
                        <circle class="bx--loading__stroke" cx="0" cy="0" r="26.8125" />
                      </svg>
                    </div>                    
                </div>
            </div>            
        </div>
    `
};

export var input_text_list_options_general = {
    props: {
        value: {type: String, required: true},
        label: {type: String, default: ''},
        mandatory: {type: Boolean, default: false},
        warning: {type: Boolean, default: false},
        readonly: {type: Boolean, default: false},
        placeholder: {type: String, default: ''},
        aria_label: {type: String, default: ''},
        tooltip: {type: String, default: ''},
        no_label: {type: Boolean, default: false},
        data: {type: Array},
        data_uri: {type: String, default: null}
    },
    data: function () {
        return {
            show_list: false,
            loading_list: false,
            option_list: [],
            request_on: false,
            new_value: ''
        }
    },
    methods: {
        wrapText: Utils.util_tool.wrap_text,

        process_list: function () {

            // 1. Check the minimum size of user input and there is no process running
            if(this.value.length >=4 && !this.request_on){

               // 1. External data source
               if(this.data_uri != null){

                    if(this.request_on==false){

                        this.request_on=true;
                        setTimeout(() => {
                            // Set flags
                            this.show_list = false;
                            this.loading_list = false;

                            // Reset option list
                            this.option_list = [];

                            // Set flags
                            this.show_list = true;
                            this.loading_list = true;

                            // Call API source data
                            axios
                                .get(this.data_uri+this.value)
                                .then(response => (
                                    this.option_list = response.data,
                                    this.loading_list = false,
                                    this.request_on = false
                                )
                            )
                        },2000);
                    }

               // 2. Internal data source
               }

               // 2. Local data source
               else{
                    // Set flags
                    this.show_list = false;
                    this.loading_list = false;

                    // Reset option list
                    this.option_list = [];

                    // Set flags
                    this.show_list = true;
                    this.loading_list = true;

                    // Search the typed value in the data list and add to the option_list
                    var x;
                    for(x in this.data){
                        // 2. Search in calendar name
                        if(this.data[x].id.toLowerCase().includes(this.value.toLowerCase())){
                            this.option_list.push(this.data[x]);
                            continue;
                        }

                        if(this.data[x].value.toLowerCase().includes(this.value.toLowerCase())){
                            this.option_list.push(this.data[x]);
                            continue;
                        }
                    }
                    // Reset loading flag
                    this.loading_list = false;
                }
            }
        },

        id_generation: function(){
            return Math.random().toString();
        },

        process_selected: function(value){
            this.show_list = false;
            this.loading_list = false;
            this.new_value = value;
            this.$emit(this.new_value);
        },
    },
    template: `
    <div>
        <div class="bx--form-item bx--text-input-wrapper">
            <div v-if="!no_label">
                <label v-if="label" for="text-input-3" class="bx--label">{{ label }}</label>
                <label v-else class="bx--label" :aria-label="aria_label">&nbsp;</label>
            </div>

            <div class="bx--text-input__field-wrapper">
                <input id="text-input-3" type="text" class="bx--text-input bx--text-input--light"
                    v-bind:value="value"
                    v-on:input="$emit('input', $event.target.value)"
                    :readonly="readonly"
                    :placeholder="placeholder"
                    v-on:keyup="process_list()">
            </div>

            <div v-if="this.show_list">
                <div v-if="option_list.length == 0 && request_on==false">
                    No records
                </div>
                <div v-else>
                    <div>
                        <table class="bx--data-table">
                            <tbody>
                                <tr v-for="item in option_list" v-on:click="$emit('input', item.id); process_selected(item.id)">
                                    <td style="background-color: #fff;">
                                        <span class="ds-text-small">{{ item.value }}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-if="loading_list" class="ds-loader ds-loader-sm" role="alert" aria-busy="true" aria-label="Custom text goes here"></div>
                </div>
            </div>
            <p v-if="warning" class="ds-input-msg ds-warning" id="input-warning-validation">Mandatory</p>
        </div>

    </div>
    `
};

export var input_date = {
    props: {
        value: {type: String, required: true},
        label: {type: String, default: ''},
        mandatory: {type: Boolean, default: false},
        warning_message: {type: String, default: ''},
        readonly: {type: Boolean, default: false},
        aria_label: {type: String, default: ''},
        tooltip: {type: String, default: ''},
        no_label: {type: Boolean, default: false},
        placeholder: {type: String, default: ''},
        input_custom_style: {type: String, default: ''}
    },
    methods: {

        wrapText: Utils.util_tool.wrap_text,

        /**
         * Format the date from "MM/DD/YYYY" to "YYYY-MM-DD"
         */
        format_date: function(date_value){
              if(/\d{1,2}\/\d{1,2}\/\d{4}/.test(date_value)){
                var date_parts = date_value.split("/");

                return date_parts[2] + "-" + date_parts[0] + "-" + date_parts[1]
              }

              return date_value;
        }

    },
    template: `
    <div class="bx--form-item bx--text-input-wrapper">
      <div data-date-picker data-date-picker-type="single"
        class="bx--date-picker bx--date-picker--single bx--date-picker--light">
        <div class="bx--date-picker-container">
          <label v-if="label" for="date-picker-3" v-bind:class="{ 'red-asterisk-req' : mandatory }" class="bx--label">{{ label }}&nbsp;</label>
          <div class="bx--date-picker-input__wrapper">
            <input
                type="text"
                id="date-picker-3"
                class="bx--date-picker__input"
                v-on:input="$emit('input', format_date($event.target.value))"
                :value="value"
                :readonly="readonly"
                :format="'YYYY-MM-DD'"
                :placeholder="placeholder"
                :data-invalid="warning_message != ''"
                :disabled="readonly"
                :style="input_custom_style"
                data-date-picker-input/>
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" data-date-picker-icon="true" class="bx--date-picker__icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M13,2h-2V1h-1v1H6V1H5v1H3C2.4,2,2,2.4,2,3v10c0,0.6,0.4,1,1,1h10c0.6,0,1-0.4,1-1V3C14,2.4,13.6,2,13,2z M13,13H3V6h10V13z M13,5H3V3h2v1h1V3h4v1h1V3h2V5z"></path></svg>
          </div>
            <div v-if="warning_message != ''" class="bx--custom-invalid-message" style="padding-left:0.1em;position: absolute;margin-top: 4.2rem;font-size: .75rem; letter-spacing: .32px; color: #da1e28;">
                {{ warning_message }}
            </div>
        </div>

      </div>
    </div>
    `
};

export var input_files = {
    props: {
        data_table: {type: Object},
        label: {type: String, default: ''},
        mandatory: {type: Boolean, default: false},
        readonly: {type: Boolean, default: false},
        max_file_size: {type: Number, default: 10}
    },

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
            // Max file size validation
            if(event.target.files[0].size > 10000000){
                this.input_file = '';
                this.$emit('file_size_exception', event);
                this.input_value = '';
            }else{
                this.input_file = '';
                this.$emit('add_action', event);
                this.input_value = '';
            }

        },

        delete_action: function(event){

            this.$emit('delete_action', event);
        },

        download_action(url, file_name) {
              axios({
                    url: url,
                    method: 'GET',
                    responseType: 'blob',
                }).then((response) => {

                     var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                     var fileLink = document.createElement('a');

                     fileLink.href = fileURL;
                     fileLink.setAttribute('download', file_name);
                     document.body.appendChild(fileLink);

                     fileLink.click();
              });
        }
    },

    template: `
        <div>
             <div class="bx--grid" style="padding-left:0px;">
                <label for="text-input" class="bx--label" :class="{ 'red-asterisk-req': mandatory }"> {{ label }} </label>
                <div class="bx--row" v-for="(item, key) in data_table">
                    <!-- File name -->
                    <div class="bx--col">
                        <div style="float: left; padding-top:10px;">
                            <a v-if="item.url" v-on:click="download_action(item.url, item.name)" href='#' >{{ item.name }}</a>
                            <span v-html="item.name" style="font-size: 12px; font-style: italic;" v-else/>
                        </div>
                        <div style="float: left;">
                        <button v-if="!readonly" type="button" aria-label="Delete item" v-on:click="delete_action(item.name)" style="padding-left:5px; padding-top: 8px;"
                          class="bx--text-input--password__visibility__toggle bx--tooltip__trigger bx--tooltip--a11y bx--tooltip--top bx--tooltip--align-end">
                          <span class="bx--assistive-text">Delete attachment</span>
                          <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 32 32" aria-hidden="true"><path d="M12 12H14V24H12zM18 12H20V24H18z"></path><path d="M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"></path></svg>
                        </button>
                        </div>

                    </div>
                </div>
            </div>
            <button v-if="!readonly" type="button" aria-label="Delete item" v-on:click="delete_action(item.name)" style="padding-left:5px; padding-top: 8px;"
              class="bx--text-input--password__visibility__toggle bx--tooltip__trigger bx--tooltip--a11y bx--tooltip--top bx--tooltip--align-end">
              <span class="bx--assistive-text">Delete attachment</span>

            </button>
            <div v-if="!readonly && Object.keys(data_table).length == 0" >
                <label v-bind:for="input_id" >
                    <div class="bx--tooltip__trigger bx--tooltip--a11y bx--tooltip--top bx--tooltip--align-end">
                    <span class="bx--assistive-text">Click to attach a file</span>
                    <svg  focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 32 32" aria-hidden="true"><path d="M28.1,18.9L13.1,3.9c-2.5-2.6-6.6-2.6-9.2-0.1S1.3,10.5,3.9,13c0,0,0.1,0.1,0.1,0.1L6.8,16l1.4-1.4l-2.9-2.9	C3.6,10,3.6,7.1,5.3,5.4s4.6-1.8,6.3-0.1c0,0,0,0,0.1,0.1l14.9,14.9c1.8,1.7,1.8,4.6,0.1,6.3c-1.7,1.8-4.6,1.8-6.3,0.1	c0,0,0,0-0.1-0.1l-7.4-7.4c-1-1-0.9-2.6,0-3.5c1-0.9,2.5-0.9,3.5,0l4.1,4.1l1.4-1.4c0,0-4.2-4.2-4.2-4.2c-1.8-1.7-4.6-1.6-6.3,0.2	c-1.6,1.7-1.6,4.4,0,6.2l7.5,7.5c2.5,2.6,6.6,2.6,9.2,0.1S30.7,21.5,28.1,18.9C28.1,19,28.1,18.9,28.1,18.9L28.1,18.9z"></path>

                    </svg>

                    </div>
                    <input v-bind:id="input_id" type="file"  @change="add_action($event)" style="opacity: 0;" :value="input_file">

                </label>
            </div>
        </div>
    `
};