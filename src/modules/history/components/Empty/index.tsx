const HistoryEmpty: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="h-[calc(100vh-100px)] w-full dark:bg-black bg-card  dark:bg-grid-white/[0.1] bg-grid-neutral-200/55 relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div
        className=" border border-muted w-[400px] h-[400px] p-4 text-center z-[1] flex flex-col justify-center items-center gap-3 rounded-full"
        style={{
          backgroundImage: 'radial-gradient(ellipse  at 50% 50%, rgba(33, 33, 33, 0.6) 0%, rgba(33, 33, 33, 0.8) )',
        }}
      >
        <p className="text-gray-500 dark:text-gray-300 flex text-center">
          <span className="flex-1 leading-relaxed">{title}</span>
        </p>
      </div>
    </div>
  )
}

export default HistoryEmpty
