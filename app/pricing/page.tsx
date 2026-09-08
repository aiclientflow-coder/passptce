import { PricingClient } from "@/components/PricingClient";
import { stripeConfigured } from "@/lib/access";

export default function PricingPage() {
  return <PricingClient stripeReady={stripeConfigured()} />;
}
