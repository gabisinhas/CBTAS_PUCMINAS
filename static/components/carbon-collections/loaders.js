export var inline_loader = {
    /*
    Small inline loader with label. See the detailed props below:

    messages(required)     Purpose: Bind customized status next to the loader image
    example:
        messages: {
        'loading': 'Generating org chart',
        'success': 'Org chart generated',
        'fail': 'Org chart generation failed'
        'error': 'Please contact system administrator'
    },

    status(optional)      Purpose: Hide and Show the status based on the message prop above (default is 'loading')
    accepted values:
        loading, success or fail
    */
    props: {
        messages: {type: Object, required: true},
        status: {type: String, default: 'loading'}
    },
    template: `
        <div data-inline-loading class="bx--inline-loading" role="alert" aria-live="assertive" v-if="status">
            <div class="bx--inline-loading__animation">
                <div data-inline-loading-spinner class="bx--loading bx--loading--small" :hidden="status != 'loading'"
                     :style="{ 'bx--loading--stop' : status != 'loading'}">
                    <svg class="bx--loading__svg" viewBox="-75 -75 150 150">
                        <circle class="bx--loading__background" cx="0" cy="0" r="66.8125"/>
                        <circle class="bx--loading__stroke" cx="0" cy="0" r="66.8125"/>
                    </svg>
                </div>
                <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform; fill: rgb(92, 168, 49);"
                     xmlns="http://www.w3.org/2000/svg" class="bx--inline-loading__checkmark-container"
                     :hidden="status != 'success'" data-inline-loading-finished="" width="26" height="26" viewBox="0 0 16 16"
                     aria-hidden="true">
                    <path d="M8,1C4.1,1,1,4.1,1,8c0,3.9,3.1,7,7,7s7-3.1,7-7C15,4.1,11.9,1,8,1z M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z"></path>
                    <path d="M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z" data-icon-path="inner-path" opacity="0"></path>
                </svg>
                <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;width: 22px; height: 22px;"
                     xmlns="http://www.w3.org/2000/svg" class="bx--inline-loading--error" :hidden="status != 'error'"
                     data-inline-loading-error="" width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M2,16H2A14,14,0,1,0,16,2,14,14,0,0,0,2,16Zm23.15,7.75L8.25,6.85a12,12,0,0,1,16.9,16.9ZM8.24,25.16A12,12,0,0,1,6.84,8.27L23.73,25.16a12,12,0,0,1-15.49,0Z"></path>
                </svg>
                <svg focusable="false" preserveAspectRatio="xMidYMid meet" :hidden="status != 'fail'" style="will-change: transform;width: 22px; height: 22px; fill: #F1C21B;"
                    xmlns="http://www.w3.org/2000/svg" class="bx--inline-loading--error" fill="currentColor" width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14C30,8.3,23.7,2,16,2z M14.9,8h2.2v11h-2.2V8z M16,25	c-0.8,0-1.5-0.7-1.5-1.5S15.2,22,16,22c0.8,0,1.5,0.7,1.5,1.5S16.8,25,16,25z"></path>
                    <path fill="black" d="M17.5,23.5c0,0.8-0.7,1.5-1.5,1.5c-0.8,0-1.5-0.7-1.5-1.5S15.2,22,16,22	C16.8,22,17.5,22.7,17.5,23.5z M17.1,8h-2.2v11h2.2V8z" data-icon-path="inner-path" opacity="1"></path><title>Warning filled</title>
                </svg>
            </div>
            &nbsp&nbsp
            <p data-inline-loading-text-active :hidden="status != 'loading'"
               class="bx--font-size-p">{{ messages.loading }}</p>
            <p data-inline-loading-text-finished :hidden="status != 'success'"
               class="bx--font-size-p">{{ messages.success }}</p>
            <p data-inline-loading-text-error :hidden="status != 'fail'"
               class="bx--font-size-p">{{ messages.fail }}</p>
            <p data-inline-loading-text-error :hidden="status != 'error'"
               class="bx--font-size-p">{{ messages.error }}</p>
        </div>
    `
};

export var overlay_loader = {
    props: {
        is_visible: {type: Boolean, default: false}
    },
    template: `
        <div v-if="is_visible" class="bx--loading-overlay" style="z-index: 8000;">
            <div data-loading class="bx--loading">
              <svg class="bx--loading__svg" viewBox="-75 -75 150 150">
                <title>Loading</title>
                <circle class="bx--loading__stroke" cx="0" cy="0" r="37.5" />
              </svg>
            </div>
        </div>
    `
};


export var no_overlay_loader = {
    props: {
        is_visible: {type: Boolean, default: false}
    },
    template: `
        <div v-if="is_visible" data-loading class="bx--loading">
          <svg class="bx--loading__svg" viewBox="-75 -75 150 150">
            <title>Loading</title>
            <circle class="bx--loading__stroke" cx="0" cy="0" r="37.5" />
          </svg>
        </div>
    `
};

export var loader_small = {
    props: {
        is_visible: {type: Boolean, default: false}
    },
    template: `
        <div v-if="is_visible" data-loading class="bx--loading">
          <svg class="bx--loading__svg" viewBox="-75 -75 150 150">
            <title>Loading</title>
            <circle class="bx--loading__stroke" cx="0" cy="0" r="37.5" />
          </svg>
        </div>
    `
};