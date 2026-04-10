import Link from 'next/link';

type PageTrailProps = {
  current: string;
};

export function PageTrail({ current }: PageTrailProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="inline-flex w-fit flex-nowrap items-baseline gap-1.5 border border-zinc-200 bg-white/80 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-zinc-500 backdrop-blur sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[0.68rem]"
    >
      <Link className="text-zinc-950 transition-colors duration-200 hover:text-zinc-500" href="/">
        Start
      </Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}
