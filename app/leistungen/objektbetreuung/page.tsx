import { ServicePage } from "../service-page";
import {
  buildServiceMetadata,
  servicePages,
} from "../service-data";

const service = servicePages.objektbetreuung;

export const metadata = buildServiceMetadata(service);

export default function ObjektbetreuungPage() {
  return <ServicePage service={service} />;
}
