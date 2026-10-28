import { createFileRoute, Link } from "@tanstack/react-router";
import { ritualById } from "@/lib/family/content";
import { copy } from "@/lib/family/copy";
import { useFamily } from "@/lib/family/store";
import { Player } from "@/components/family/player";

export const Route = createFileRoute("/majlis/$ritualId")({ component: PlayPage });

function PlayPage() {
  const { ritualId } = Route.useParams();
  const lang = useFamily((state) => state.lang);
  const ritual = ritualById(ritualId);
  const c = copy[lang];
  if (!ritual) {
    return (
      <div className="mx-auto max-w-xl py-10">
        <p className="text-lg">{c.notFound}</p>
        <Link to="/majlis" className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-primary">
          {c.back}
        </Link>
      </div>
    );
  }
  return <Player ritual={ritual} />;
}
