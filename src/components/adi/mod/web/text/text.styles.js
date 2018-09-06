let emptyData = {
  titleB: {
    emptyName: 'adi.text.titleB',
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  titleC: {
    emptyName: 'adi.text.titleC',
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  titleD: {
    emptyName: 'adi.text.titleD',
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  subtitleB: {
    emptyName: 'adi.text.subtitleB',
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  subtitleC: {
    emptyName: 'adi.text.subtitleC',
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  subtitleD: {
    emptyName: 'adi.text.subtitleD',
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  paragraphB: {
    emptyData: 'adi.text.paragraphB'
  },
  paragraphC: {
    emptyData: 'adi.text.paragraphC'
  },
  paragraphD: {
    emptyData: 'adi.text.paragraphD'
  },
  buttonB: {
    emptyName: 'adi.text.button',
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  buttonC: {
    emptyName: 'adi.text.button',
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  buttonD: {
    emptyName: 'adi.text.button',
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  title: {
    emptyName: 'adi.text.title',
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  subtitle: {
    emptyName: 'adi.text.subtitle',
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  paragraph: {
    emptyData: 'adi.text.paragraph'
  },
  button: {
    emptyName: 'adi.text.button',
    emptyLink: '#',
    emptyTarget: '_blank'
  }
}

export default [
  // style 0
  {
    data: {
      title: {
        'text-align': 'left',
        'margin-bottom': '20px'
      }
    },
    props: {
      rootRow: { gutter: 10 }
    },
    theme: {
      root: ['mod-space'],
      colGroupRow: ['mod-full-width'],
      title: ['bigtitle', 'title'],
      paragraph: ['auxiliaryText', 'paragraph']
    },
    options: {
      theme: {},
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/text/text1.png'),
    preview: {
      outter: {
        height: '70px'
      }
    }
  },
  // style 1
  {
    data: {
      title: {
        'text-align': 'center',
        'margin-bottom': '20px'
      }
    },
    props: {
      rootRow: { gutter: 10 }
    },
    theme: {
      root: ['mod-space'],
      colGroupRow: ['mod-full-width'],
      title: ['bigtitle', 'title'],
      paragraph: ['auxiliaryText', 'paragraph']
    },
    options: {
      theme: {},
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/text/text2.png'),
    preview: {
      outter: {
        height: '70px'
      }
    }
  },
  // style 2
  {
    data: {},
    props: {},
    theme: {
      root: ['mod-space', 'rootColor', 'fontsColor'],
      paragraph: ['mod-full-width', 'auxiliaryText']
    },
    options: {
      theme: {},
      config: {
        paragraph: emptyData.paragraph
      }
    },
    preview: {
      outter: {
        height: '70px'
      }
    }
  },
  // style 3
  {
    templateID: 2,
    data: {
      colGroupRow: {
        display: 'flex',
        'flex-direction': 'row',
        'align-items': 'flex-start',
        'justify-content': 'center'
      },
      colGroupA: {
        width: '22%'
      },
      colGroupB: {
        width: 'auto',
        margin: '0 3px 0 3px'
      },
      colGroupC: {
        width: '22%',
        margin: '0 3px 0 0'
      },
      colGroupD: {
        width: 'auto'
      },
      button: {
        'text-align': 'center'
      },
      buttonB: {
        'text-align': 'center'
      },
      buttonC: {
        'text-align': 'center'
      },
      buttonD: {
        'text-align': 'center'
      },
      '@media only screen and (max-width: 867px)': {
        colGroupRow: {
          display: 'block'
        },
        colGroupA: {
          width: '100%'
        },
        colGroupB: {
          width: '100%',
          margin: '20px 0 10px 0'
        },
        colGroupC: {
          width: '100%',
          margin: '10px 0 20px 0'
        },
        colGroupD: {
          width: '100%'
        },
        buttonA: {
          'text-align': 'center'
        },
        buttonB: {
          'text-align': 'center'
        },
        buttonC: {
          'text-align': 'center'
        },
        buttonD: {
          'text-align': 'center'
        }
      }
    },
    props: {
      rootRow: { gutter: 10 }
    },
    theme: {
      root: ['mod-space'],
      colGroupRow: ['mod-full-width'],
      title: ['bigtitle', 'title'],
      titleB: ['bigtitle', 'title'],
      titleC: ['bigtitle', 'title'],
      titleD: ['bigtitle', 'title'],
      subtitle: ['subtitle', 'title'],
      subtitleB: ['subtitle', 'title'],
      subtitleC: ['subtitle', 'title'],
      subtitleD: ['subtitle', 'title'],
      paragraph: ['auxiliaryText', 'paragraph'],
      paragraphB: ['auxiliaryText', 'paragraph'],
      paragraphC: ['auxiliaryText', 'paragraph'],
      paragraphD: ['auxiliaryText', 'paragraph'],
      button: ['buttonText', 'title'],
      buttonB: ['buttonText', 'title'],
      buttonC: ['buttonText', 'title'],
      buttonD: ['buttonText', 'title']
    },
    options: {
      theme: {
        buttonA: {
          buttonAStyle: {
            'border-color': 'title'
          }
        },
        buttonB: {
          buttonBStyle: {
            'border-color': 'title'
          }
        },
        buttonC: {
          buttonCStyle: {
            'border-color': 'title'
          }
        },
        buttonD: {
          buttonDStyle: {
            'border-color': 'title'
          }
        }
      },
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/text/text1.png'),
    preview: {
      outter: {
        height: '70px'
      }
    }
  },
  // style 4
  {
    templateID: 3,
    data: {
      colGroupRow: {
        display: 'flex',
        'flex-direction': 'row',
        'align-items': 'flex-start',
        'justify-content': 'center'
      },
      colGroupA: {
        width: 'auto',
        'margin-right': '2.5%'
      },
      colGroupB: {
        width: 'auto',
        'margin-left': '2.5%'
      },
      buttonA: {
        'text-align': 'center'
      },
      buttonB: {
        'text-align': 'center'
      },
      '@media only screen and (max-width: 867px)': {
        colGroupRow: {
          display: 'block'
        },
        colGroupA: {
          width: '100%'
        },
        colGroupB: {
          width: '100%',
          'margin-top': '20px'
        },
        buttonA: {
          'text-align': 'center'
        },
        buttonB: {
          'text-align': 'center'
        }
      }
    },
    props: {
      rootRow: { gutter: 10 }
    },
    theme: {
      root: ['mod-space'],
      colGroupRow: ['mod-full-width'],
      title: ['bigtitle', 'title'],
      titleB: ['bigtitle', 'title'],
      subtitle: ['subtitle', 'title'],
      subtitleB: ['subtitle', 'title'],
      paragraph: ['auxiliaryText', 'paragraph'],
      paragraphB: ['auxiliaryText', 'paragraph'],
      button: ['buttonText', 'title'],
      buttonB: ['buttonText', 'title']
    },
    options: {
      theme: {
        buttonA: {
          buttonAStyle: {
            'border-color': 'title'
          }
        },
        buttonB: {
          buttonBStyle: {
            'border-color': 'title'
          }
        }
      },
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/text/text1.png'),
    preview: {
      outter: {
        height: '70px'
      }
    }
  }
]
