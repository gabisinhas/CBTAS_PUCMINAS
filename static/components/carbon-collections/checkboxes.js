export var checkbox_standard = {
    props:{
        value: {type: Array, required: true},
        options: {type: Array, required: true},
        group_id: {type: String, required: true},
        label: {type: String, default: ''},
        mandatory: {type: Boolean, default: false},
        warning: {type: Boolean, default: false},
        readonly: {type: Boolean, default: false},
        aria_labelledby: {type: String, required: true},
        tooltip: {type: String, default: ''},
    },
    watch:{
        value: function () {
            this.list_selected_values = this.value;
        },
    },
    data(){
        return {
            list_selected_values: []
        }
    },
    methods: {
        selectedOptions() {
            this.$emit('input', this.list_selected_values)
        },
    },
    template: `
        <fieldset class="bx--fieldset">
          <legend class="bx--label" v-bind:class="{ 'red-asterisk-req' : mandatory }" >{{ label }}&nbsp;</legend>
          <!-- input + label -->
          <div class="bx--form-item bx--checkbox-wrapper" v-for="item in options">
            <input
                v-model="list_selected_values"
                :id="group_id + item.value"
                :class="{'bx--checkbox-mandatory': warning, 'bx--checkbox': !warning}"
                type="checkbox"
                :value="item.value"
                :name="group_id"
                @change="selectedOptions()"
                tabindex="0">
            <label :for="group_id + item.value" :class="{'bx--checkbox-label-mandatory': warning, 'bx--checkbox-label': !warning}">
              <span class="bx--checkbox-appearance">
                <svg class="bx--checkbox" width="12" height="9" viewBox="0 0 12 9" fill-rule="evenodd">
                  <path d="M4.1 6.1L1.4 3.4 0 4.9 4.1 9l7.6-7.6L10.3 0z"></path>
                </svg>
              </span>
              {{ item.text }}
            </label>
          </div>
        </fieldset>
    `
}


export var checkbox_single = {
    /*
    Single Checkbox Option. See the detailed props below:

    value(required)	            Purpose: v-model prop from parent component

    checkbox_id(required)       Purpose: Any string in order to avoid duplicated id in different checkbox group

    checkbox_label(optional)    Purpose: Optional top label for the checkbox "group"

    option_label(required)      Purpose: Label for the checkbox option

    disabled(optional)          Purpose: Disable option
    */
    props: {
        value: {type: Boolean, required: true},
        checkbox_id: {type: String, required: true},
        checkbox_label: {type: String, default: ''},
        option_label: {type: String, required: true},
        disabled: {type: Boolean, default: false},
        warning: {type: Boolean, default: false}
    },
    template: `
        <fieldset class="bx--fieldset">
            <legend class="bx--label">{{ checkbox_label }}</legend>
            <div class="bx--form-item bx--checkbox-wrapper">
                    <input :id="checkbox_id" :class="{'bx--checkbox-mandatory': warning, 'bx--checkbox': !warning}" type="checkbox" name="checkbox"
                           :checked="value"
                           @change="$emit('input', $event.target.checked)"
                           :disabled="disabled" style="margin-right: 48px; background-color: #fdf0bf;"
                           >
                <label :for="checkbox_id" :class="{'bx--checkbox-label-mandatory': warning, 'bx--checkbox-label': !warning}" style="padding-left: 28px;">{{ option_label }}</label>
            </div>
        </fieldset>
    `
};