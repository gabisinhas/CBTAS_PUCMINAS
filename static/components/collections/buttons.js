export var button_submit =
    {
        props: ['value','readonly'],
        template: `
                <button type="button"
                class="ds-button custom-primary-button"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
                v-bind:class="{ 'ds-disabled' : readonly }"
                :disabled="readonly"                
                >Submit</button>
        `
    };

export var button_add =
    {
        props: ['value','readonly'],
        template: `
                <button type="button"
                class="ds-button custom-primary-button"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
                v-bind:class="{ 'ds-disabled' : readonly }"
                :disabled="readonly"
                >Add</button>
        `
    };

export var button_cancel =
    {
        props: ['value','readonly'],
        template: `
                <button type="button"
                class="ds-button custom-secondary-button"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
                v-bind:class="{ 'ds-disabled' : readonly }"
                :disabled="readonly"                
                >Cancel</button>
        `
    };

export var button_reset =
    {
        props: ['value','readonly'],
        template: `
                <button type="button"
                class="ds-button ds-basic"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
                v-bind:class="{ 'ds-disabled' : readonly }"
                :disabled="readonly"                
                >Reset</button>
        `
    };

export var button_delete =
    {
        props: ['value','readonly'],
        template: `
                <button type="button"
                class="ds-button ds-danger"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
                v-bind:class="{ 'ds-disabled' : readonly }"
                :disabled="readonly"                
                >Delete</button>
        `
    };

export var button_save =
    {
        props: ['value','readonly'],
        template: `
                <button type="button"
                class="ds-button custom-primary-button"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
                v-bind:class="{ 'ds-disabled' : readonly }"
                :disabled="readonly"                
                >Save</button>
        `
    };

export var button_approve =
    {
        props: ['value','readonly'],
        template: `
                <button type="button"
                class="ds-button custom-primary-button"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
                v-bind:class="{ 'ds-disabled' : readonly }"
                :disabled="readonly"                
                >Approve</button>
        `
    };

export var button_reject =
    {
        props: ['value','readonly'],
        template: `
                <button type="button"
                class="ds-button ds-danger"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
                v-bind:class="{ 'ds-disabled' : readonly }"
                :disabled="readonly"                
                >Reject</button>
        `
    };

export var icon_button_search =
    {
        props: ['value','readonly'],
        template: `
                <button class="ds-icon-large ds-icon-search ds-icon-button-neutral" aria-label="Search Button"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
                v-bind:class="{ 'ds-disabled' : readonly }"
                :disabled="readonly"                  
                ></button>
        `
    };

export var icon_button_new_calendar =
    {
        props: ['value','readonly'],
        template: `
                <button class="ds-icon-medium ds-icon-calendar ds-icon-button-neutral ds-pad-r-2" aria-label="Create New Calendar"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
                v-bind:class="{ 'ds-disabled' : readonly }"
                :disabled="readonly"                  
                > New Calendar</button>
        `
    };

export var button_new_calendar =
    {
        props: ['value','readonly'],
        template: `
                <button type="button"
                class="ds-button custom-primary-button"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
                v-bind:class="{ 'ds-disabled' : readonly }"
                :disabled="readonly"                
                >Create a Program Calendar</button>
        `
    };

export var icon_button_archived_calendar =
    {
        props: ['value','readonly'],
        template: `
                <button class="ds-icon-medium ds-icon-box ds-icon-button-neutral" aria-label="View Archived Calendars"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
                v-bind:class="{ 'ds-disabled' : readonly }"
                :disabled="readonly"                  
                > Archived Calendars</button>
        `
    };

export var icon_button_add =
    {
        props: ['value','readonly'],
        template: `
                <button class="ds-icon-large ds-icon-add-alt ds-icon-button-neutral" aria-label="Add New"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
                v-bind:class="{ 'ds-disabled' : readonly }"
                :disabled="readonly"                  
                ></button>
        `
    };

export var icon_button_delete =
    {
        props: ['value','readonly'],
        template: `
                <button class="ds-icon-medium ds-icon-trash-can ds-icon-button-neutral" aria-label="Delete"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
                v-bind:class="{ 'ds-disabled' : readonly }"
                :disabled="readonly"                  
                ></button>
        `
    };


// REFERENCE
//
// export var call_child_method =
//         {
//             props: ['label',
//                     'value'],
//             methods:{
//               metodo_pai(){
//                   alert('Funçao do metodo filho')
//               }
//             },
//             template: `
//                 <button type="button"
//                         class="ds-button ds-primary"
//                         v-bind:value="value"
//                         v-on:click="metodo_pai"
//                         v-on:input="$emit('input', $event.target.value)"
//                 >{{ label }}</button>
//             `
//         };
//
// export var button_secondary =
//         {
//             props: ['label',
//                     'value'],
//
//             template: `
//                 <button type="button"
//                         class="ds-button ds-secondary"
//                         v-bind:value="value"
//                         v-on:input="$emit('input', $event.target.value)"
//                 >{{ label }}</button>
//             `
//         };

            // <div class="ds-row">
            //     <div class="ds-col-1">
            //         <button_primary
            //         v-on:click="response($event)"
            //         v-bind:label="label_submit">
            //         </button_primary>
            //     </div>
            // </div>
            // <div class="ds-row">
            //     <div class="ds-col-2">
            //         <button_secondary
            //         v-on:click.native="alertar"
            //         v-bind:label="label_save">
            //         </button_secondary>
            //     </div>
            // </div>

