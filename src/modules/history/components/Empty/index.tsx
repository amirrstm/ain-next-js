const HistoryEmpty: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="relative flex h-[calc(100vh-100px)] w-full items-center justify-center bg-card bg-grid-neutral-200/55 dark:bg-black dark:bg-grid-white/[0.1]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div
        className="z-[1] flex h-[400px] w-[400px] flex-col items-center justify-center gap-3 rounded-full border border-muted p-4 text-center"
        style={{
          backgroundImage: 'radial-gradient(ellipse  at 50% 50%, rgba(33, 33, 33, 0.6) 0%, rgba(33, 33, 33, 0.8) )'
        }}
      >
        <p className="flex text-center text-gray-500 dark:text-gray-300">
          <span className="flex-1 leading-relaxed">{title}</span>
        </p>
      </div>
    </div>
  )
}

export default HistoryEmpty
