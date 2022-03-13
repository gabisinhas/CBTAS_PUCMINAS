export var modal_large = {
    props: {
        title: {type: String, required: true},
        subtitle: {type: String, default: ''},
        is_visible: {type: Boolean, required: true},
        loading_audit_trail: {type: Boolean, default: false},
        auditTrailList: {type: Array, required: true},
        home_code_list: {type: Array, required: true},
        host_code_list: {type: Array, required: true},
    },
    data: function () {
        // Table historical
        return {
            table_historical: {
                region: 'Region',
                country: 'Country',
                home_life_insurance: 'Home Life Insurance',
                host_life_insurance: 'Host Life Insurance',
                notes: 'Notes',
                latest_review: 'Latest Review',
                review_status: 'Review Status',
                owner: 'Owner/Reviewer'
            }
        }
    },
    template: `
        <div data-modal id="modal-auosvf0xivd" class="bx--modal " :class="{ 'is-visible': is_visible }" role="dialog"
          aria-modal="true" aria-labelledby="modal-auosvf0xivd-label" aria-describedby="modal-auosvf0xivd-heading" tabindex="-1">
          <div class="bx--modal-container" style="width: 70%;">
            <div class="bx--modal-header">
              <p class="bx--modal-header__label bx--type-delta" id="modal-auosvf0xivd-label">{{ subtitle }}</p>
              <p class="bx--modal-header__heading bx--type-beta" id="modal-auosvf0xivd-heading">{{ title }}</p>
              <button @click="$emit('close-modal')" class="bx--modal-close" type="button" data-modal-close aria-label="close modal" >
                <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--modal-close__icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M12 4.7L11.3 4 8 7.3 4.7 4 4 4.7 7.3 8 4 11.3 4.7 12 8 8.7 11.3 12 12 11.3 8.7 8z"></path></svg>
              </button>
            </div>

            <div class="bx--modal-content" tabindex="0" style="padding-right: unset;padding-left: unset;">
              <!-- Data table will be right here -->
              <h3 v-if="auditTrailList.length == 0" style="margin-left: 1rem;">
                    No records.
                    <br/><br/>
              </h3>
              <div v-else class="bx--data-table-container " style="margin: 0 1rem 0 1rem;">
                  <!-- Table -->
                  <table class="bx--data-table  bx--data-table--sort  " v-if="!loading_audit_trail">
                    <thead>
                      <tr>
                          <th >
                            <button class="bx--table-sort">
                                <span class="bx--table-header-label">{{ table_historical.region }}</span>
                            </button>
                          </th>
                          <th >
                            <button class="bx--table-sort">
                                <span class="bx--table-header-label">{{ table_historical.country }}</span>
                            </button>
                          </th>
                          <th >
                            <button class="bx--table-sort">
                                <span class="bx--table-header-label">{{ table_historical.owner }}</span>
                            </button>
                          </th>
                          <th >
                            <button class="bx--table-sort">
                                <span class="bx--table-header-label">{{ table_historical.home_life_insurance }}</span>
                            </button>
                          </th>
                          <th >
                            <button class="bx--table-sort">
                                <span class="bx--table-header-label">{{ table_historical.host_life_insurance }}</span>
                            </button>
                          </th>
                          <th >
                            <button class="bx--table-sort">
                              <span class="bx--table-header-label">{{ table_historical.notes }}</span>
                            </button>
                          </th>
                          <th >
                            <button class="bx--table-sort">
                              <span class="bx--table-header-label">{{ table_historical.latest_review }}</span>
                            </button>
                          </th>
                      </tr>
                    </thead>
                  <tbody>
                      <tr v-for="entry in auditTrailList">
                              <td style="background: #FFF;">
                                  {{entry.region}}
                              </td>
                              <td style="background: #FFF;">
                                  {{entry.country}}
                              </td>
                              <td style="background: #FFF;">
                                  {{entry.reviewer}}
                              </td>
                              <td style="background: #FFF;">
                                  <template v-for="code in home_code_list">
                                        <span v-if="entry.new_home_code==Object.keys(code)[0]">{{Object.values(code)[0]}}</span>
                                  </template>
                              </td>
                              <td style="background: #FFF;">
                                  <template v-for="code in host_code_list">
                                        <span v-if="entry.new_host_code==Object.keys(code)[0]">{{Object.values(code)[0]}}</span>
                                  </template>
                              </td>
                              <td style="background: #FFF;">
                                  {{entry.notes}}
                              </td>
                              <td style="background: #FFF;">
                                  {{entry.review_date}}
                              </td>
                            <!-- inline edit tds -->
                      </tr>
                    </tbody>
                  </table>
                </div>
            </div>
            <div class="bx--modal-content--overflow-indicator"></div>
          </div>
          <!-- Note: focusable span allows for focus wrap feature within Modals -->
          <span tabindex="0"></span>
        </div>
    `
}