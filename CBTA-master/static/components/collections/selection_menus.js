import * as Utils from "/static/components/util/common.js";

export var select_menu = {
    props: {
        value: {type: String, required: true},
        select_id: {type: String, required: true},
        options: {type: Array, required: true},
        label: {type: String, default: ''},
        mandatory: {type: Boolean, default: false},
        warning: {type: Boolean, default: false},
        readonly: {type: Boolean, default: false},
        aria_label: {type: String, default: ''},
        tooltip: {type: String, default: ''},
        no_label: {type: Boolean, default: false}
    },
    methods: {
        wrapText: Utils.util_tool.wrap_text,
    },
    template: `
    <div>
        <div v-if="!no_label">
            <label v-if="label" for="input_text" v-bind:class="{ 'red-asterisk-req' : mandatory }" class="ds-input-label">{{ label }}
                <span v-if="tooltip" class="ds-tooltip" id="tooltip">
                    <span class="ds-icon-help ds-tooltip-trigger" role="button" aria-label="help" tabindex="0"></span>
                    <span v-html="wrapText(tooltip)" class="ds-tooltip-content" data-position="bottom">{{ wrapText(tooltip) }}</span>
                </span>
            </label>
            <label v-else class="ds-input-label" :aria-label="aria_label">&nbsp;</label>
        </div>
        <div class="ds-select ds-pad-l-0 ds-pad-r-0 ds-text-align-center" v-bind:class="{ 'ds-disabled' : readonly }">
            <select v-bind:value="value" :id="select_id" v-on:change="$emit('input', $event.target.value)" :disabled="readonly">
                <option v-for="option in options" v-bind:value="option.value">
                    {{ option.text }}
                </option>
            </select>
        </div>
        <p v-if="warning" class="ds-input-msg ds-warning" id="input-warning-validation">Mandatory</p>
    </div>
    `
};

export var select_menu_align_center = {
    props: {
        value: {type: String, required: true},
        select_id: {type: String, required: true},
        options: {type: Array, required: true},
        label: {type: String, default: ''},
        mandatory: {type: Boolean, default: false},
        warning: {type: Boolean, default: false},
        readonly: {type: Boolean, default: false},
        aria_label: {type: String, default: ''},
        tooltip: {type: String, default: ''},
        no_label: {type: Boolean, default: false}
    },
    methods: {
        wrapText: Utils.util_tool.wrap_text,
    },
    template: `
    <div>
        <div v-if="!no_label">
            <label v-if="label" for="input_text" v-bind:class="{ 'red-asterisk-req' : mandatory }" class="ds-input-label">{{ label }}
                <span v-if="tooltip" class="ds-tooltip" id="tooltip">
                    <span class="ds-icon-help ds-tooltip-trigger" role="button" aria-label="help" tabindex="0"></span>
                    <span v-html="wrapText(tooltip)" class="ds-tooltip-content" data-position="bottom">{{ wrapText(tooltip) }}</span>
                </span>
            </label>
            <label v-else class="ds-input-label" :aria-label="aria_label">&nbsp;</label>
        </div>
        <div class="ds-select ds-pad-l-0 ds-pad-r-0 ds-text-align-center ds-bg-neutral-1" v-bind:class="{ 'ds-disabled' : readonly }">
            <select class="ds-text-align-center" v-bind:value="value" :id="select_id" v-on:change="$emit('input', $event.target.value)" :disabled="readonly">
                <option v-for="option in options" v-bind:value="option.value">
                    {{ option.text }}
                </option>
            </select>
        </div>
        <p v-if="warning" class="ds-input-msg ds-warning" id="input-warning-validation">Mandatory</p>
    </div>
    `
};