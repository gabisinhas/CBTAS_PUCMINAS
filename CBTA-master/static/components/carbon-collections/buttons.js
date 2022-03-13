export var button_standard = {
    /*
    Stardard button with no icon. See the detailed props below:

    modal_on_click      Purpose: If set to true, it opens a modal box after click. PS: The modal_standard component is required

    modal_id            Purpose: Set a unique ID to triger to modal to open. PS: The same ID needs to be set in the modal_standard component

    theme(required)	    Purpose
    Primary	            For the principal call to action on the page.
    Secondary	        For secondary actions on each page; these can only be used  in conjunction with a primary button.
    Tertiary	        For less prominent actions; tertiary buttons can be used in isolation or paired with a primary button when there are multiple calls to action.
    Danger	            For actions that could have destructive effects on the user’s data (delete, remove, etc.).
    Ghost	            For the least pronounced actions; often used in conjunction with a primary button.

    label(required)     Purpose: Button label

    size(optional)	    Height (px/rem)	    Use Case
    Default	            48/3	            Use as primary page actions and other standalone actions.
    Field	            40/2.5	            Use when buttons are paired with input fields.
    Small	            32/2	            Use when there is not enough vertical space for the default or field-sized button.

    disabled(optional)  Disable the button

    */
    props: {
        theme: {type: String, required: true},
        modal_on_click: {type: Boolean, default: false},
        modal_id: {type: String, default:'id'},
        label: {type: String, required: true},
        size: {type: String, default: ''},
        disabled: {type: Boolean, default: false}
    },
    template: `
        <button type="button"
            :data-modal-target="'#' + modal_id"
            class="bx--btn"
            :class="{
            'bx--btn--primary' : theme == 'Primary',
            'bx--btn--secondary' : theme == 'Secondary',
            'bx--btn--tertiary' : theme == 'Tertiary',
            'bx--btn--danger' : theme == 'Danger',
            'bx--btn--ghost' : theme == 'Ghost',
            'bx--btn--field' : size == 'Field',
            'bx--btn--sm' : size == 'Small'
            }"
            :disabled="disabled"
        >{{ label }}</button>
    `
};

export var button_employee_file_upload = {
    /*
    Stardard button file upload. See the detailed props below:
    */
    data() {
        return {
            file_name: '',
            random_id: 0,
        }
    },
    created(){
        this.random_id = Math.floor(100000 + Math.random() * 900000);
    },
    props: {
        status: {type: String, required: true},
        duplicated: {type: Array, default: []},
        not_found: {type: Array, default: []}
    },
    methods: {
        handleFile(event) {
            // Set context this to a variable to not loose the reference after the papa.parse callback
            var self = this;

            // Set the file name in the div
            this.file_name = event.target.files[0].name;

            this.$emit('SetFileName', this.file_name);

            var cnums = [];
            // Parse the csv file into JSON
            Papa.parse(event.target.files[0], {
                // Config Object Parameters
                header: false,
                // Callback when completed reading the file
                complete: function (results) {
                    // TODO Check first if there's any error with the file selected ?
                    for (let item in results.data){
                        cnums.push(results.data[item][0]);
                    }
                    // Emit to parent component all the cnums parsed as string into array
                    self.$emit('CNUMsParsed', cnums);
                }
            });
        },
        deleteFile(){
            this.file_name = '';
            this.$emit('FileDeleted');
        }
    },
    template: `
        <div class="bx--form-item">
            <strong class="bx--file--label">Upload file</strong>
            <p class="bx--label-description">Supported file type is a .csv up to 500kb</p>
            <div class="bx--file">
                <label :for="random_id"
                       class="bx--file-browse-btn bx--file__drop-container bx--file__drop bx--custom-button-upload-file"
                       role="button">Add file</label>
                <input type="file" :id="random_id" name="myfile" style="visibility:hidden;" accept=".csv" @change="handleFile">
                <div v-if="file_name" class="bx--file-container" style="margin-top: 0px;">
                    <span class="bx--file__selected-file" :class="{'bx--file__selected-file--invalid' : status == 'fail'}">
                          <p class="bx--file-filename" :name="random_id">{{ file_name }}</p>
                            <span v-if="status == 'success'" :data-for="random_id" class="bx--file__state-container">
                                <button class="bx--file-close" type="button" aria-label="close" @click="deleteFile">
                                <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16">
                                <path fill="#231F20"
                                      d="M12 4.7l-.7-.7L8 7.3 4.7 4l-.7.7L7.3 8 4 11.3l.7.7L8 8.7l3.3 3.3.7-.7L8.7 8z"></path>
                                </svg>
                                </button>
                            </span>
                            <span v-if="status == 'loading'" data-for="prepopulated-file-uploader"
                                  class="bx--file__state-container">
                                <div class="bx--inline-loading__animation">
                                <div data-inline-loading-spinner="" class="bx--loading bx--loading--small">
                                <svg class="bx--loading__svg" viewBox="-75 -75 150 150">
                                <circle class="bx--loading__background" cx="0" cy="0" r="26.8125"></circle>
                                <circle class="bx--loading__stroke" cx="0" cy="0" r="26.8125"></circle>
                                </svg>
                                </div>
                                </div>
                            </span>
                            <span v-if="status == 'fail'" data-for="prepopulated-file-uploader"
                                  class="bx--file__state-container">
                                <svg focusable="false" preserveAspectRatio="xMidYMid meet"
                                     style="will-change: transform;"
                                     xmlns="http://www.w3.org/2000/svg" class="bx--file--invalid" width="16" height="16"
                                     viewBox="0 0 16 16" aria-hidden="true">
                                    <path d="M8,1C4.2,1,1,4.2,1,8s3.2,7,7,7s7-3.1,7-7S11.9,1,8,1z M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2 c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z"></path>
                                    <path d="M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8 c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z" data-icon-path="inner-path" opacity="0"></path>
                                </svg>
                                <svg focusable="true" preserveAspectRatio="xMidYMid meet"
                                     style="will-change: transform;"
                                     xmlns="http://www.w3.org/2000/svg" aria-label="Remove uploaded file"
                                     class="bx--file-close" @click="deleteFile"
                                     width="16" height="16" viewBox="0 0 16 16" role="img" tabindex="0">
                                    <path d="M12 4.7L11.3 4 8 7.3 4.7 4 4 4.7 7.3 8 4 11.3 4.7 12 8 8.7 11.3 12 12 11.3 8.7 8z"></path>
                                </svg>
                            </span>
                            <div v-if="status == 'fail'" class="bx--form-requirement">
                                <div v-if="duplicated.length > 0" class="bx--form-requirement__title"><strong>CNUMs already loaded:</strong> {{ duplicated.toString() }} </div>
                                <div v-if="not_found.length > 0" class="bx--form-requirement__title"><strong>CNUMs not found:</strong> {{ not_found.toString() }} </div>
                                <div class="bx--form-requirement__title">Validate and re-upload your file.</div>
                            </div>
                    </span>
                </div>
            </div>
        </div>
    `
};

export var button_icon_reset_filter = {
    /*
    Button with reset icon. See the detailed props below:

    modal_on_click      Purpose: If set to true, it opens a modal box after click. PS: The modal_standard component is required

    modal_id            Purpose: Set a unique ID to triger to modal to open. PS: The same ID needs to be set in the modal_standard component

    theme(required)	    Purpose
    Primary	            For the principal call to action on the page.
    Secondary	        For secondary actions on each page; these can only be used  in conjunction with a primary button.
    Tertiary	        For less prominent actions; tertiary buttons can be used in isolation or paired with a primary button when there are multiple calls to action.
    Danger	            For actions that could have destructive effects on the user’s data (delete, remove, etc.).
    Ghost	            For the least pronounced actions; often used in conjunction with a primary button.

    tooltip(required)   Purpose: Tooltip help text

    size(optional)	    Height (px/rem)	    Use Case
    Default	            48/3	            Use as primary page actions and other standalone actions.
    Field	            40/2.5	            Use when buttons are paired with input fields.
    Small	            32/2	            Use when there is not enough vertical space for the default or field-sized button.

    disabled(optional)  Disable the button
    */
    props: {
        theme: {type: String, required: true},
        modal_on_click: {type: Boolean, default: false},
        modal_id: {type: String, default:'id'},
        tooltip: {type: String, required: true},
        size: {type: String, default: ''},
        disabled: {type: Boolean, default: false}
    },
    template: `
        <button type="button"
            :data-modal-target="'#' + modal_id"
            class="bx--btn bx--btn--icon-only bx--tooltip__trigger bx--tooltip--a11y bx--tooltip--top bx--tooltip--align-center" style="margin-right: 1rem"
            :class="{
            'bx--btn--primary' : theme == 'Primary',
            'bx--btn--secondary' : theme == 'Secondary',
            'bx--btn--tertiary' : theme == 'Tertiary',
            'bx--btn--danger' : theme == 'Danger',
            'bx--btn--ghost' : theme == 'Ghost',
            'bx--btn--field' : size == 'Field',
            'bx--btn--sm' : size == 'Small'
            }"
            :disabled="disabled">
          <span class="bx--assistive-text">{{ tooltip }}</span>
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true">
                <path style="color: #2c2c2c" d="M22.5,9A7.4522,7.4522,0,0,0,16,12.792V8H14v8h8V14H17.6167A5.4941,5.4941,0,1,1,22.5,22H22v2h.5a7.5,7.5,0,0,0,0-15Z"></path>
                <path style="color: #2c2c2c" d="M26,6H4V9.171l7.4142,7.4143L12,17.171V26h4V24h2v2a2,2,0,0,1-2,2H12a2,2,0,0,1-2-2V18L2.5858,10.5853A2,2,0,0,1,2,9.171V6A2,2,0,0,1,4,4H26Z"></path>
            </svg>
        </button>
    `
};


export var button_icon_search = {
    /*
    Button with search icon. See the detailed props below:

    modal_on_click      Purpose: If set to true, it opens a modal box after click. PS: The modal_standard component is required

    modal_id            Purpose: Set a unique ID to triger to modal to open. PS: The same ID needs to be set in the modal_standard component

    theme(required)	    Purpose
    Primary	            For the principal call to action on the page.
    Secondary	        For secondary actions on each page; these can only be used  in conjunction with a primary button.
    Tertiary	        For less prominent actions; tertiary buttons can be used in isolation or paired with a primary button when there are multiple calls to action.
    Danger	            For actions that could have destructive effects on the user’s data (delete, remove, etc.).
    Ghost	            For the least pronounced actions; often used in conjunction with a primary button.

    tooltip(required)   Purpose: Tooltip help text

    size(optional)	    Height (px/rem)	    Use Case
    Default	            48/3	            Use as primary page actions and other standalone actions.
    Field	            40/2.5	            Use when buttons are paired with input fields.
    Small	            32/2	            Use when there is not enough vertical space for the default or field-sized button.

    disabled(optional)  Disable the button
    */
    props: {
        theme: {type: String, required: true},
        modal_on_click: {type: Boolean, default: false},
        modal_id: {type: String, default:'id'},
        tooltip: {type: String, required: true},
        size: {type: String, default: ''},
        disabled: {type: Boolean, default: false}
    },
    template: `
        <button type="button"
            :data-modal-target="'#' + modal_id"
            class="bx--btn bx--btn--icon-only bx--tooltip__trigger bx--tooltip--a11y bx--tooltip--top bx--tooltip--align-center" style="margin-right: 1rem"
            :class="{
            'bx--btn--primary' : theme == 'Primary',
            'bx--btn--secondary' : theme == 'Secondary',
            'bx--btn--tertiary' : theme == 'Tertiary',
            'bx--btn--danger' : theme == 'Danger',
            'bx--btn--ghost' : theme == 'Ghost',
            'bx--btn--field' : size == 'Field',
            'bx--btn--sm' : size == 'Small'
            }"
            :disabled="disabled">
          <span class="bx--assistive-text">{{ tooltip }}</span>
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true">
                <path style="color: #2c2c2c" d="M29,27.5859l-7.5521-7.5521a11.0177,11.0177,0,1,0-1.4141,1.4141L27.5859,29ZM4,13a9,9,0,1,1,9,9A9.01,9.01,0,0,1,4,13Z"></path>
            </svg>
        </button>
    `
};

export var button_label_with_plus_icon = {
    /*
    Stardard button with a label and a plus icon. See the detailed props below:

    modal_on_click      Purpose: If set to true, it opens a modal box after click. PS: The modal_standard component is required

    modal_id            Purpose: Set a unique ID to triger to modal to open. PS: The same ID needs to be set in the modal_standard component

    theme(required)	    Purpose
    Primary	            For the principal call to action on the page.
    Secondary	        For secondary actions on each page; these can only be used  in conjunction with a primary button.
    Tertiary	        For less prominent actions; tertiary buttons can be used in isolation or paired with a primary button when there are multiple calls to action.
    Danger	            For actions that could have destructive effects on the user’s data (delete, remove, etc.).
    Ghost	            For the least pronounced actions; often used in conjunction with a primary button.

    label(required)     Purpose: Button label

    size(optional)	    Height (px/rem)	    Use Case
    Default	            48/3	            Use as primary page actions and other standalone actions.
    Field	            40/2.5	            Use when buttons are paired with input fields.
    Small	            32/2	            Use when there is not enough vertical space for the default or field-sized button.

    disabled(optional)  Disable the button

    button_on_click(optional) Purpose: If set to true, it will trigger an event after click.
    */
    props: {
        theme: {type: String, required: true},
        modal_on_click: {type: Boolean, default: false},
        modal_id: {type: String, default:'id'},
        label: {type: String, required: true},
        size: {type: String, default: ''},
        disabled: {type: Boolean, default: false},
        button_on_click: {type: Boolean, default: false}
    },
    template: `
        <button type="button"
            @click="button_on_click ? $emit('button_on_click') : ''"
            :data-modal-target="'#' + modal_id"
            class="bx--btn" style="margin-right: 1rem"
            :class="{
            'bx--btn--primary' : theme == 'Primary',
            'bx--btn--secondary' : theme == 'Secondary',
            'bx--btn--tertiary' : theme == 'Tertiary',
            'bx--btn--danger' : theme == 'Danger',
            'bx--btn--ghost' : theme == 'Ghost',
            'bx--btn--field' : size == 'Field',
            'bx--btn--sm' : size == 'Small'
            }"
            :disabled="disabled"
        >{{ label }}
        <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--btn__icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M9 7L9 3 7 3 7 7 3 7 3 9 7 9 7 13 9 13 9 9 13 9 13 7z"></path>
        </svg>
        </button>
    `
};


export var button_icon_exclude = {
    /*
    Button with search icon. See the detailed props below:

    modal_on_click      Purpose: If set to true, it opens a modal box after click. PS: The modal_standard component is required

    modal_id            Purpose: Set a unique ID to triger to modal to open. PS: The same ID needs to be set in the modal_standard component

    theme(required)	    Purpose
    Primary	            For the principal call to action on the page.
    Secondary	        For secondary actions on each page; these can only be used  in conjunction with a primary button.
    Tertiary	        For less prominent actions; tertiary buttons can be used in isolation or paired with a primary button when there are multiple calls to action.
    Danger	            For actions that could have destructive effects on the user’s data (delete, remove, etc.).
    Ghost	            For the least pronounced actions; often used in conjunction with a primary button.

    tooltip(required)   Purpose: Tooltip help text

    size(optional)	    Height (px/rem)	    Use Case
    Default	            48/3	            Use as primary page actions and other standalone actions.
    Field	            40/2.5	            Use when buttons are paired with input fields.
    Small	            32/2	            Use when there is not enough vertical space for the default or field-sized button.

    disabled(optional)  Disable the button
    */
    props: {
        theme: {type: String, required: true},
        modal_on_click: {type: Boolean, default: false},
        modal_id: {type: String, default:'id'},
        tooltip: {type: String, required: true},
        size: {type: String, default: ''},
        disabled: {type: Boolean, default: false}
    },
    template: `
        <button type="button"
            :data-modal-target="'#' + modal_id"
            class="bx--btn bx--btn--icon-only bx--tooltip__trigger bx--tooltip--a11y bx--tooltip--top bx--tooltip--align-center" style="margin-right: 1rem"
            :class="{
            'bx--btn--primary' : theme == 'Primary',
            'bx--btn--secondary' : theme == 'Secondary',
            'bx--btn--tertiary' : theme == 'Tertiary',
            'bx--btn--danger' : theme == 'Danger',
            'bx--btn--ghost' : theme == 'Ghost',
            'bx--btn--field' : size == 'Field',
            'bx--btn--sm' : size == 'Small'
            }"
            :disabled="disabled">
          <span class="bx--assistive-text">{{ tooltip }}</span>
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M12 12H14V24H12zM18 12H20V24H18z"></path>
                <path d="M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"></path>
            </svg>
        </button>
    `
};