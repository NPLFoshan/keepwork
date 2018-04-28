export default [
  // template 0
  [
    { colGroup: 'media' },
    {
      colCouple: [
        { colTitle: 'title' },
        { colSubtitle: 'subtitle' },
        { colParagraph: 'paragraph' }
      ]
    }
  ],

  // template 1
  [
    {
      colGroup: [
        {
          colGroupA: [
            { colMedia: 'media' },
            {
              colGroupAA: [
                { colTitle: 'title' },
                { colSubtitle: 'subtitle' },
                { colParagraph: 'paragraph' },
                { colButton: 'button' }
              ]
            }
          ]
        },
        {
          colGroupB: [
            { colMedia: 'mediaTwo' },
            {
              colGroupBA: [
                { colTitle: 'titleTwo' },
                { colSubtitle: 'subtitleTwo' },
                { colParagraph: 'paragraphTwo' },
                { colButton: 'buttonTwo' }
              ]
            }
          ]
        }
      ]
    }
  ]
]
