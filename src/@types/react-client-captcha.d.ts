// types/react-client-captcha/react-client-captcha.d.ts

interface CaptchaProps {
  captchaCode?: (value: string) => void
}

declare module 'react-client-captcha' {
  import React from 'react'

  class ReactHashtag extends React.Component<CaptchaProps> {}
  export default ReactHashtag
}
