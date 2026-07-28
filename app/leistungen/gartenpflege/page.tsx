import { ServicePage } from "../service-page";
import {
  buildServiceMetadata,
  servicePages,
} from "../service-data";

const service = servicePages.gartenpflege;

export const metadata = buildServiceMetadata(service);

export default function GartenpflegePage() {
  return <ServicePage service={service} />;
}
