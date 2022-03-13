export var loader =
        {
            // Input
            props: {
                label: {
                    type: String,
                    default: ''
                }
            },
            template: `
                <div class="ds-loader-container ds-loader-blue">
                    <div class="ds-loader-header">{{ label }}</div>
                    <div class="ds-loader" role="alert" aria-busy="true" aria-label="Loading Data"></div>
                </div>
            `
        };