export var notification_info = {
    props: {
        title: {type: String, required: true},
        subtitle: {type: String, required: true}
    },
    template: `
        <div data-notification
          class="bx--inline-notification bx--inline-notification--info bx--inline-notification--low-contrast"
          role="alert">
          <div class="bx--inline-notification__details">
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--inline-notification__icon" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,16,7Zm4,17.12H12V21.88h2.88V15.12H13V12.88h4.13v9H20Z"></path></svg>
            <div class="bx--inline-notification__text-wrapper">
              <p class="bx--inline-notification__title bx--font-size-title">{{ title }}</p>
              <p class="bx--inline-notification__subtitle bx--font-size-p" v-html="subtitle">    </p>
            </div>
          </div>
          <button data-notification-btn class="bx--inline-notification__close-button" type="button"
            aria-label="close">
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--inline-notification__close-icon" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"></path></svg>
          </button>
        </div>
    `
};

export var notification_toast = {
    props: {
        show: {type: Boolean, default: false},
        type: {type: String, default: 'info'},
        title: {type: String, required: true},
        subtitle: {type: String, required: true},
        is_wider: {type: Boolean, default: false},
        print_timestamp: {type: Boolean, default: true},
        show_close_btn: {type: Boolean, default: true},
        low_contrast: {type: Boolean, default: false},

        // toast_type: {type: Boolean, default: true} // true == bx--toast-notification--low-contrast,
                                                   // false == disable(bx--toast-notification--low-contrast)
    },
    watch:{
        type: function () {
            this.setTimeStamp();
        },
    },
    methods: {
        setTimeStamp() {
            let date = new Date();
            return date.toLocaleString()
        },
    },
    template: `
        <div v-if="show"
          class="bx--toast-notification"
          :class="{'bx--toast-notification--info': type === 'info',
                   'bx--toast-notification--error': type === 'error',
                   'bx--toast-notification--success': type === 'success',
                   'bx--toast-notification--warning': type === 'warning',
                   'bx--toast-notification--low-contrast': low_contrast}"
          style="position: fixed; top: 4rem; right: .5rem; z-index: 50"
          :style="is_wider ? 'width: 29rem;' : ''"
          role="alert">
        <div v-if="type === 'info'" data-inline-loading-spinner class="bx--loading bx--loading--small" style="margin-left: -.7rem;margin-top: .3rem; width: 2.5rem; height: 2.5rem;margin-right: .3rem;">
          <svg class="bx--loading__svg" viewBox="-75 -75 150 150">
            <circle class="bx--loading__background" cx="0" cy="0" r="26.8125" />
            <circle class="bx--loading__stroke" cx="0" cy="0" r="26.8125"/>
          </svg>
        </div>
<!--          <svg v-if="type === 'info'" focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx&#45;&#45;toast-notification__icon" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,16,7Zm4,17.12H12V21.88h2.88V15.12H13V12.88h4.13v9H20Z"></path></svg>-->
          <svg v-if="type === 'error'" focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--toast-notification__icon" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M10,1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S15,1,10,1z M13.5,14.5l-8-8l1-1l8,8L13.5,14.5z"></path><path d="M13.5,14.5l-8-8l1-1l8,8L13.5,14.5z" data-icon-path="inner-path" opacity="0"></path></svg>
          <svg v-if="type === 'success'" focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--toast-notification__icon" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M10,1c-4.9,0-9,4.1-9,9s4.1,9,9,9s9-4,9-9S15,1,10,1z M8.7,13.5l-3.2-3.2l1-1l2.2,2.2l4.8-4.8l1,1L8.7,13.5z"></path><path fill="none" d="M8.7,13.5l-3.2-3.2l1-1l2.2,2.2l4.8-4.8l1,1L8.7,13.5z" data-icon-path="inner-path" opacity="0"></path></svg>
          <svg v-if="type === 'warning'" focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--toast-notification__icon" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M10,1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S15,1,10,1z M9.2,5h1.5v7H9.2V5z M10,16c-0.6,0-1-0.4-1-1s0.4-1,1-1\ts1,0.4,1,1S10.6,16,10,16z"></path><path d="M9.2,5h1.5v7H9.2V5z M10,16c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S10.6,16,10,16z" data-icon-path="inner-path" opacity="0"></path></svg>
          <div class="bx--toast-notification__details" :style="is_wider ? 'margin-right: 3.3rem;' : ''">
            <h3 class="bx--toast-notification__title">{{ title }}</h3>
            <p class="bx--toast-notification__subtitle">{{ subtitle }}</p>
            <p v-if="print_timestamp" class="bx--toast-notification__caption">{{ this.setTimeStamp() }}</p>
          </div>
          <button v-if="show_close_btn" class="bx--toast-notification__close-button" type="button"
            aria-label="close" @click="$emit('close-toast')">
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--toast-notification__close-icon" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"></path></svg>
          </button>
        </div>
    `
};