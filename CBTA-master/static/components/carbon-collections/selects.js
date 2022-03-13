export var select_standard = {
    /*
    Stardard select menu. See the detailed props below:
    value(required)            Purpose: v-model prop from parent component
    label(optional)            Purpose: Select Title/Label
    helper_txt(optional)    Purpose: Provide additional help text for the user
    light_theme(optional)  Purpose: backgroung color for input field
                            Options: true or false - default value for prop is True (which applies the white color)
    select_id(required)     Purpose: Any string in order to avoid duplicated id in different select group
    options(required)      Purpose: Array containing the options to be populated into the checkboxes, for example:
    [
        {'label': 'This is the 1st option', 'value': 'This is the 1st option'},
        {'label': 'This is the 2nd option', 'value': 'This is the 2nd option'},
    ]
    placeholder(optional)  Purpose: Provide a placeholder help text inside select menu
    disabled(optional)      Purpose: Disable select menu
    */
    props: {
        value: {type: String, required: true},
        label: {type: String, default: ''},
        helper_text: {type: String, default: ''},
        light_theme: {type: Boolean, default: true},
        select_id: {required: true},
        options: {type: Array, required: true},
        placeholder: {type: String, default: ''},
        disabled: {type: Boolean, default: false},
        mandatory: {type: Boolean, default: false},
        invalid: {type: Boolean, default: false}
    },
    template: `
        <div class="bx--form-item">
            <div class="bx--select" :class="{ 'bx--select--light': light_theme }" style="width: 100%">
                <label :for="select_id" class="bx--label" :class="{ 'red-asterisk-req': mandatory }">{{ label }}&nbsp;</label>
                <div v-if="helper_text" class="bx--form__helper-text">{{ helper_text }}</div>
                <div class="bx--select-input__wrapper" style="width: 100%;margin-bottom: 0.5rem;">
                    <select class="bx--select-input" style="width: 100%"
                            :id="select_id"
                            :value="value"
                            @change="$emit('input', $event.target.value)"
                            :data-invalid="invalid"
                            :disabled="disabled">
                        <option class="bx--select-option" value="" selected hidden>
                            {{ placeholder }}
                        </option>
                        <template v-for="code in options">
                            <option v-if="value==Object.keys(code)[0]" class="bx--select-option" :value="Object.keys(code)[0]" selected>{{Object.values(code)[0]}}</option>
                            <option v-else class="bx--select-option" :value="Object.keys(code)[0]">{{Object.values(code)[0]}}</option>
                        </template>
                    </select>
                    <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;"
                         xmlns="http://www.w3.org/2000/svg" class="bx--select__arrow" width="16" height="16" viewBox="0 0 16 16"
                         aria-hidden="true">
                        <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
                    </svg>
                </div>
            </div>
        </div>
    `
};


export var select_common = {
    /*
    Stardard select menu. See the detailed props below:

    value(required)	        Purpose: v-model prop from parent component

    label(optional)	        Purpose: Select Title/Label

    helper_txt(optional)    Purpose: Provide additional help text for the user

    light_theme(optional)	Purpose: backgroung color for input field
                            Options: true or false - default value for prop is True (which applies the white color)

    select_id(required)     Purpose: Any string in order to avoid duplicated id in different select group

    options(required)	    Purpose: Array containing the options to be populated into the checkboxes, for example:
    [
        {'label': 'This is the 1st option', 'value': 'This is the 1st option'},
        {'label': 'This is the 2nd option', 'value': 'This is the 2nd option'},
    ]

    placeholder(optional)	Purpose: Provide a placeholder help text inside select menu

    disabled(optional)      Purpose: Disable select menu
    */
    props: {
        value: {type: String, required: true},
        label: {type: String, default: ''},
        helper_text: {type: String, default: ''},
        light_theme: {type: Boolean, default: true},
        select_id: {type: String, required: true},
        options: {type: Array, required: true},
        placeholder: {type: String, default: ''},
        disabled: {type: Boolean, default: false},
        select_custom_style: {type: String, default: ''},
        invalid: {type: Boolean, default: false},
        mandatory: {type: Boolean, default: false},
        invalid_msg: {type: String, default: 'Invalid value'},
    },
    template: `
        <div class="bx--form-item">
            <div class="bx--select" :class="{ 'bx--select--light': light_theme }" style="width: 100%">
                <label :for="select_id" class="bx--label" :class="{ 'red-asterisk-req': mandatory }">{{ label }}&nbsp;</label>
                <div v-show="helper_text" class="bx--form__helper-text">{{ helper_text }}</div>
                <div class="bx--select-input__wrapper" :data-invalid="invalid" style="width: 100%">
                    <select class="bx--select-input" style="width: 100%" :style="select_custom_style"
                            :id="select_id"
                            :value="value"
                            @change="$emit('input', $event.target.value)"
                            :disabled="disabled"
                            :class="{ 'bx--text-input--invalid' : invalid }">
                        <option class="bx--select-option" value="" hidden>
                            {{ placeholder }}
                        </option>
                        <option v-for="option in options" class="bx--select-option" :value="option.value" :selected="option.value==value">
                            {{ option.text }}
                        </option>
                    </select>
                    <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;"
                         xmlns="http://www.w3.org/2000/svg" class="bx--select__arrow" width="16" height="16" viewBox="0 0 16 16"
                         aria-hidden="true">
                        <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
                    </svg>
                </div>
                <div class="bx--form-requirement" style="position: absolute;margin-top: 4.2rem;">
                    {{ invalid_msg }}
                </div>
            </div>
        </div>
    `
};

export var select_country = {
    /*
    Stardard select menu. See the detailed props below:

    value(required)	        Purpose: v-model prop from parent component

    label(optional)	        Purpose: Select Title/Label

    helper_txt(optional)    Purpose: Provide additional help text for the user

    light_theme(optional)	Purpose: backgroung color for input field
                            Options: true or false - default value for prop is True (which applies the white color)

    select_id(required)     Purpose: Any string in order to avoid duplicated id in different select group

    options(required)	    Purpose: Array containing the options to be populated into the checkboxes, for example:
    [
        {'label': 'This is the 1st option', 'value': 'This is the 1st option'},
        {'label': 'This is the 2nd option', 'value': 'This is the 2nd option'},
    ]

    placeholder(optional)	Purpose: Provide a placeholder help text inside select menu

    disabled(optional)      Purpose: Disable select menu
    */
    props: {
        value: {type: String, required: true},
        label: {type: String, default: ''},
        helper_text: {type: String, default: ''},
        light_theme: {type: Boolean, default: true},
        select_id: {required: true},
        options: {type: Array, required: true},
        placeholder: {type: String, default: ''},
        disabled: {type: Boolean, default: false}
    },
    template: `
        <div class="bx--form-item">
            <div class="bx--select" :class="{ 'bx--select--light': light_theme }" style="width: 100%">
                <label :for="select_id" class="bx--label">{{ label }}</label>
                <div v-if="helper_text" class="bx--form__helper-text">{{ helper_text }}</div>
                <div class="bx--select-input__wrapper" style="width: 100%;margin-bottom: 0.5rem;">
                    <select class="bx--select-input" style="width: 100%"
                            :id="select_id"
                            :value="value"
                            @change="$emit('input', $event.target.value)"
                            :disabled="disabled">
                        <option class="bx--select-option" value="" selected hidden>
                            {{ placeholder }}
                        </option>
                        <template v-for="code in options">
                            <option class="bx--select-option" :value="code.value">{{ code.text }}</option>
                        </template>
                    </select>
                    <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;"
                         xmlns="http://www.w3.org/2000/svg" class="bx--select__arrow" width="16" height="16" viewBox="0 0 16 16"
                         aria-hidden="true">
                        <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
                    </svg>
                </div>
            </div>
        </div>
    `
};