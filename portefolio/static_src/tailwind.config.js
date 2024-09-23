/**
 * This is a minimal config.
 *
 * If you need the full config, get it from here:
 * https://unpkg.com/browse/tailwindcss@latest/stubs/defaultConfig.stub.js
 */

const plugin = require('tailwindcss/plugin')
const colors = require("tailwindcss/colors")

module.exports = {
    content: [
        '../../portefolio/templates/portefolio/**/*.html',
        '../templates/**/*.html',
        '../../templates/**/*.html',
        '../../**/templates/**/*.html',
        '../../**/*.py',
    ],
    theme: {
        extend: {
            colors: {
                light_background: "rgba(147,208,231,0.78)",
                light_light: "#39BF17",
                light_dark: "#1D263F",
                light_medium: "rgba(210,20,43)",
                light_grad_f: "rgba(207,217,223,0.65)",
                light_grad_t: "rgba(226,235,240,0.65)",
                light_text: "#484848",

                dark_background: "rgba(11,33,40,0.78)",
                dark_light: "#94a3e5",
                dark_dark: "#94a3e5",
                dark_medium: "rgb(211,38,57)",
                dark_grad_f: "rgba(24,26,26,0.65)",
                dark_grad_t: "rgba(11,12,12,0.65)",
                dark_text: "#d9d9d9",

                border_glass: "rgba(255, 255, 255, 0.125)",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                oswald: ['Oswald', 'sans-serif'],
            },
        },
    },
    plugins: [
        /**
         * '@tailwindcss/forms' is the forms plugin that provides a minimal styling
         * for forms. If you don't like it or have own styling for forms,
         * comment the line below to disable '@tailwindcss/forms'.
         */
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
    ],
}
