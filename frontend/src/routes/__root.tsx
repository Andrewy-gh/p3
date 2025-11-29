import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const RootLayout = () => (
  <>
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
      <span>•</span>
      <Link to="/genkit-chat" className="[&.active]:font-bold">
        Genkit Chat
      </Link>
      <span>•</span>
      <Link to="/element-playground" className="[&.active]:font-bold">
        Element Playground
      </Link>
      <span>•</span>
      <Link to="/playground" className="[&.active]:font-bold">
        Playground
      </Link>
      <span>•</span>
      <DropdownMenu>
        <DropdownMenuTrigger>01 - Basics</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link to="/stream-text-to-ui" className="[&.active]:font-bold">
              01.6 - Stream text to UI
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/system-prompts" className="[&.active]:font-bold">
              01.7 - System prompts
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              to="/passing-imags-and-files"
              className="[&.active]:font-bold"
            >
              01.8 - Passing images and files
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <span>•</span>
      <DropdownMenu>
        <DropdownMenuTrigger>02 - Naive Agents</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link to="/tool-calling" className="[&.active]:font-bold">
              02.1 - Tool Calling
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <span>•</span>
    </div>
    <hr />
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
