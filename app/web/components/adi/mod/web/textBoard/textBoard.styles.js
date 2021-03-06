let emptyData = {
  subtitle: {
    emptyInput: 'adi.mixPosition.subtitle',
    emptyLink: '',
    emptyLinkTarget: '_blank'
  },
  title: {
    emptyInput: 'adi.text.title',
    emptyLink: '',
    emptyLinkTarget: '_blank'
  },
  paragraph: {
    emptyAutoSizeInput: 'adi.text.paragraph'
  },
  board: {
    desc: 'adi.board.desc'
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
      title: ['bigtitle', 'title'],
      subtitle: ['subtitle', 'subColor'],
      paragraph: ['auxiliaryText', 'paragraph']
    },
    options: {
      theme: {},
      config: { ...emptyData }
    }
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
      title: ['bigtitle', 'title'],
      subtitle: ['subtitle', 'subColor'],
      paragraph: ['auxiliaryText', 'paragraph']
    },
    options: {
      theme: {},
      config: { ...emptyData }
    }
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
        width: '50%',
        'overflow-y': 'auto'
      },
      colGroupAA: {
        width: '50%'
      },
      '@media only screen and (max-width: 768px)': {
        colBoard: {
          width: '100%',
          'overflow-y': 'visible'
        },
        colGroupAA: {
          width: '100%'
        }
      }
    },
    props: {},
    theme: {
      root: ['mod-space'],
      colGroupARow: ['mod-full-width'],
      title: ['bigtitle', 'title'],
      subtitle: ['subtitle', 'subColor'],
      paragraph: ['auxiliaryText', 'paragraph']
    },
    options: {
      theme: {},
      config: { ...emptyData }
    }
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
        width: '50%',
        'overflow-y': 'auto'
      },
      colGroupAA: {
        width: '50%'
      },
      '@media only screen and (max-width: 768px)': {
        colBoard: {
          width: '100%',
          'overflow-y': 'visible'
        },
        colGroupAA: {
          width: '100%'
        }
      }
    },
    props: {},
    theme: {
      root: ['mod-space'],
      colGroupARow: ['mod-full-width'],
      title: ['bigtitle', 'title'],
      subtitle: ['subtitle', 'subColor'],
      paragraph: ['auxiliaryText', 'paragraph']
    },
    options: {
      theme: {},
      config: { ...emptyData }
    }
  }
]
