import { Chronogarten } from "./chronogarten";

/*
 * All concept tests enter the page through this boundary. Future variants can
 * replace Chronogarten here without touching the surrounding page structure.
 */
export function ActiveIntroConcept({
  onChooseService,
}: {
  onChooseService?: (service: string) => void;
}) {
  return <Chronogarten onChooseService={onChooseService} />;
}
