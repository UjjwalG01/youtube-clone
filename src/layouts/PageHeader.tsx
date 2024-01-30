import {
  ArrowLeft,
  Bell,
  ChevronLeft,
  Menu,
  Mic,
  Search,
  Upload,
  User,
} from "lucide-react";
import logo from "../assets/STREAMYY-LOGO.png";
import { Button } from "../components/Button";
import { useState } from "react";
import { useSidebarContext } from "../contexts/SidebarContext";

export const PageHeader = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <PageHeaderFirstSection hidden={showFullWidthSearch} />
      {showFullWidthSearch && (
        <Button
          onClick={() => setShowFullWidthSearch(false)}
          size={"icon"}
          variant={"ghost"}
          type="button"
          className="flex-shrink-0"
        >
          <ArrowLeft />
        </Button>
      )}
      <form
        className={`gap-4 flex-grow items-center justify-center ${
          showFullWidthSearch ? "flex" : "hidden md:flex"
        }`}
      >
        <div className={`flex flex-grow max-w-[600px]`}>
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border 
                shadow-inner shadow-secondary py-1 px-4 text-lg w-full 
                focus:border-green-500 outline-none"
          />
          <Button className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0">
            <Search />
          </Button>
        </div>
        <Button size={"icon"} type="button" className="flex-shrink-0">
          <Mic />
        </Button>
      </form>
      <div
        className={`flex-shrink-0 md:gap-2 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}
      >
        <Button
          onClick={() => setShowFullWidthSearch(true)}
          variant={"ghost"}
          size={"icon"}
          className="md:hidden"
        >
          <Search />
        </Button>
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <Mic />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <Upload />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <Bell />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <User />
        </Button>
      </div>
    </div>
  );
};

type PageHeaderFirstSectionProps = {
  hidden?: boolean;
};

export function PageHeaderFirstSection({
  hidden = false,
}: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext();
  return (
    <div
      className={`flex items-center gap-4 flex-shrink-0 ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <Button onClick={toggle} variant={"ghost"} size={"icon"}>
        <Menu />
      </Button>
      <a href="/" className="w-fit">
        {/* <Clapperboard size={28} color="#5900ff" strokeWidth={2.25} /> */}
        <img src={logo} className="h-12" alt="" />
      </a>
    </div>
  );
}
