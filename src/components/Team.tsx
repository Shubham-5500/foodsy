import { Linkedin, Github } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

export default function Team() {
  const teamMembers = [
    {
      name: "Shubham Mishra",
      linkedin: (
        <a href="https://www.linkedin.com/in/shubham5500/">
          <Linkedin></Linkedin>
        </a>
      ),
      github: (
        <a href="https://github.com/Shubham-5500/">
          <Github></Github>
        </a>
      ),
      image: "/shubham.png",
    },
    {
      name: "Vedant Tiwari",
      linkedin: (
        <a href="https://www.linkedin.com/in/vedanttiwari07/">
          <Linkedin></Linkedin>
        </a>
      ),
      github: (
        <a href="https://github.com/vedanttiwari07/">
          <Github></Github>
        </a>
      ),
      image: "/vedant.png",
      bio: "",
    },
    {
      name: "Vasu Sahu",
      linkedin: (
        <a href="https://www.linkedin.com/in/vasu-sahu-s2ep7/">
          <Linkedin></Linkedin>
        </a>
      ),
      github: (
        <a href="https://github.com/VasuS609/">
          <Github></Github>
        </a>
      ),
      image: "/vasu.png",
      bio: "",
    },
    {
      name: "Ayush Patel",
      linkedin: (
        <a href="https://www.linkedin.com/in/ayushpatel69/">
          <Linkedin></Linkedin>
        </a>
      ),
      github: (
        <a href="https://github.com/6969Ayush6969/">
          <Github></Github>
        </a>
      ),
      image: "/ayush.png",
      bio: "",
    },
    {
      name: "Shivam Kumar",
      linkedin: (
        <a href="https://www.linkedin.com/in/shivvx/">
          <Linkedin></Linkedin>
        </a>
      ),
      github: (
        <a href="https://github.com/Shivamx-Dev/">
          <Github></Github>
        </a>
      ),
      image: "/shivam.png",
      bio: "",
    },
  ];
  return (
    <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="border border-border hover:border-primary/50 dark:text-white transition-colors"
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full dark:text-white overflow-hidden mb-4 border-4 border-primary/20">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold dark:text-white mb-1">{member.name}</h3>
                  <div className="flex gap-3">
                    <p className="text-foreground/90 hover:text-primary dark:text-white mb-3 text-sm">
                      {member.linkedin}
                    </p>
                    <p className="text-foreground/90 hover:text-primary dark:text-white mb-3 text-sm">
                      {member.github}
                    </p>
                  </div>
                  <p className="text-foreground/70 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
  );
}
