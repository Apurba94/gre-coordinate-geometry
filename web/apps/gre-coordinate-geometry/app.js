/* Coordinate Geometry: slopes, lines, distance and intercepts on a drawn coordinate plane. */
(function () {
  'use strict';
  const NAMES = SK.QUANT_TOPICS.coord;
  const RULES = [['Slope', '(y_{2} − y_{1}) ÷ (x_{2} − x_{1}). Rising lines have positive slope.'], ['Line', 'y = mx + b: m is the slope, b is where the line crosses the y-axis.'], ['Parallel', 'Equal slopes.'], ['Perpendicular', 'Slopes multiply to −1.'], ['Distance', 'sqrt{(x_{2} − x_{1})^{2} + (y_{2} − y_{1})^{2}}: the Pythagorean theorem.'], ['Midpoint', 'Average the x values and average the y values.']];
  const App = {
    about: 'Practise coordinate geometry with a drawn plane for every question: slope between two points, distance, perpendicular slopes and y-intercepts. Generated questions with worked steps, and a plotting tool to see how m and b move a line.',
    how: ['Practise in **Practice**.', 'Learn the six rules in **Rules**.', 'Use **Plot a line** to see slope and intercept change the line.'],
    tabs: [
      SK.quantTab('practice', 'Practice', NAMES),
      { id: 'rules', label: 'Rules', render(el) { el.appendChild(SK.card('Rules', SK.table(['Idea', 'Rule'], RULES.map(([a, b]) => [a, SK.h('span', {}, SK.rich(b))]), false))); } },
      { id: 'plot', label: 'Plot a line', render(el) {
        const m = SK.h('input', { type: 'number', step: 0.5, value: 2, style: { width: '7ch' }, oninput: () => draw() });
        const b = SK.h('input', { type: 'number', step: 1, value: -3, style: { width: '7ch' }, oninput: () => draw() });
        const out = SK.h('div', {});
        const draw = () => { SK.clear(out); const M = Number(m.value) || 0, B = Number(b.value) || 0; out.appendChild(SK.figures.plane({ points: [[0, B]], slope: M, b: B })); out.appendChild(SK.h('p', {}, SK.rich('y = ' + M + 'x ' + (B < 0 ? '− ' + -B : '+ ' + B) + '. It crosses the y-axis at (0, ' + B + ')' + (M !== 0 ? ' and the x-axis at (' + SK.round(-B / M, 2) + ', 0).' : '.')))); };
        el.appendChild(SK.card('Plot y = mx + b', SK.h('div', { class: 'sk-row' }, SK.field('Slope m', m), SK.field('Intercept b', b)), out));
        draw();
      } },
    ],
    checks: { 'generated sets are valid, and every figure is a coordinate plane': (data, assert) => { for (let s = 1; s < 40; s++) for (const q of SK.makeQuant(NAMES, 8, s)) { assert.deepEqual(SK.validateItem(q), []); if (q.figure) assert.equal(q.figure.kind, 'plane'); else assert.equal(q.template, 'perpendicular'); } } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
