import * as Utils from "/static/components/util/common.js";

export var input_text = {
    props: {
        value: {type: String, required: true},
        label: {type: String, default: ''},
        mandatory: {type: Boolean, default: false},
        warning: {type: Boolean, default: false},
        readonly: {type: Boolean, default: false},
        placeholder: {type: String, default: ''},
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
            <input type="text" class="ds-input" 
                v-bind:value="value" 
                v-on:input="$emit('input', $event.target.value)"
                v-bind:class="{ 'ds-warning' : warning, 'ds-disabled' : readonly }" 
                :readonly="readonly"
                :placeholder="placeholder"
                >
        <p v-if="warning" class="ds-input-msg ds-warning" id="input-warning-validation">Mandatory</p>
    </div>
    `
};

export var input_text_set_warning_msg = {
    props: {
        value: {type: String, required: true},
        label: {type: String, default: ''},
        mandatory: {type: Boolean, default: false},
        warning: {type: Boolean, default: false},
        warning_msg: {type: String, default: ''},
        readonly: {type: Boolean, default: false},
        placeholder: {type: String, default: ''},
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
            <input type="text" class="ds-input" 
                v-bind:value="value" 
                v-on:input="$emit('input', $event.target.value)"
                v-bind:class="{ 'ds-warning' : warning, 'ds-disabled' : readonly }" 
                :readonly="readonly"
                :placeholder="placeholder"
                >
        <p v-if="warning_msg" class="ds-input-msg ds-warning" id="input-warning-validation">{{ warning_msg }}</p>
    </div>
    `
};

export var input_text_align_center = {
    props: {
        value: {type: String, required: true},
        label: {type: String, default: ''},
        mandatory: {type: Boolean, default: false},
        warning: {type: Boolean, default: false},
        readonly: {type: Boolean, default: false},
        placeholder: {type: String, default: ''},
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
            <input type="text" class="ds-input ds-text-align-center" 
                v-bind:value="value" 
                v-on:input="$emit('input', $event.target.value)"
                v-bind:class="{ 'ds-warning' : warning, 'ds-disabled' : readonly }" 
                :readonly="readonly"
                :placeholder="placeholder"
                >
        <p v-if="warning" class="ds-input-msg ds-warning" id="input-warning-validation">Mandatory</p>
    </div>
    `
};

export var input_search = {
    props: {
        value: {type: String, required: true},
        warning: {type: Boolean, default: false},
        readonly: {type: Boolean, default: false},
        placeholder: {type: String, default: ''},
        aria_label: {type: String, default: ''},
    },
    methods: {
        wrapText: Utils.util_tool.wrap_text,
    },
    template: `
    <div>
        <input type="text" class="ds-input ds-pad-r-2_5" 
            v-bind:value="value" 
            v-on:input="$emit('input', $event.target.value)"
            v-bind:class="{ 'ds-warning' : warning, 'ds-disabled' : readonly }" 
            :readonly="readonly"
            :placeholder="placeholder"
            >
        <p v-if="warning" class="ds-input-msg ds-warning" id="input-warning-validation">Please include some value</p>
    </div>
    `
};

export var text_area = {
    props: {
        value: {type: String, required: true},
        label: {type: String, default: ''},
        mandatory: {type: Boolean, default: false},
        warning: {type: Boolean, default: false},
        readonly: {type: Boolean, default: false},
        placeholder: {type: String, default: ''},
        aria_label: {type: String, default: ''},
        tooltip: {type: String, default: ''},
    },
    methods: {
        wrapText: Utils.util_tool.wrap_text,
    },
    template: `
    <div>
        <label v-if="label" for="input_text" v-bind:class="{ 'red-asterisk-req' : mandatory }" class="ds-input-label">{{ label }}
            <span v-if="tooltip" class="ds-tooltip" id="tooltip">
                <span class="ds-icon-help ds-tooltip-trigger" role="button" aria-label="help" tabindex="0"></span>
                <span v-html="wrapText(tooltip)" class="ds-tooltip-content" data-position="bottom">{{ wrapText(tooltip) }}</span>
            </span>        
        </label>
        <label v-else class="ds-input-label" :aria-label="aria_label">&nbsp;</label>
            <textarea class="ds-input"
                v-bind:value="value" 
                v-on:input="$emit('input', $event.target.value)" 
                v-bind:class="{ 'ds-warning' : warning, 'ds-disabled' : readonly }" 
                :readonly="readonly"
                :placeholder="placeholder"
                ></textarea>
        <p v-if="warning" class="ds-input-msg ds-warning" id="input-warning-validation">Mandatory</p>
    </div>
    `
};

export var input_date = {
    props: {
        value: {type: String, required: true},
        label: {type: String, default: ''},
        mandatory: {type: Boolean, default: false},
        warning: {type: Boolean, default: false},
        readonly: {type: Boolean, default: false},
        aria_label: {type: String, default: ''},
        tooltip: {type: String, default: ''},
        custom_message: {type: String, default: ''},
        no_label: {type: Boolean, default: false}
    },
     data: function () {
       return {
         message: 'Mandatory'
       }
     },
    methods: {
        wrapText: Utils.util_tool.wrap_text,
    },
    watch: {
      custom_message: function (val) {
        this.message = val;
      }
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
            <input type="date" class="ds-input"
                v-bind:value="value" 
                v-on:input="$emit('input', $event.target.value)" 
                v-bind:class="{ 'ds-warning' : warning, 'ds-disabled' : readonly }" 
                :readonly="readonly"
                >
        <p v-if="warning" class="ds-input-msg ds-warning" id="input-warning-validation">{{message}}</p>
    </div>
    `
};

export var input_date_align_center = {
    props: {
        value: {type: String, required: true},
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
            <input type="date" class="ds-input ds-text-align-center"
                v-bind:value="value" 
                v-on:input="$emit('input', $event.target.value)" 
                v-bind:class="{ 'ds-warning' : warning, 'ds-disabled' : readonly }" 
                :readonly="readonly"
                >
        <p v-if="warning" class="ds-input-msg ds-warning" id="input-warning-validation">Mandatory</p>
    </div>
    `
};

export var input_time = {
    props: {
        value: {type: String, required: true},
        label: {type: String, default: ''},
        mandatory: {type: Boolean, default: false},
        warning: {type: Boolean, default: false},
        readonly: {type: Boolean, default: false},
        aria_label: {type: String, default: ''},
        tooltip: {type: String, default: ''}
    },
    methods: {
        wrapText: Utils.util_tool.wrap_text,
    },
    template: `
    <div>
        <label v-if="label" for="input_text" v-bind:class="{ 'red-asterisk-req' : mandatory }" class="ds-input-label">{{ label }}
            <span v-if="tooltip" class="ds-tooltip" id="tooltip">
                <span class="ds-icon-help ds-tooltip-trigger" role="button" aria-label="help" tabindex="0"></span>
                <span v-html="wrapText(tooltip)" class="ds-tooltip-content" data-position="bottom">{{ wrapText(tooltip) }}</span>
            </span>             
        </label>   
        <label v-else class="ds-input-label" :aria-label="aria_label">&nbsp;</label>
            <input type="time" class="ds-input"
                v-bind:value="value" 
                v-on:input="$emit('input', $event.target.value)" 
                v-bind:class="{ 'ds-warning' : warning, 'ds-disabled' : readonly }" 
                :readonly="readonly"
                >
        <p v-if="warning" class="ds-input-msg ds-warning" id="input-warning-validation">Mandatory</p>
    </div>
    `
};
