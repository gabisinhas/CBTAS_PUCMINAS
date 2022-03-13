import * as Utils from "/static/components/util/common.js";

export var checkbox_vertical = {
    data() {
        return {
            checked: []
        }
    },
    props: {
        value: {type: String, required: true},
        label: {type: String, default: ''},
        helper_text: {type: String, default: ''},
        light_theme: {type: Boolean, default: true},
        group_id: {required: true},
        options: {type: Array, required: true},
        placeholder: {type: String, default: ''},
        disabled: {type: Boolean, default: false},
        invalid: {type: Boolean, default: false},
        mandatory: {type: Boolean, default: false},
        invalid_msg: {type: String, default: 'Invalid value'}
    },
    methods: {
        selectedOptions() {
            this.$emit('input-checkbox', this.checked)
        },
        wrapText: Utils.util_tool.wrap_text,
    },
    template: `
    <div class="ds-input-container ds-mar-b-0">
        <label v-if="label" :id="aria_labelledby" class="ds-input-label" v-bind:class="{ 'red-asterisk-req' : mandatory }"> {{ label }}
            <span v-if="tooltip" class="ds-tooltip" id="tooltip">
                <span class="ds-icon-help ds-tooltip-trigger" role="button" aria-label="help" tabindex="0"></span>
                <span v-html="wrapText(tooltip)" class="ds-tooltip-content" data-position="bottom">{{ wrapText(tooltip) }}</span>
            </span>          
        </label>
        <label v-else :id="aria_labelledby" class="ds-input-label">&nbsp;</label>
        <div class="ds-input-checkbox-group" role="group" :aria-labelledby="aria_labelledby">
            <div v-for="option in options" class="ds-input-checkbox">
                <input type="checkbox" class="ds-input" v-bind:id="group_id + option.value" v-bind:value="option.value" v-model="checked"
                    @change="selectedOptions" v-bind:class="{'ds-disabled' : readonly}" :disabled="readonly">
                <div class="ds-input-control" v-bind:style="warning ? 'background-color: #fdf0bf;' : ''"></div>
                <label v-bind:for="group_id + option.value">{{ option.text }}</label>
            </div>
        </div>
        <p v-if="warning" class="ds-input-msg ds-warning" id="input-warning-validation">Mandatory</p>
    </div>
    `
};

export var checkbox_horizontal = {
    data() {
        return {
            checked: []
        }
    },
    props: {
        options: {type: Array, required: true},
        group_id: {type: String, required: true},
        label: {type: String, default: ''},
        mandatory: {type: Boolean, default: false},
        warning: {type: Boolean, default: false},
        readonly: {type: Boolean, default: false},
        aria_labelledby: {type: String, required: true},
        tooltip: {type: String, default: ''}
    },
    methods: {
        selectedOptions() {
            this.$emit('input', this.checked)
        },
        wrapText: Utils.util_tool.wrap_text,
    },
    template: `
    <div class="ds-input-container ds-mar-b-0">
        <label v-if="label" :id="aria_labelledby" class="ds-input-label" v-bind:class="{ 'red-asterisk-req' : mandatory }"> {{ label }}
            <span v-if="tooltip" class="ds-tooltip" id="tooltip">
                <span class="ds-icon-help ds-tooltip-trigger" role="button" aria-label="help" tabindex="0"></span>
                <span v-html="wrapText(tooltip)" class="ds-tooltip-content" data-position="bottom">{{ wrapText(tooltip) }}</span>
            </span>          
        </label>
        <label v-else :id="aria_labelledby" class="ds-input-label">&nbsp;</label>
        <div class="ds-input-checkbox-group ds-flex" role="group" :aria-labelledby="aria_labelledby">
            <div v-for="option in options" class="ds-input-checkbox ds-mar-r-2">
                <input type="checkbox" class="ds-input" v-bind:id="group_id + option.value" v-bind:value="option.value" v-model="checked"
                @change="selectedOptions" v-bind:class="{'ds-disabled' : readonly}" :disabled="readonly">
                <div class="ds-input-control" v-bind:style="warning ? 'background-color: #fdf0bf;' : ''"></div>
                <label v-bind:for="group_id + option.value">{{ option.text }}</label>
            </div>
        </div>
        <p v-if="warning" class="ds-input-msg ds-warning" id="input-warning-validation">Mandatory</p>
    </div>
    `
};