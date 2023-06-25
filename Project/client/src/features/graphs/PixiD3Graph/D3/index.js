import {pixiGraphics} from './pixiGraphics'
import {GlobalInput} from './globalInput'

export function D3GraphPixi(){
  const graphics = pixiGraphics(graph, layout,renderer,stage);

  // Listen to mouse events and update graph acoordingly:
  GlobalInput(graphics, layout);

  // begin animation loop:
  renderFrame();

  function renderFrame() {
    graphics.renderFrame();
    requestAnimFrame(renderFrame);
  }
}
function D3GraphPixi(rerender,stage){
  const graph = require('ngraph.generators').path(40)
  const layout = createLayout(graph);
  const graphics = pixiGraphics(graph, layout,renderer,stage);
  // Listen to mouse events and update graph acoordingly:
  GlobalInput(graphics, layout);
  // begin animation loop:
  renderFrame();
  function renderFrame() {
    graphics.renderFrame();
    requestAnimFrame(renderFrame);
  }
}
export function createLayout(graph) {
  const layout = require('ngraph.forcelayout');

  return layout(graph, {
          springLength: 30,
          springCoeff: 0.0008,
          dragCoeff: 0.01,
          gravity: -1.2,
          theta: 1
        });
}