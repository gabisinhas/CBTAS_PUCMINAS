export var help_overlay =
    {
        props: {
            value: {type: String},
            id: {type: String, required: true},
            title: {type: String, required: true},
            text: {type: String, required: true},
            aria_label: {type: String, required: true}
        },
        template: `
        <div>
            <div class="ds-col-md-8 ds-offset-md-2 ds-col-lg-6 ds-offset-lg-3">
                <button class="ds-icon-medium ds-icon-help ds-icon-button-dark"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
                :data-element="id"
                ></button>
            </div>
            <div class="ds-overlay-container toggle-me-3">
                <div class="ds-overlay" :id="id" aria-hidden="false" role="dialog" :aria-label="aria_label">
                    <div class="ds-overlay-box ds-col-8 ds-offset-2 ds-pad-2 ds-bg-neutral-1 ds-text-align-center">
                        <div class="ds-row ds-overlay-content">
                            <div class="ds-col-xs-10">
                                <h4 class="ds-heading-4 ds-font-weight-bold">{{ title }}</h4>
                                <p> {{ text }} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    };

export var process_status_overlay =
    {
        props: {
            value: {type: String},
            message: {type: String, default: ''},
            type: {type: String, default: 'ds-bg-contextual-neutral-1'},
        },
        methods: {
            setBackgroundColor(type) {
                if (type == 'warning') {
                    return 'ds-bg-contextual-yellow-1'
                } else if (type == 'error') {
                    return 'ds-bg-contextual-red-1'
                } else if (type == 'success') {
                    return 'ds-bg-contextual-green-1'
                } else {
                    return 'ds-bg-contextual-neutral-1'
                }
            }
        },
        template: `
        <div>
            <div class="ds-col-5 ds-text-align-center ds-fade-in" style="position: absolute; top: 35%; left: 30%;">
                <div class="ds-panel ds-panel-floating" v-bind:class="setBackgroundColor(type)">
                    <div class="ds-panel-container">
                        <div class="ds-row ds-pad-b-3">
                            <div class="ds-col-1 ds-float-right">
                                <button v-if="message" class="ds-icon-medium ds-icon-close ds-icon-button-neutral" aria-label="Close Button"
                                        v-bind:value="value"
                                        v-on:input="$emit('input', $event.target.value)"
                                ></button>
                            </div>
                        </div>
                        <div class="ds-row ds-pad-t-1 ds-pad-b-5">
                            <div class="ds-col-12">
                                <div v-if="!message"  class="ds-loader-container ds-loader-blue">
                                    <div class="ds-loader-header">Please wait...</div>
                                    <div class="ds-loader ds-loader" role="alert" aria-busy="true" aria-label="Processing"></div>
                                </div>
                                <div v-else>
                                    <p class="ds-pad-t-1 ds-pad-b-0_5" style="height: 3rem">{{ message }}</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    };

export var decision_overlay =
    {
        props: {
            value_close: {type: String},
            value_yes: {type: String},
            value_no: {type: String},
            message: {type: String, default: ''},
            decision: {type: Boolean, default: false},
            type: {type: String, default: 'ds-bg-contextual-neutral-1'},
        },
        methods: {
            setBackgroundColor(type) {
                if (type == 'warning') {
                    return 'ds-bg-contextual-yellow-1'
                } else if (type == 'error') {
                    return 'ds-bg-contextual-red-1'
                } else if (type == 'success') {
                    return 'ds-bg-contextual-green-1'
                } else {
                    return 'ds-bg-contextual-neutral-1'
                }
            },
            closeButton(){
                this.$emit('close-button');
            },
            clickYesButton() {
                this.$emit('click-yes-button');
            },
            clickNoButton() {
                this.$emit('click-no-button');
            },
        },
        template: `
        <div>
            <div class="ds-col-5 ds-text-align-center ds-fade-in" style="position: absolute; top: 35%; left: 30%;">
                <div class="ds-panel ds-panel-floating" v-bind:class="setBackgroundColor(type)">
                    <div class="ds-panel-container" style="height: 300px">
                        <div class="ds-row ds-pad-b-2">
                            <div class="ds-col-1 ds-float-right">
                                <button v-if="message" class="ds-icon-medium ds-icon-close ds-icon-button-neutral" aria-label="Close Button"
                                    v-bind:value="value_close" @click="closeButton"
                                ></button>
                            </div>
                        </div>
                        <div v-if="!message" class="ds-row ds-pad-t-3 ds-pad-b-3">
                            <div class="ds-col-12">
                                <div class="ds-loader-container ds-loader-blue">
                                    <div class="ds-loader-header">Please wait...</div>
                                    <div class="ds-loader ds-loader" role="alert" aria-busy="true" aria-label="Processing"></div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="ds-row ds-pad-b-2 ds-pad-t-1">
                            <p v-bind:class="{ 'ds-pad-t-2_5' : !decision }">{{ message }}</p></div>
                            <div v-if="decision">
                                <div class="ds-col-2">
                                    <button class="ds-button custom-secondary-button" v-bind:value="value_no" @click="clickNoButton"> No</button>
                                </div>
                                <div class="ds-col-2">
                                    <button class="ds-button custom-primary-button" v-bind:value="value_yes" @click="clickYesButton">Yes</button>                                          
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    };