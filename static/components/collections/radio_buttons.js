import * as Utils from "/static/components/util/common.js";

export var radio_buttons_vertical = {
    props: {
        value: {type: String, required: true},
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
        wrapText: Utils.util_tool.wrap_text,
    },
    template: `
    <div class="ds-input-container ds-mar-b-2">
        <label v-if="label" :id="aria_labelledby" class="ds-input-label" v-bind:class="{ 'red-asterisk-req' : mandatory }"> {{ label }}
            <span v-if="tooltip" class="ds-tooltip" id="tooltip">
                <span class="ds-icon-help ds-tooltip-trigger" role="button" aria-label="help" tabindex="0"></span>
                <span v-html="wrapText(tooltip)" class="ds-tooltip-content" data-position="bottom">{{ wrapText(tooltip) }}</span>
            </span>         
        </label>
        <label v-else :id="aria_labelledby" class="ds-input-label">&nbsp;</label>
        <div class="ds-input-radio-group" role="group" :aria-labelledby="aria_labelledby">
            <div v-for="option in options" class="ds-input-radio">
                <input type="radio" v-bind:name="group_id" class="ds-input" v-bind:id="group_id + option.value" v-bind:value="option.value"
                    v-on:input="$emit('input', $event.target.value)" 
                    v-bind:class="{'ds-disabled' : readonly}" :disabled="readonly" :checked="option.value == value">
                <div class="ds-input-control" v-bind:style="warning ? 'background-color: #fdf0bf;' : ''"></div>
                <label v-bind:for="group_id + option.value">{{ option.text }}</label>
            </div>
        </div>
        <p v-if="warning" class="ds-input-msg ds-warning" id="input-warning-validation">Mandatory</p>
    </div>
    `
};

export var radio_buttons_horizontal = {
    props: {
        value: {type: String, required: true},
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
        <div class="ds-input-radio-group ds-flex" role="group" :aria-labelledby="aria_labelledby">
            <div v-for="option in options" class="ds-input-radio ds-mar-r-2">
                <input type="radio" v-bind:name="group_id" class="ds-input" v-bind:id="group_id + option.value" v-bind:value="option.value" 
                    v-on:input="$emit('input', $event.target.value)" 
                    v-bind:class="{'ds-disabled' : readonly}" :disabled="readonly" :checked="option.value == value">
                <div class="ds-input-control" v-bind:style="warning ? 'background-color: #fdf0bf;' : ''"></div>
                <label v-bind:for="group_id + option.value">{{ option.text }}</label>
            </div>
        </div>
        <p v-if="warning" class="ds-input-msg ds-warning" id="input-warning-validation">Mandatory</p>
    </div>
    `
};