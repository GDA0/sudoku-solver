const chai = require('chai')
const assert = chai.assert

const SudokuSolver = require('../controllers/sudoku-solver.js')
const solver = new SudokuSolver()

const validPuzzle =
  '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'

suite('UnitTests', () => {
  suite('solver tests', function () {
    test('Logic handles a valid puzzle string of 81 characters', function (done) {
      assert.isTrue(solver.validate(validPuzzle))
      done()
    })

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function (done) {
      const inValidPuzzle =
        '1.5..2.84..63.12.7.2..5..g..9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      assert.isFalse(solver.validate(inValidPuzzle))
      done()
    })

    test('Logic handles a puzzle string that is not 81 characters in length', function (done) {
      const inValidPuzzle =
        '1.5..2.84..63.12.7.2..5.......9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      assert.isFalse(solver.validate(inValidPuzzle))
      done()
    })

    test('Logic handles a valid row placement', function (done) {
      assert.isTrue(solver.checkRowPlacement(validPuzzle, 0, 2, '9'))
      done()
    })

    test('Logic handles an invalid row placement', function (done) {
      assert.isFalse(solver.checkRowPlacement(validPuzzle, 0, 2, '1'))
      done()
    })

    test('Logic handles a valid column placement', function (done) {
      assert.isTrue(solver.checkColPlacement(validPuzzle, 0, 2, '8'))
      done()
    })

    test('Logic handles an invalid column placement', function (done) {
      assert.isFalse(solver.checkColPlacement(validPuzzle, 0, 2, '9'))
      done()
    })

    test('Logic handles a valid region (3x3 grid) placement', function (done) {
      assert.isTrue(solver.checkRegionPlacement(validPuzzle, 0, 2, '3'))
      done()
    })

    test('Logic handles an invalid region (3x3 grid) placement', function (done) {
      assert.isFalse(solver.checkRegionPlacement(validPuzzle, 0, 2, '1'))
      done()
    })

    test('Valid puzzle strings pass the solver', function (done) {
      assert.equal(
        solver.solve(validPuzzle),
        '135762984946381257728459613694517832812936745357824196473298561581673429269145378'
      )
      done()
    })

    test('Invalid puzzle strings fail the solver', function (done) {
      const inValidPuzzle =
        '115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      assert.isFalse(solver.solve(inValidPuzzle))
      done()
    })

    test('Solver returns the expected solution for an incomplete puzzle', function (done) {
      assert.equal(
        solver.solve(
          '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1'
        ),
        '218396745753284196496157832531672984649831257827549613962415378185763429374928561'
      )
      done()
    })
  })
})
