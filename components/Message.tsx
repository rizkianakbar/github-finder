import Image from "next/image";
import { memo } from "react";

export const NoResultsMessage = memo(() => {
  return (
    <div className="p-4 text-center border rounded-md">
      <p className="text-sm">No users found.</p>
    </div>
  );
});

export const WelcomeMessage = memo(() => {
  return (
    <div className="flex flex-col gap-4 p-4 text-center border rounded-md">
      <Image
        src="/github.png"
        alt="GitHub Logo"
        width={100}
        height={100}
        className="mx-auto"
      />
      <p className="text-xl font-bold">
        Explore GitHub Users and Their Repositories
      </p>
      <p>
        Discover GitHub users and their repositories effortlessly with GitHub
        Finder. Search for usernames and instantly access a list of users. Click
        on any user to explore their repositories.
      </p>
      <p>
        Connect with talented developers, discover their projects, and gain
        insights into their coding expertise. GitHub Finder makes it easy to
        find the right collaborators for your projects.
      </p>
      <p>Start searching now and uncover the world of developers on GitHub!</p>
    </div>
  );
});
