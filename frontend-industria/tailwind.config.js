const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.ts'
  ],
  theme: {
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      azulPrimario: '#003049',
      azulSecundario: '#427B8A',
      azulTerciario: '#007EA7',
      rojoPrimario: '#9B1C1C',
      rojoSecundario: '#671313',
      blanco: '#FFFFFF',
      hueso: '#F2F3D9',
      grisClaro: '#E3E3E3',
      oscuro: '#001D29',
      nuevo:'#84D35F'
    },
    extend: {
      backgroundImage: {
        'mujer': "url('/assets/img/mujer1.png')",
        'logo': "url('/assets/img/Logo2.svg')",
      },
    },
  },
  plugins: [],
}


/* 
RojoPrimario: #9B1C1C
RojoSecundario: #671313
AzulPrimario: #003049
AzulSecundario: #427B8A
AzulTerciario: #007EA7
Blanco: #FFFFFF
Hueso: #F2F3D9
Oscuro: #001D29
GrisClaro: #E3E3E3 */