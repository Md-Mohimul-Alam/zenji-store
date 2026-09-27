function AnnouncementBar() {
  return (
    <div className="border-b border-white/10 bg-white text-black">
      <div className="mx-auto flex min-h-9 max-w-[1440px] items-center justify-center px-4">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-xs">
          Free AU shipping over A$100
          <span className="mx-2 text-black/30">•</span>
          Limited drop — no restocks
        </p>
      </div>
    </div>
  )
}

export default AnnouncementBar