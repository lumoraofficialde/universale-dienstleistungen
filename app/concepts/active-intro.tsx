import { TerraSchnitt } from "./terraschnitt";

/*
 * All concept tests enter the page through this boundary. Future variants can
 * replace TerraSchnitt here without touching the surrounding page structure.
 */
export function ActiveIntroConcept() {
  return <TerraSchnitt />;
}
