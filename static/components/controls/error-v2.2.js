import * as Headers from '/static/components/carbon-collections/headers.js';

var index = new Vue ({
    el: '#error',
    data:{
        admin: false
    },
    components: {
        'header_standard': Headers.header_standard,
    },
    created() {
        this.get_permission();
    },
    computed: {

    },
    watch:{

    },
    methods:{
        get_permission(){
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
                <div class="bx--row" style="padding-top:48px; padding-bottom:19%;">
                    <div class="bx--col" >
                        <div class="bx--row" style="margin-right: unset; margin-left: unset;">
                            <div class="bx--col" >
                                <h3 style="font-size: 1.525rem;font-weight: 400;line-height: 2.4; padding-bottom: 10px;">
                                    Algum erro ocorreu. Por favor contate seu administrador.
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <footer class="footer">
                <p>Precisa de ajuda ? Entre em contato conosco.</p>
            </footer>
        </div>
      `
})