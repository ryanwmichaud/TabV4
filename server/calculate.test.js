
const { solve } = require('./main');



test('C on 1 c string', () => {
    const x = solve([ 'C'], [    true, false, false, false, false, false, false,  false, false, false, false,  false  ] ,13 )
    expect(x).toStrictEqual([ [ 12, [ 0, 'C' ] ] ] );


})

test('C6 on standard guitar', ()=>{
    const y = solve(
        [ 'Ignore', 'A', 'D', 'G', 'B', 'Ignore' ],
        [
            true,  false, false,
            false, true,  false,
            false, true,  false,
            true,  false, false
        ],
        4)

    expect(y).toStrictEqual(
        [
            [
              0,
              [ 'X', 'X' ],
              [ 1, 'C' ],
              [ 0, 'G' ],
              [ 2, 'E' ],
              [ 0, 'A' ],
              [ 'X', 'X' ]
            ],
            [
              2,
              [ 'X', 'X' ],
              [ 3, 'E' ],
              [ 0, 'A' ],
              [ 3, 'G' ],
              [ 1, 'C' ],
              [ 'X', 'X' ]
            ],
            [
              5,
              [ 'X', 'X' ],
              [ 3, 'G' ],
              [ 0, 'C' ],
              [ 2, 'A' ],
              [ 2, 'E' ],
              [ 'X', 'X' ]
            ],
            [
              9,
              [ 'X', 'X' ],
              [ 1, 'A' ],
              [ 0, 'E' ],
              [ 1, 'C' ],
              [ 1, 'G' ],
              [ 'X', 'X' ]
            ],
            [
              12,
              [ 'X', 'X' ],
              [ 1, 'C' ],
              [ 0, 'G' ],
              [ 2, 'E' ],
              [ 0, 'A' ],
              [ 'X', 'X' ]
            ]
          ]
    )
       

})
