import { ServicePage } from "../service-page";
import {
  buildServiceMetadata,
  servicePages,
} from "../service-data";

const service = servicePages.entruempelung;

export const metadata = buildServiceMetadata(service);

export default function EntruempelungPage() {
  return <ServicePage service={service} />;
}
