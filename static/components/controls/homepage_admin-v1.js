import * as Headers from '/static/components/carbon-collections/headers.js';
import * as Buttons from "/static/components/carbon-collections/buttons.js";

var index = new Vue ({
    el: '#index',
    data:{
        admin: false
    },
    components: {
        'header_standard': Headers.header_standard,
        'button_standard': Buttons.button_standard,
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
           axios
           .get('/user-management/user/cpf')
                .then(response => {
                    if(response.data.roles == "admin") this.admin = true;
                })
        }
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
                <div class="bx--row" style="padding-top:5px; padding-bottom: 2%;">
                    <div class="bx--col" >
                        <div class="bx--row" style="margin-right: unset; margin-left: unset;">
                            <div class="bx--col" >
                                <h1 style="font-size: 2.625rem; font-weight: 300;">
                                    Área do Administrador
                                </h1>
                                <h4 style="font-size: 1.425rem;font-weight: 300;line-height: 2.4; padding-bottom: 10px;">
                                    Administre seus formulários ou Consulte Estatísticas.
                                </h4>
                            </div>
                        </div>
                        <div class="bx--row" style="margin-right: 25%; margin-left: 25%; margin-top:16px; ">
                            <div class="bx--col" style="text-align: center;">
                                <button id="tooltip_cf" class="bx--tooltip__trigger bx--tooltip--a11y bx--tooltip--bottom bx--tooltip--align-start"
                                  data-tooltip-icon
                                  @click="this.window.location='/create_new_form'"
                                  <img src="/static/images/analytics1.svg"/>
                                </button>
                                <button  style="padding-left: 38px;padding-bottom: 28px;" id="tooltip_cf" class="bx--tooltip__trigger bx--tooltip--a11y bx--tooltip--bottom bx--tooltip--align-start"
                                  data-tooltip-icon
                                  @click="this.window.location='/my_assessments'"
                                  >
                                  <img src="/static/images/my_assessment_requests_button.svg"/>
                                </button>
                                <button  v-if="admin" style="padding-left: 38px;"  id="tooltip_cf" class="bx--tooltip__trigger bx--tooltip--a11y bx--tooltip--bottom bx--tooltip--align-start"
                                  data-tooltip-icon
                                  @click="this.window.location='/admin_assessments'"
                                  >
                                  <img src="/static/images/admin_requests_button.svg"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                           <footer class="footer">
                <p>Precisa de ajuda ? Entre em contato conosco.</p>
            </footer>
            </div>

        </div>
      `
})