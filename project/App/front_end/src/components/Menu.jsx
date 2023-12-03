import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { cn } from "../utilities/cn";

const Menu = ({ open, setOpen, children, Contents }) => {
  const controls = useAnimationControls();

  async function closeMenu() {
    await controls.start("close");
    setOpen(false);
  }

  useEffect(() => {
    if (open) {
      controls.start("open");
    }
  }, [open, controls]);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <div>{children}</div>
      </DropdownMenu.Trigger>

      <AnimatePresence>
        {open && (
          <DropdownMenu.Portal forceMount>
            <DropdownMenu.Content
              align="end"
              className="light-theme z-[9999999] mt-2 select-none rounded-xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-950 shadow-md"
              asChild
            >
              <motion.div
                initial={"open"}
                animate={controls}
                exit={"close"}
                variants={{
                  open: {
                    opacity: 1,
                    transition: { ease: "easeOut", duration: 0.3 },
                  },
                  close: {
                    opacity: 0,
                    transition: { ease: "easeIn", duration: 0.2 },
                  },
                }}
              >
                {<Contents closeMenu={closeMenu} />}
                {/* <DropdownMenu.Arrow className="fill-white stroke-gray-400" /> */}
              </motion.div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        )}
      </AnimatePresence>
    </DropdownMenu.Root>
  );
};

export const MenuItem = ({ children, onSelect, closeMenu, className }) => {
  const controls = useAnimationControls();
  return (
    <DropdownMenu.Item
      onSelect={async (e) => {
        e.preventDefault();

        await controls.start({
          backgroundColor: "rgb(42, 44, 49)",
          transition: { duration: 0.05 },
        });

        await controls.start({
          backgroundColor: "rgb(42, 44, 49)",
          transition: { duration: 0.05 },
        });
        await sleep(0.75);

        closeMenu();
        onSelect();
      }}
      className={`${cn(
        `cursor-pointer select-none rounded-md text-sm text-white outline-none focus:bg-skin-secondary focus:outline-none data-[highlighted]:bg-gray-100/10`,
        className,
      )}`}
      asChild
    >
      <motion.div animate={controls} className="">
        {children}
      </motion.div>
    </DropdownMenu.Item>
  );
};

async function sleep(time) {
  new Promise((resolve) => setTimeout(resolve, time * 1000));
}

export default Menu;
