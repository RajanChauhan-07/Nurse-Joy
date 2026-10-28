// This is a demo of a preview
// That's what users will see in the preview

import { FullScreenSignup } from "@/components/ui/full-screen-signup";

const DemoOne = () => {
  return <FullScreenSignup />;
};

// IMPORTANT:
// format of the export MUST be export default { DemoOneOrOtherName }
const demoExport = { DemoOne };
export default demoExport;
