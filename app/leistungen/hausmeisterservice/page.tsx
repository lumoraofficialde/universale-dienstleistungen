import { ServicePage } from "../service-page";
import {
  buildServiceMetadata,
  servicePages,
} from "../service-data";

const service = servicePages.hausmeisterservice;

export const metadata = buildServiceMetadata(service);

export default function HausmeisterservicePage() {
  return <ServicePage service={service} />;
}
