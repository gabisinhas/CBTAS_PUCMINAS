export var alert_overlay =
        {
            props: {
                message_title: {
                    type: String,
                    default: ""
                },
                message: {
                    type: String,
                    default: ""
                },
                message_class: {
                    type: String,
                    required: true
                }
            },
            template: `
            <div class="ds-col-5 ds-text-align-center ds-fade-in" style="position: absolute; top: 40%; left: 30%;">
                <div class="ds-alert ds-text-align-center ds-pad-t-3 ds-pad-b-3" v-bind:class="message_class">
                  <p class="ds-label">{{ message_title }}</p>
                  <p>{{ message }}</p>
                </div>
            </div>    
            `
        };

export var message_custom =
        {
            props: {
                message: {
                    type: String,
                    default: ""
                },
                message_class: {
                    type: String,
                    required: true
                }
            },
            template: `
                <div class="ds-alert ds-text-align-center ds-fade-in" v-bind:class="message_class">
                  <p>{{ message }}</p>
                </div>
            `
        };

export var message_warning =
        {
            props: {
                message: {
                    type: String,
                    default: ""
                }
            },
            template: `
                <div class="ds-alert ds-warning ds-text-align-center"
                style="padding-top: 1rem; padding-bottom: 0.8rem; padding-left: 1rem; padding-right: 1rem">
                  <p><span class="ds-icon-warning-alt"></span>{{ message }}</p>
                </div>
            `
        };

export var message_success =
        {
            props: {
                message: {
                    type: String,
                    default: ""
                }
            },
            template: `
                <div class="ds-alert ds-success ds-text-align-center" 
                style="padding-top: 1rem; padding-bottom: 0.8rem; padding-left: 1rem; padding-right: 1rem">
                    <p><span class="ds-icon-checkmark"></span>{{ message }}</p>
                </div>
            `
        };

export var message_error =
        {
            props: {
                message: {
                    type: String,
                    default: "Something went wrong, please try again"
                }
            },
            template: `
                <div class="ds-alert ds-error ds-text-align-center"
                style="padding-top: 1rem; padding-bottom: 0.8rem; padding-left: 1rem; padding-right: 1rem">
                    <p><span class="ds-icon-warning-alt"></span>{{ message }}</p>
                </div>
            `
        };

export var message_info =
        {
            props: {
                message: {
                    type: String,
                    default: ""
                }
            },
            template: `
                <div class="ds-alert ds-info ds-text-align-center"
                style="padding-top: 1rem; padding-bottom: 0.8rem; padding-left: 1rem; padding-right: 1rem">
                    <p><span class="ds-icon-information"></span>{{ message }}</p>
                </div>
            `
        };

export var message_icon_eye_left =
        {
            props: {
                message: {
                    type: String
                },
                label: {
                    type: String,
                    default: ""
                }
            },
            template: `
            <div class="ds-tooltip ds-hover ds-text-align-center" id="tooltip-help-home">
                <span class="ds-icon-small ds-icon-view ds-text-neutral-5 ds-tooltip-trigger" aria-label="help" tabindex="0">
                </span>
                <div class="ds-tooltip-content ds-light" id="tooltip-help-home" role="tooltip" style="text-transform: lowercase;" v-html="message">
                    {{ message }}
                </div>
                {{ label }}
            </div>
            `
        };