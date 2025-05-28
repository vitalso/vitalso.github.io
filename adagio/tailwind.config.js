/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: ["./src/**/*.{html,js}"],
  theme: {

    // Custom width for container
    container: {
      center: true,
      padding: '16px',
      screens: {
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '1312px',
      },
    },

    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        Jakarta: ['Plus Jakarta Sans', 'sans-serif']
      },

      boxShadow: {
        'lg-primary': '0 0 0 1px rgba(14, 63, 126, 0.1) , 0 24px 24px -8px rgba(42, 51, 70, 0.03)',
        'primary': '0 0 0 1px rgba(7, 26, 52, 0.1)',
        'accent': '0 0 0 2px #2264F2',
        'slider': '0 12px 12px 6px rgba(42, 51, 70, 0.04)',
        'outline': '0 0 0 1px rgba(14, 63, 126, 0.06) , 0 0 16px 0px rgba(42, 51, 70, 0.04)',
        'mockup': '0 0 0 0.75px rgba(14, 63, 126, 0.1) , 0 0.75px 0.75px -0.38px rgba(42, 51, 68, 0.04) , 0 0.25px 0.25px -0.38px rgba(42, 51, 70, 0.04) , 0 33px 33px -12px rgba(42, 51, 70, 0.06)'
      }
    },

    colors: {
      greyscale: {
        '100': '#F7F9FC',
        '200': '#E6EAF0',
        '400': '#A7AFBC',
        '500': '#7B8698',
        '600': '#596579',
        '700': '#374253',
        '800': '#192638',
        '900': '#0F1825',
      },

      black: '#000000',
      dark: '#071A34',
      white: '#FFFFFF',
      light: '#FAFAFA',
      grey: '#F7F9F9',
      secondary: '#F9F9F9',
      greyPrimary: '#F7F6F5',
      greySecondary: '#566370',
      greyBorder: '#D1D9DD',
      red: '#C83C00',

      accent: {
        'blue': '#2264F2',
      },
    },

    backgroundImage: {
      'hero-section': "url('../assets/bg-line.svg') , linear-gradient(180deg, rgba(210, 238, 253, 1), rgba(243, 242, 248, 1), rgba(251, 251, 252, 1)) ",
      'hero-section-mobile': "url('../assets/hero-mobile.webp')",
      'hero-section-without-image': "linear-gradient(180deg, rgba(210, 238, 253, 1), rgba(243, 242, 248, 1), rgba(251, 251, 252, 1)) ",
      'fade-gradient': 'linear-gradient(180deg, #FAFAFA 20%, transparent 100%)',
      'fade-gradient-medium': 'linear-gradient(180deg, transparent 40%, #FAFAFA 100%)',
      'fade-gradient-reverse': 'linear-gradient(180deg, transparent 10%,  #FFFFFF 100%)',
      'gradient-slider': 'linear-gradient(180deg, transparent 0%, #FFFFFF 100%)',
      'promotion-section': "radial-gradient(circle, rgba(34, 166, 242, 0.12), rgba(34, 166, 242, 0.18) ) , url('../assets/bg-promo-vector.svg')",
      'btn-arrow': "url('../assets/arrow-small-left-linear.svg')",
      'signup-hero': "url(../assets/signup-image.webp)",
    }

  },
  plugins: [],
}

