const paletteGenerator = require('@bobthered/tailwindcss-palette-generator');

const colors = paletteGenerator(
  [
    { name: 'primary', color: '#00C49A' },
    { name: 'gray', color: '#808080' },
  ],
  { output: 'HSLA' },
);

const boxShadow = {};
Object.keys(colors).forEach(color => {
  Object.keys(colors[color]).forEach(shade => {
    boxShadow[`btn-${color}-${shade}`] = `0 .25rem 1rem ${colors[color][
      shade
    ].replace(/, 1/g, ', .3')}`;
  });
});

module.exports = {
  purge: [],
  theme: {
    extend: {
      boxShadow,
      colors,
      padding: {
        14: '3.5rem',
      },
    },
  },
  variants: {},
  plugins: [],
};
