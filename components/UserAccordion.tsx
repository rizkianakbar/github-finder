import { Star } from "lucide-react";
import { memo } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/Accordion";
import { Button } from "./ui/Button";

interface User {
  avatar_url: string | undefined;
  name: string;
  login: string;
  repositories: Repository[];
}

interface Repository {
  stargazers_count: number;
  html_url: string | undefined;
  description: string;
  id: number;
  name: string;
}

interface UserAccordionProps {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
}

const UserAccordion = ({
  users,
  selectedUser,
  setSelectedUser,
}: UserAccordionProps) => {
  return (
    <Accordion type="single" collapsible>
      {users.map((user, index) => (
        <AccordionItem
          value={`item-${index}`}
          key={index}
          onClick={() => setSelectedUser(user)}
        >
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user.avatar_url} alt={`@${user.login}`} />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>

              {user.login}
            </div>
          </AccordionTrigger>

          <AccordionContent>
            {selectedUser === user &&
              user.repositories.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <div className="p-4 my-2 border rounded-md bg-white hover:bg-gray-200 hover:shadow-lg hover:border-black">
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <h3 className="font-bold">{repo.name}</h3>

                        <p className="text-xs">
                          {repo.description?.length < 100
                            ? repo.description
                            : repo.description?.substring(0, 100)}

                          {!repo.description && "No description."}
                        </p>
                      </div>
                      <p className="flex items-center text-xs self-start">
                        {repo.stargazers_count}
                        <Star
                          className="inline-block w-3 h-3 ml-1 "
                          fill="true"
                        />
                      </p>
                    </div>
                  </div>
                </a>
              ))}

            {user.repositories.length ? (
              <Button className="w-full">
                <a
                  href={`https://github.com/${user.login}?tab=repositories`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View All Repos
                </a>
              </Button>
            ) : (
              <div className="p-4 text-center border rounded-md">
                <p>No repositories found.</p>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default memo(UserAccordion);
