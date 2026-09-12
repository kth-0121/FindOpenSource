import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Learn what FindOpenSource is and why it exists.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">About {siteConfig.name}</h1>

      <div className="prose-content mt-6 space-y-6 text-foreground/90">
        <p>
          Most open source directories assume you already know the name of the project
          you&apos;re looking for. {siteConfig.name} starts from a different question:{" "}
          <strong>&ldquo;What open source can I use to build this feature?&rdquo;</strong>
        </p>
        <p>
          Search by what you&apos;re trying to build &mdash; authentication, a chat feature, a CMS,
          a vector database &mdash; and get a curated list of open source projects that solve
          that problem, with enough information to quickly evaluate and compare them.
        </p>
        <h2 className="text-xl font-semibold tracking-tight">How it works</h2>
        <p>
          {siteConfig.name} is a fully static, open source directory. There is no login, no
          database and no backend service &mdash; every project is a plain JSON file reviewed and
          merged through GitHub pull requests. This keeps the project simple, transparent and easy
          to contribute to.
        </p>
        <h2 className="text-xl font-semibold tracking-tight">Contributing</h2>
        <p>
          Anyone can add a project by opening a pull request.{" "}
          <Link href="/contribute" className="text-accent hover:underline">
            See the contribution guide
          </Link>{" "}
          to get started.
        </p>
      </div>
    </div>
  );
}
