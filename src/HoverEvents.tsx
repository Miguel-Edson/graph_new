import { useRegisterEvents } from "@react-sigma/core";
import { FC, useEffect } from "react";

export const HoverEvents: FC<{ setHoveredNode: (node: string | null) => void }> = ({
  setHoveredNode,
}) => {
  const registerEvents = useRegisterEvents();

  useEffect(() => {
    if (!registerEvents) return;

    registerEvents({
      enterNode: ({ node }) => {
        setHoveredNode(node);
      },
      leaveNode: () => {
        setHoveredNode(null);
      },
    });
  }, [registerEvents, setHoveredNode]);

  return null;
};
export default HoverEvents;