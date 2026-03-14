import React from "react";
import Macbook from "../../../components/Macbook/Macbook";
import { IMAGES } from "../../../../public/images/imgaes";

const DevIntro = () => {
  return (
    <div className="w-full flex justify-center mt-10">
      <div className="w-full max-w-6xl bg-[#0d0d0d] rounded-xl shadow-xl overflow-hidden border border-[#222]">
        {/* Macbook top bar */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e]">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>

          <span className="text-xs text-gray-400 mx-auto">
            thinh@portfolio ~
          </span>
        </div>

        {/* content */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT */}
          <div className="p-6 text-white space-y-6">
            <img
              src={IMAGES.avatar}
              alt="avatar"
              className="w-32 h-32 rounded-full border-4 border-[#222]"
            />

            <h1 className="font-playfair text-3xl font-bold">Thịnh Nguyễn</h1>

            <div className="space-y-2 text-gray-300 text-sm">
              <p>
                <span className="text-blue-400">role:</span> Mobile Developer
              </p>

              <p>
                <span className="text-blue-400">also:</span> UI Designer
              </p>

              <p>
                <span className="text-blue-400">location:</span> Vietnam
              </p>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              I'm Thịnh, a frontend developer passionate about building modern
              web experiences. I enjoy creating beautiful UI and smooth user
              interactions using React and modern tools.
            </p>
          </div>

          {/* RIGHT TERMINAL */}
          <div className="bg-black text-green-400 p-6 font-mono text-sm">
            <p>Welcome to thinh terminal v1.0.0</p>
            <p className="text-gray-400">Type 'help' to see commands.</p>

            <br />

            <p>
              <span className="text-blue-400">thinh@dev</span>:~
              <span className="text-yellow-400">$</span> _
            </p>

            <Macbook />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevIntro;
