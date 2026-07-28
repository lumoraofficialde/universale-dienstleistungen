import { ServicePage } from "../service-page";
import {
  buildServiceMetadata,
  servicePages,
} from "../service-data";

const service = servicePages.winterdienst;

export const metadata = buildServiceMetadata(service);

export default function WinterdienstPage() {
  return <ServicePage service={service} />;
}
