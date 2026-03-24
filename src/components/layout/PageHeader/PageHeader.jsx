import Divider from "../../Divider/Divider";
import { VerifiedIcon } from "../../Icons/Icons";

const PageHeader = ({
  title,
  subtitle,
  verified = false,
  rightContent = null,
  className = "",
}) => {
  return (
    <header className={`mb-5 ${className}`}>
      <div className="flex items-end justify-between mb-5">
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-playfair text-3xl font-bold mb-3 text-black dark:text-white tracking-tight text-left">
              {title}
            </h1>
            {verified && (
              <div className="-mt-3">
                <VerifiedIcon />
              </div>
            )}
          </div>

          {subtitle && (
            <p className="text-sm text-left text-neutral-700 dark:text-neutral-300">
              {subtitle}
            </p>
          )}
        </div>

        {rightContent}
      </div>

      <Divider />
    </header>
  );
};

export default PageHeader;
