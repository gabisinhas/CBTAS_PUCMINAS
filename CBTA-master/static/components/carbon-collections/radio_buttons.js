export var radio_button_standard = {
    props:{
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
    watch:{
        value: function () {
            this.selected_value = this.value;
        },
    },
    data(){
        return {
            selected_value: ''
        }
    },
    methods: {
        selectedOption() {
            this.$emit('input', this.selected_value);
            console.log(this.selected_value);
        },
    },
    created(){
        this.selected_value = this.value;
    },
    template: `
        <fieldset class="bx--fieldset"">
          <legend class="bx--label" :class="{ 'red-asterisk-req': mandatory }">{{ label }}&nbsp;</legend>
          <div class="bx--form-item">
            <div class="bx--radio-button-group  bx--radio-button-group--vertical">
                <div class="bx--radio-button-wrapper" v-for="item in options">
                  <input
                    v-model="selected_value"
                    :id="group_id + item.value"
                    class="bx--radio-button"
                    type="radio"
                    :value="item.value"
                    :name="group_id"
                    @change="selectedOption()"
                    tabindex="0"
                    :disabled="disabled"
                    checked>
                  <label :for="group_id + item.value" class="bx--radio-button__label">
                    <span class="bx--radio-button__appearance"></span>
                    <span class="bx--radio-button__label-text">{{ item.text }}</span>
                  </label>
                </div>
            </div>
          </div>
       </fieldset>
    `
}