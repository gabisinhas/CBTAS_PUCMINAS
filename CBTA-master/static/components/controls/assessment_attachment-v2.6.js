import * as Inputs from "/static/components/carbon-collections/inputs.js";
import * as Headers from '/static/components/carbon-collections/headers.js';
import * as Loaders from '/static/components/carbon-collections/loaders.js'

var app = new Vue ({
    el: '#assessment_attachment',
    // Reactive variables to support the process
    data:{

        loading:{

            initial: false
        },

        attachments: {},

        business_data:{
            assessment_id: '',
            origin_country:'',
            destin_country:'',
        },
    },

    components:{

        'input_files': Inputs.input_files,
        'header_standard': Headers.header_standard,
        'overlay_loader': Loaders.overlay_loader,
    },

    created() {

        this.loading.initial = true;

        // Get parameters
        let params = (new URL(window.location.href)).searchParams;

        // Get related assessment data
        axios.
            get('/assessment-management/assessment/admin/' + params.get('assessment_id')).
            then(response => {
                // Populate user data
                this.business_data.assessment_id = response.data['assessment_id'];
                this.business_data.origin_country = response.data['origin_country'];
                this.business_data.destin_country = response.data['destin_country'];

                // 2. Populate the attachments references
                this.attachments = {};
                for(var key in response.data._attachments){
                    this.attachments[key] = {'name': key, 'url': '/assessment-management/assessment/' + response.data._id.replace(":","_._") + '/attachment/' + key};
                }
                this.loading.initial = false;

            })
    },

    watch:{


    },

    methods:{


    },

    template: `
        <div>
            <!-- Main header -->
            <header_standard>
            </header_standard>
            <!-- Logo -->
            <div class="bx--row" style="margin-top: 3rem; margin-right: unset; margin-left: unset;">
                <div class="bx--col-xs-12 bx--col-lg-12" style="
                    height: 100%;
                    width: 100%;
                    padding: unset;
                    ">
                    <div style="background-image: url(/static/images/banner-v1.2.png);
                        background-position: center center;
                        height: 150%;
                        width: 100%;
                        background-size: 100%;
                    ">
                        <h2 class="h2">
                            Cross Border Travel</br>
                            Query Form
                        </h2>
                    </div>
                </div>
            </div>
            <div class= "bx--grid" style="padding-left: 4%; padding-right: 45%; margin-left: auto; margin-right: auto; padding-bottom: 200px;">
                <!-- Download Assessment Result Document -->
                <div class="bx--row" style="padding-top:48px; padding-bottom:42px;">
                    <div class="bx--col" >
                        <img style="float:left; padding-top: 6px;" src="/static/images/identification_black.png"/>
                        <h2 class="h1" style="float: left; padding-left:8px;">Download Assessment Result Document</h2>
                    </div>
                </div>
                <!-- Information section -->
                <!-- Main content -->
                <div class="bx--row" style="">
                     <div class="bx--col" style="width: 50%;">
                        <div>
                            <input_files
                                v-bind:label="'Assessment ID: ' + business_data.assessment_id "
                                v-bind:data_table="attachments"
                                v-bind:mandatory="false"
                                v-bind:readonly="true"
                            >
                            </input_files>
                        </div>
                    </div>
                </div>
            </div>
            <overlay_loader
                    :is_visible="loading.initial"
            ></overlay_loader>
            <footer class="footer" style="margin-top:100px;">
                <a><img src="/static/images/IBM_logo_black.png"></a>
            </footer>
        </div>
      `
    ,


})