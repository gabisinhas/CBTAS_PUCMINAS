import * as Headers from '/static/components/carbon-collections/headers.js';
import * as Buttons from "/static/components/carbon-collections/buttons.js";

var index = new Vue ({
    el: '#logout',
    data:{

    },
    components: {
        'header_standard': Headers.header_standard,
    },

    created() {
    },
    computed: {

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
            <!-- Information section -->
            <div class= "bx--grid " style="padding-left: 3%; margin-left: auto; margin-right: auto;">
                    <div class="bx--row">
                        <div class="bx--col" >
                        </div>
                    </div>
                <!-- Personal Details Section -->
                <div class="bx--row" style="padding-top:48px; padding-bottom: 25%;">
                    <div class="bx--col" >
                        <div class="bx--row" style="margin-right: unset; margin-left: unset;">
                            <div class="bx--col" >
                                <h4 style="font-size: 0.925rem;font-weight: 300;line-height: 2.4; padding-bottom: 10px;">
                                    You were logged out!
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <footer class="footer">
                <a><img src="/static/images/IBM_logo_black.png"></a>
            </footer>
        </div>
      `
})