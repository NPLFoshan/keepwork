export default [
  // template 0
  [
    {
      colGroup: [
        { colBoard: 'board' },
        { colTitle: 'title' },
        { colSubTitle: 'subtitle' },
        { colParagraph: 'paragraph' }
      ]
    }
  ],
  // template 1
  [
    {
      colGroup: [
        { colTitle: 'title' },
        { colSubTitle: 'subtitle' },
        { colParagraph: 'paragraph' },
        { colBoard: 'board' }
      ]
    }
  ],
  // template 2
  // [
  //   { colBoard: 'board' },
  //   {
  //     colGroup: [
  //       { colTitle: 'title' },
  //       { colSubTitle: 'subtitle' },
  //       { colParagraph: 'paragraph' }
  //     ]
  //   }
  // ],
  [
    {
      colGroup: [
        {
          colGroupA: [
            { colBoard: 'board' },
            {
              colGroupAA: [
                { colTitle: 'title' },
                { colSubtitle: 'subtitle' },
                { colParagraph: 'paragraph' }
              ]
            }
          ]
        }
      ]
    }
  ],
  [
    {
      colGroup: [
        {
          colGroupA: [
            {
              colGroupAA: [
                { colTitle: 'title' },
                { colSubtitle: 'subtitle' },
                { colParagraph: 'paragraph' }
              ]
            },
            { colBoard: 'board' }
          ]
        }
      ]
    }
  ]
]
