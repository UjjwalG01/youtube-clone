import {
  ChevronDown,
  ChevronUp,
  ClapperboardIcon,
  Clock,
  FlameIcon,
  Gamepad2Icon,
  HistoryIcon,
  HomeIcon,
  LibraryIcon,
  ListVideo,
  Music4,
  RepeatIcon,
  ThumbsUp,
  Trophy,
  UserSquare,
  VideoIcon,
} from "lucide-react";
import { Children, ElementType, ReactNode, useState } from "react";
import { Button, buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";
import { playlists, subscriptions } from "../data/sidebar";
import { useSidebarContext } from "../contexts/SidebarContext";
import { PageHeaderFirstSection } from "./PageHeader";

type SmallSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

export function Sidebar() {
  const { isSmallOpen, isLargeOpen, close } = useSidebarContext();
  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSidebarItem Icon={HomeIcon} title="Home" url="/" />
        <SmallSidebarItem Icon={RepeatIcon} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={ClapperboardIcon}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={LibraryIcon} title="Library" url="/library" />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-70"
        />
      )}
      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className="lg:hidden pt-2 pb-4 px-4 sticky top-0 bg-white">
          <PageHeaderFirstSection />
        </div>
        {/* Home section */}
        <LargeSidebarSection>
          <LargeSidebarItem
            isActive
            IconOrImgUrl={HomeIcon}
            title="Home"
            url="/"
          />
          <LargeSidebarItem
            IconOrImgUrl={RepeatIcon}
            title="Shorts"
            url="/shorts"
          />
          <LargeSidebarItem
            IconOrImgUrl={ClapperboardIcon}
            title="Subscriptions"
            url="/subscriptions"
          />
        </LargeSidebarSection>
        <hr />
        {/* You Section */}
        <LargeSidebarSection visibleItemCount={5} title="You">
          <LargeSidebarItem
            IconOrImgUrl={UserSquare}
            title="Your Channel"
            url="/your-channel"
          />
          <LargeSidebarItem
            IconOrImgUrl={HistoryIcon}
            title="History"
            url="/history"
          />
          <LargeSidebarItem
            IconOrImgUrl={VideoIcon}
            title="Your videos"
            url="/your-videos"
          />
          <LargeSidebarItem
            IconOrImgUrl={Clock}
            title="Watch Later"
            url="/watch-later"
          />
          <LargeSidebarItem
            IconOrImgUrl={ThumbsUp}
            title="Liked videos"
            url="/liked-videos"
          />
          {playlists.map((playlist) => (
            <LargeSidebarItem
              IconOrImgUrl={ListVideo}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        {/* Subscriptions Section */}
        <LargeSidebarSection title="Subscriptions">
          {subscriptions.map((subscription) => (
            <LargeSidebarItem
              IconOrImgUrl={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={5} title="Explore">
          <LargeSidebarItem
            IconOrImgUrl={FlameIcon}
            title="Trending"
            url="/trending"
          />
          <LargeSidebarItem IconOrImgUrl={Music4} title="Music" url="/music" />
          <LargeSidebarItem
            IconOrImgUrl={Gamepad2Icon}
            title="Gaming"
            url="/gaming"
          />
          <LargeSidebarItem
            IconOrImgUrl={Trophy}
            title="Sports"
            url="/sports"
          />
        </LargeSidebarSection>
      </aside>
    </>
  );
}

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}

type LargeSidebarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

type LargeSidebarItemProps = {
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const showExpandedButton = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandedButton && (
        <Button
          onClick={() => setIsExpanded((e) => !e)}
          variant="ghost"
          className="w-full flex items-center rounded-lg gap-4 p-3"
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </div>
  );
}

function LargeSidebarItem({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: LargeSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      {typeof IconOrImgUrl === "string" ? (
        <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" />
      ) : (
        <IconOrImgUrl className="w-6 h-6 " />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}
