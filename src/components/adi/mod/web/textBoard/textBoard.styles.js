let emptyData = {
  subtitle: {
    emptyName: 'adi.mixPosition.subtitle',
    emptyLink: 'http://keepwork.com',
    emptyTarget: '_blank'
  },
  title: {
    emptyName: 'adi.text.title',
    emptyLink: 'http://keepwork.com',
    emptyTarget: '_blank'
  },
  paragraph: {
    emptyData: 'adi.text.paragraph'
  }
}
export default [
  {
    templateID: 0,
    data: {
      colBoard: {
        'margin-bottom': '10px'
      },
      title: {
        'text-align': 'center',
        'margin-bottom': '10px'
      },
      subtitle: {
        'text-align': 'center',
        'margin-bottom': '10px'
      },
      paragraph: {
        'text-align': 'center'
      }
    },
    props: {
      rootRow: { gutter: 10 }
    },
    theme: {
      root: ['mod-space'],
      colGroupRow: ['mod-full-width'],
      title: ['font_2', 'color_4'],
      subtitle: ['font_4', 'color_4'],
      paragraph: ['font_9', 'color_4']
    },
    options: {
      theme: {},
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/text/text1.png')
  },
  {
    templateID: 1,
    data: {
      title: {
        'text-align': 'center',
        'margin-bottom': '10px'
      },
      subtitle: {
        'text-align': 'center',
        'margin-bottom': '10px'
      },
      paragraph: {
        'text-align': 'center',
        'margin-bottom': '10px'
      }
    },
    props: {
      rootRow: { gutter: 10 }
    },
    theme: {
      root: ['mod-space'],
      colGroupRow: ['mod-full-width'],
      title: ['font_2', 'color_4'],
      subtitle: ['font_4', 'color_4'],
      paragraph: ['font_9', 'color_4']
    },
    options: {
      theme: {},
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/text/text1.png')
  },
  {
    templateID: 2,
    data: {
      title: {
        'text-align': 'center',
        'margin-bottom': '10px'
      },
      subtitle: {
        'text-align': 'center',
        'margin-bottom': '10px'
      },
      paragraph: {
        'text-align': 'center'
      },
      colBoard: {
        width: '50%'
      },
      colGroupAA: {
        width: '50%'
      }
    },
    props: {},
    theme: {
      root: ['mod-space'],
      colGroupARow: ['mod-full-width'],
      title: ['font_2', 'color_4'],
      subtitle: ['font_4', 'color_4'],
      paragraph: ['font_9', 'color_4']
    },
    options: {
      theme: {},
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/text/text1.png')
  },
  {
    templateID: 3,
    data: {
      title: {
        'text-align': 'center',
        'margin-bottom': '10px'
      },
      subtitle: {
        'text-align': 'center',
        'margin-bottom': '10px'
      },
      paragraph: {
        'text-align': 'center'
      },
      colBoard: {
        width: '50%'
      },
      colGroupAA: {
        width: '50%'
      }
    },
    props: {},
    theme: {
      root: ['mod-space'],
      colGroupARow: ['mod-full-width'],
      title: ['font_2', 'color_4'],
      subtitle: ['font_4', 'color_4'],
      paragraph: ['font_9', 'color_4']
    },
    options: {
      theme: {},
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/text/text1.png')
  }
]
