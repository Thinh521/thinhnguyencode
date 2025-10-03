import Divider from "../Divider/Divider";
import { VerifiedIcon } from "../Icons/Icons";

const Header = ({ title, subtitle, verified = false }) => {
  return (
    <>
      <header className="text-center mb-5">
        {verified ? (
          <div className="flex items-center gap-1.5 mb-2">
            <h1 className="font-playfair text-3xl font-bold mb-3 text-gray-900 dark:text-white tracking-tight text-left">
              {title}
            </h1>
            <div className="-mt-3">
              <VerifiedIcon />
            </div>
          </div>
        ) : (
          <h1 className="font-playfair text-3xl font-bold mb-3 text-gray-900 dark:text-white tracking-tight text-left">
            {title}
          </h1>
        )}
        <p className="text-sm text-left">
          {subtitle}
        </p>
      </header>

      <section className="mb-5">
        <Divider />
      </section>
    </>
  );
};

export default Header;
