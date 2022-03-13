import * as Loaders from "/static/components/collections/loaders.js";

export var program_calendar = {
    props: {
        id: {type: String, required: true},
        avatar: {type: String, required: true},
        calendar_name: {type: String, required: true},
        calendar_status: {type: String, required: true},
        created_by: {type: String, required: true},
        created_date: {type: String, required: true},
        programs: {type: Array, default: [{}]},
        date_identification_decisions: {type: String, required: true},
        date_of_notification: {type: String, required: true},
        date_of_planned_exit: {type: String, required: true},
    },
    components:{
        'loader': Loaders.loader,
    },
    methods:{
        duplicateCalendar: function(){
            alert('Duplicate Calendar');
        },
        editCalendar: function(){
            var split_id = this.id.split(":");
            window.location = '/calendar?id=' + split_id[1];
        },
        archiveCalendar: function(){
            alert('Archive Calendar');
        },
        deleteCalendar: function(confirmed){
            this.$parent.showOverlay(this.id, 'delete');
        },
        publishCalendar: function(){
            alert('Publish Calendar');
        },
        createProgram: function(){
            alert('Create a Program');
        },
        previewAndExport: function(){
            alert('Preview and Export');
        },
        openProgram: function (program) {
            window.location = "/program/" + program
        }
    },
    template: `
    <div class="ds-panel ds-panel-floating ds-fade-in">
        <div class="ds-panel-container ds-bg-neutral-2">
            <div class="ds-row">
                <div class="ds-col-2">
                    <img style="height: 80px; width: 80px" class="ds-img-responsive"
                         :src="avatar" alt="Avatar image holding no visual importance">
                </div>
                <div class="ds-col-7">
                    <h3 class="ds-heading-3 ds-font-weight-medium ds-text-neutral-7">{{ calendar_name }}</h3>
                    <h5 class="ds-heading-5 ds-text-neutral-6">{{ calendar_status }} Calendar<br>
                        Created by {{ created_by }} on {{ created_date }}</h5>
                    <h5 class="ds-heading-5 ds-text-neutral-6"></h5>
                </div>
                <div class="ds-col-3 ds-float-right">
                    <div v-if="calendar_status == 'Draft'" class="ds-dropdown ds-flat" tabindex="0" role="menu"
                         aria-label="Calendar Actions">
                        <div class="ds-title ds-text-align-right ds-float-right ds-bg-neutral-2"><span class="ds-icon-large ds-icon-menu"></span></div>
                        <div class="ds-options" role="group">
                            <div class="ds-option ds-text-align-right ds-pad-r-1 ds-text-small ds-disabled ds-text-neutral-5"
                                 role="menuitem"
                                 tabindex="-1" @click="duplicateCalendar">
                                Duplicate
                            </div>
                            <div class="ds-option ds-text-align-right ds-pad-r-1 ds-text-small" role="menuitem"
                                 tabindex="-1" @click="editCalendar">
                                Edit
                            </div>
                            <div class="ds-option ds-text-align-right ds-pad-r-1 ds-text-small ds-disabled ds-text-neutral-5"
                                 role="menuitem"
                                 tabindex="-1" @click="archiveCalendar">
                                Archive
                            </div>
                            <div class="ds-option ds-text-align-right ds-pad-r-1 ds-text-small" role="menuitem"
                                 tabindex="-1" @click="deleteCalendar">
                                Delete
                            </div>
                            <div class="ds-option ds-text-align-right ds-pad-r-1 ds-text-small ds-disabled ds-text-neutral-5"
                                 role="menuitem"
                                 tabindex="-1" @click="publishCalendar">
                                Publish & Finalize
                            </div>
                            <div class="ds-option ds-text-align-right ds-pad-r-1 ds-text-small ds-disabled ds-text-neutral-5"
                                 role="menuitem"
                                 tabindex="-1" @click="createProgram">
                                Create a program
                            </div>
                            <div class="ds-option ds-text-align-right ds-pad-r-1 ds-text-small ds-disabled ds-text-neutral-5"
                                 role="menuitem"
                                 tabindex="-1" @click="previewAndExport">
                                Preview & Export
                            </div>
                        </div>
                    </div>
                    <div v-else class="ds-dropdown ds-flat" tabindex="0" role="menu" aria-label="Calendar Actions">
                        <div class="ds-title ds-text-align-right ds-float-right ds-bg-neutral-2"><span class="ds-icon-large ds-icon-menu"></span></div>
                        <div class="ds-options" role="group">
                            <div class="ds-option ds-text-align-right ds-pad-r-1 ds-text-small ds-disabled ds-text-neutral-5" role="menuitem"
                                 tabindex="-1" @click="createProgram">
                                Create a program
                            </div>
                            <div class="ds-option ds-text-align-right ds-pad-r-1 ds-text-small ds-disabled ds-text-neutral-5" role="menuitem"
                                 tabindex="-1" @click="previewAndExport">
                                Preview & Export
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ds-row ds-pad-1_5">
                <div class="ds-col-12 ds-pad-t-1 ds-pad-l-6 ds-pad-r-6">
                    <div v-if="programs.length != 0" class="ds-dropdown ds-basic" tabindex="0" role="menu"
                         aria-label="Programs Dropdown">
                        <div class="ds-title ds-text-align-center">{{ programs.length }} programs on this calendar</div>
                        <div class="ds-options" role="group">
                            <div v-for="program in programs" class="ds-option" role="menuitem" tabindex="-1"
                                 @click="openProgram(program.id)">
                                Program {{ program.name }}
                            </div>
                        </div>
                    </div>
                    <div else class="ds-dropdown ds-basic" tabindex="0" role="menu" aria-label="Programs Dropdown">
                        <div class="ds-title ds-text-align-center">0 programs on this calendar</div>
                        <div class="ds-options" role="group">
                            <div class="ds-option" role="menuitem" tabindex="-1"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ds-row ds-pad-1">
                <div class="ds-col-12 ds-pad-l-6_5 ds-pad-r-2">
                    <p class="ds-mar-0 ds-text-medium ds-text-neutral-7">
                        Date identification decisions: {{ date_identification_decisions }}
                    </p>
                </div>
            </div>
            <div class="ds-row ds-pad-1">
                <div class="ds-col-12 ds-pad-l-6_5 ds-pad-r-2">
                    <p class="ds-mar-0 ds-text-medium ds-text-neutral-7">
                        Date of notification: {{ date_of_notification }}
                    </p>
                </div>
            </div>
            <div class="ds-row ds-pad-1">
                <div class="ds-col-12 ds-pad-l-6_5 ds-pad-r-2">
                    <p class="ds-mar-0 ds-text-medium ds-text-neutral-7">
                        Date of planned exit: {{ date_of_planned_exit }}
                    </p>
                </div>
            </div>
        </div>
    </div>       
    `
}