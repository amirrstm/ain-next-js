import Footer from '../footer'

type Props = { children: React.ReactNode }
const SiteLayout: React.FC<Props> = ({ children }) => {
  return (
    <main>
      <div>{children}</div>

      <Footer />
    </main>
  )
}

export default SiteLayout
