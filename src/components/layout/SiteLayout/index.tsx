type Props = { children: React.ReactNode }
const SiteLayout: React.FC<Props> = ({ children }) => {
  return <main>{children}</main>
}

export default SiteLayout
