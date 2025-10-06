import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LocketIcon,
  TiktokIcon,
} from "../../components/Icons/Icons";

const SOCIAL_LINKS = [
  {
    Icon: FacebookIcon,
    link: "https://www.facebook.com/share/1L94WW4Qsx/",
    label: "Facebook",
    color:
      "hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:border-blue-400",
  },
  {
    Icon: InstagramIcon,
    link: "https://www.instagram.com/ph.thinh_ig",
    label: "Instagram",
    color:
      "hover:bg-pink-50 hover:border-pink-400 hover:text-pink-600 dark:hover:bg-pink-900/20 dark:hover:border-pink-400",
  },
  {
    Icon: TiktokIcon,
    link: "https://www.tiktok.com/@pthjnh_25",
    label: "TikTok",
    color:
      "hover:bg-slate-50 hover:border-slate-700 hover:text-slate-800 dark:hover:bg-slate-800/20 dark:hover:border-slate-400",
  },
  {
    Icon: LocketIcon,
    link: "https://locket.camera/links/cR2EHusq1NF5WH68A",
    label: "Locket",
    color:
      "hover:bg-yellow-50 hover:border-yellow-400 hover:text-yellow-600 dark:hover:bg-yellow-900/20 dark:hover:border-yellow-400",
  },
  {
    Icon: GithubIcon,
    link: "https://github.com/Thinh521",
    label: "GitHub",
    color:
      "hover:bg-gray-50 hover:border-gray-700 hover:text-gray-800 dark:hover:bg-gray-800/20 dark:hover:border-gray-400",
  },
];
const SocialLinks = () => {
  return (
    <div>
      <ul className="flex flex-wrap gap-3" role="list">
        {SOCIAL_LINKS.map(({ Icon, link, label, color }, index) => (
          <li key={`${label}-${index}`}>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${label} profile`}
              className={`group relative block p-2.5 border border-neutral-300 dark:border-neutral-600 
                           transition-all duration-300 ease-in-out
                           rounded-xl shadow-sm hover:shadow-md
                           transform hover:scale-105 hover:-translate-y-0.5
                           ${color}`}
            >
              <div className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
                <Icon />
              </div>

              <span
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                           bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 
                           text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 
                           transition-opacity duration-200 pointer-events-none whitespace-nowrap"
              >
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinks;
