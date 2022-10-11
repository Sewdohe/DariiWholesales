import { createTheme, NextUIProvider, Text } from "@nextui-org/react"

const theme = createTheme({
  type: "dark", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: '$green200',
      primaryLightHover: '$green300',
      primaryLightActive: '$green400',
      primaryLightContrast: '$green600',
      primary: '#4ADE7B',
      primaryBorder: '$green500',
      primaryBorderHover: '$green600',
      primarySolidHover: '$green700',
      primarySolidContrast: '$white',
      primaryShadow: '$green500',

      gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#5E1DAD',

      myColor: '#ff4ecd'

    },
    space: {},
    fonts: {}
  }
})


// 3. Pass the new theme to `NextUIProvider`
<NextUIProvider theme={theme}>
  <App />
</NextUIProvider>

// 4. Now you can use these colors in your components
function MyComponent() {
  return <Text css={{ background: '$myColor' }}>NextUI colors</Text>
}
