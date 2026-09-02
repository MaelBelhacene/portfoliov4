import { monograms, type OrgKey } from "@/lib/orgs";

/** Monogramme typographique d’une organisation — carré, filet, capitales. */
export default function Monogram({ org }: { org: OrgKey }) {
  const { mark, name } = monograms[org];
  const long = mark.length > 2;

  return (
    <span
      role="img"
      aria-label={name}
      className={`flex size-12 shrink-0 items-center justify-center border border-rule font-display font-semibold tracking-wide text-ink ${
        long ? "text-[0.6875rem]" : "text-sm"
      }`}
    >
      <span aria-hidden="true">{mark}</span>
    </span>
  );
}
