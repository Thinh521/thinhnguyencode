import {
  FaCss3Alt,
  FaFigma,
  FaGithub,
  FaHtml5,
  FaNodeJs,
  FaReact,
  FaWordpress,
} from "react-icons/fa";
import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiBootstrap,
  SiEthereum,
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiNextdotjs,
  SiPostman,
  SiSolidity,
  SiTailwindcss,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { Video } from "lucide-react";

const TECH_STACK = [
  { name: "React", icon: <FaReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "React Native", icon: <FaReact /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "HTML", icon: <FaHtml5 /> },
  { name: "CSS", icon: <FaCss3Alt /> },
  { name: "TailwindCSS", icon: <SiTailwindcss /> },
  { name: "Bootstrap", icon: <SiBootstrap /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "Express", icon: <SiExpress /> },
  { name: "Firebase", icon: <SiFirebase /> },
  { name: "Smart Contract", icon: <SiSolidity /> },
  { name: "Blockchain", icon: <SiEthereum /> },
  { name: "GitHub", icon: <FaGithub /> },
  { name: "VS Code", icon: <VscVscode /> },
  { name: "Postman", icon: <SiPostman /> },
  { name: "WordPress", icon: <FaWordpress /> },
  { name: "Figma", icon: <FaFigma /> },
  { name: "Photoshop", icon: <SiAdobephotoshop /> },
  { name: "Illustrator", icon: <SiAdobeillustrator /> },
  { name: "Premiere Pro", icon: <SiAdobepremierepro /> },
  { name: "CapCut", icon: <Video size={14} /> },
];

export default function TechMarquee() {
  return (
    <div className="mb-16 overflow-hidden tech-fade tech-marquee-wrap py-2">
      <div className="flex w-max gap-4 tech-marquee">
        {[...TECH_STACK, ...TECH_STACK].map(({ name, icon }, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.62rem] tracking-wider shrink-0 cursor-pointer text-neutral-900 dark:text-white border border-neutral-200/80 dark:border-neutral-700/80 bg-neutral-200/20 dark:bg-neutral-700/20 hover:border-primary-400/50 hover:bg-primary-400/10 transition-all duration-300"
          >
            <span className="text-sm text-primary-400/80">{icon}</span>
            {name}
          </span>
        ))}
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .tech-marquee {
            animation: marquee 50s linear infinite;
          }

          .tech-marquee-wrap:hover .tech-marquee {
            animation-play-state: paused;
          }

          .tech-fade {
            mask-image: linear-gradient(
              to right,
              transparent 0%,
              black 8%,
              black 92%,
              transparent 100%
            );
            -webkit-mask-image: linear-gradient(
              to right,
              transparent 0%,
              black 8%,
              black 92%,
              transparent 100%
            );
          }
        `}
      </style>
    </div>
  );
}
