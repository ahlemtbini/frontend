
/** @type {import('tailwindcss').Config} */
/** @type {@import url('https://fonts.googleapis.com/css2?family=Brownhill+Script&display=swap');
} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        dark: "var(--dark)",
        medium: "var(--medium)",
      },
      fontFamily: {
        "body-prese": "var(--body-prese-font-family)",
        h1: "var(--h1-font-family)",
        h2: "var(--h2-font-family)",
        brownhill: ['Brownhill Script', 'cursive'],
        "whisper-regular":"whisper-regular",
        

      },
      
    },
    colors: {
      lm_white: '#FFFFFF',
      lm_bg: '#e9e9e9', //F8F8F8
      lm_primary: '#0b1e3e',
      // lm_primary: '#2753A3',
      lm_text1: '#191D23',
      lm_text2: '#2D2929',
      lm_text3: '#667085',
      lm_grey: '#F9FAFB',
      lm_grey_btn: '#D0D5DD',
      lm_grey_icon: '#3A3C59',
      lm_blue: '#5677B4',
      dm_bg: '#121212',
      dm_div_bg1: '#2D2D2D',
      dm_div_bg2: '#353535',
      dm_div_bg3: '#454545',
      dm_dark_icons: '#2D2D2D',
      dm_selected: '#454545',
      dm_purple: '#BB86FC',
      dm_text: '#FFFFFF',
      dm_text2: '#FCFCFC',
      // svr_gray: '#636569',
      svr_gray: '#1c1d1d',
      lazar_green: '#70803c',
      co_white: '#ffff',
      co_black: '#0000',
      co_red: '#FF0000',
      co_green: '#00FF00',
      co_grey: '#1c1d1d',
      co_yellow: '#FFFF00',
      co_bleu: '#0000FF',
      co_purple:"#cc48ab",
      co_pink:"#B565A7",
      co_pink_svr:"#EC7F9F",
      co_green_lazar:"#275317",
      co_grey_light:"#9E9E9E",
      co_bleu_diss:"#0522B1",
      co_grey_diss:"#D1D1D1",

      
    }
  },
  plugins: [],
  important:true,
}

