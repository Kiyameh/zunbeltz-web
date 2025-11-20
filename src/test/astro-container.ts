import { experimental_AstroContainer as Container} from "astro/container";
import { type ContainerRenderOptions} from "astro/container";

type AstroComponent = Parameters<Container["renderToString"]>[0];


export async function renderAstroComponent(Component: AstroComponent, options: ContainerRenderOptions = {}){
  const container = await Container.create();
  const innerHtml = await container.renderToString(Component, options);
  return innerHtml;
}
