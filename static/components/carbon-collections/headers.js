export var header_standard = {
    data() {
        return {
            user_pic: false,
            loading_pic: true,
            user_picture_url: '',
            role_admin: false,
            role_focal_point: false,
            role_mobility: false,
            serial_number: '',
            image_none: false
        }
    },
    beforeCreate() {
       axios
       .get('/user-management/user/serial_number')
            .then(response => {
                this.serial_number = response.data.serial_number;
                if(response.data.roles == "admin") this.role_admin = true;
                if(this.serial_number == ""){
                    this.image_none = true;
                }else{
                    axios
                    .get('https://unified-profile-api.us-south-k8s.intranet.ibm.com/v3/image/' + this.serial_number)
                        .then(response => {
                            if(response.headers['content-type'] == undefined){
                                this.image_none = true;
                            }
                        })
                }
            }).catch(error =>{
                this.image_none = true;
            })
    },
    methods: {
        setRoles(roles){
            var i = 0;
            for(i=0;i<=roles.length;i++){
                if(roles[i] == "admin"){
                    this.role_admin = true;
                }
                if(roles[i] == "focal_point"){
                    this.role_focal_point = true;
                }
                if(roles[i] == "mobility"){
                    this.role_mobility = true;
                }
            }
        }
    },
    template:`
        <div>
            <header class="bx--header" role="banner" aria-label="IBM Platform Name" data-header>
                <a class="bx--header__name" href="/" title="" style="font-size: 1rem; font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif; padding: 0 2rem 0 0.5rem;">
                    <img src="/static/images/GM_logo_white (1).png"
                       alt="place-holder"
                       style="height: 50px;"/>
                    <span class="bx--header__name--prefix">
                      HR
                    </span>
                    &nbsp;Global Mobility
                </a>
                <div class="bx--header__global">
                    <button class="bx--header__menu-trigger bx--header__action" aria-label="Profile picture"
                            title="Profile picture" data-navigation-menu-panel-label-expand="Profile picture"
                            data-navigation-menu-panel-label-collapse="Close menu"
                            data-product-switcher-target="#switcher-bqavcareoq">
                        <img v-if="!image_none" style="border-radius: 100%;" width="32" height="32" v-bind:src="'https://unified-profile-api.us-south-k8s.intranet.ibm.com/v3/image/' + serial_number"/>
                        <svg v-else focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="30" height="30" viewBox="0 0 32 32"
                             aria-hidden="true" class="bx--navigation-menu-panel-expand-icon">
                            <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2ZM10,26.38v-2A3.22,3.22,0,0,1,13,21h6a3.22,3.22,0,0,1,3,3.39v2a11.92,11.92,0,0,1-12,0Zm14-1.46v-.61A5.21,5.21,0,0,0,19,19H13a5.2,5.2,0,0,0-5,5.31s0,0,0,0v.59a12,12,0,1,1,16,0Z"></path>
                            <path d="M16,7a5,5,0,1,0,5,5A5,5,0,0,0,16,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,16,15Z"></path>
                        </svg>
                    </button>
                    <li class="bx--header__submenu" style="display: inline;" data-header-submenu>
                        <a class="bx--header__menu-item bx--header__menu-title" aria-haspopup="true"
                          style="color: #FFF; padding: 0 0.5rem;"
                          aria-expanded="false" tabindex="0">
                          <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="30" height="30" viewBox="0 0 32 32" aria-hidden="true"><path d="M14 4H18V8H14zM4 4H8V8H4zM24 4H28V8H24zM14 14H18V18H14zM4 14H8V18H4zM24 14H28V18H24zM14 24H18V28H14zM4 24H8V28H4zM24 24H28V28H24z"></path><title>Menu</title></svg>
                        </a>
                        <ul class="bx--header__menu" aria-label="L1 link 3" style="left: -134px;">
                          <li role="none" v-show="serial_number != ''">
                            <a href="/add_assessment" class="bx--header__menu-item" tabindex="-1">
                              <img src="/static/images/document-add.svg" style="width: 25px; height: 25px; padding-right: 8px;"/>
                              <span class="bx--text-truncate--end">
                                New Assessment
                              </span>
                            </a>
                          </li>
                          <li role="none" v-show="serial_number != ''">
                            <a href="/my_assessments" class="bx--header__menu-item" tabindex="-1">
                              <img src="/static/images/identification.svg" style="width: 25px; height: 25px; padding-right: 8px;"/>
                              <span class="bx--text-truncate--end">
                                My Requests
                              </span>
                            </a>
                          </li>
                          <li role="none" v-show="serial_number != ''" v-if="role_admin==true">
                            <a href="/admin_assessments" class="bx--header__menu-item" tabindex="-1">
                            <img src="/static/images/menu_admin.svg" style="width: 25px; height: 25px; padding-right: 8px;"/>
                              <span class="bx--text-truncate--end">
                                Admin
                              </span>
                            </a>
                          </li>
                          <li role="none" v-show="serial_number != ''">
                            <a href="/security/logout" class="bx--header__menu-item" tabindex="-1">
                              <span class="bx--text-truncate--end">
                                Logout
                              </span>
                            </a>
                          </li>
                          <li role="none" v-show="serial_number == ''">
                            <a href="/security/login" class="bx--header__menu-item" tabindex="-1">
                              <span class="bx--text-truncate--end">
                                Login
                              </span>
                            </a>
                          </li>
                        </ul>
                    </li>
                </div>
            </header>
        </div>
    `
}