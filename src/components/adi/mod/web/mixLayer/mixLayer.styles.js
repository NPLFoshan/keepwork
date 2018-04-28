let emptyData = {
  media: {
    emptySrc: require('@/../static/adi/mixLayer/mix-layer.png'),
    emptyLink: 'http://keepwork.com',
    emptyTarget: '_blank'
  },
  title: {
    emptyName: 'adi.mixLayer.title',
    emptyLink: 'http://keepwork.com',
    emptyTarget: '_blank'
  },
  subtitle: {
    emptyName: 'adi.mixLayer.subtitle',
    emptyLink: 'http://keepwork.com',
    emptyTarget: '_blank'
  },
  paragraph: {
    emptyData: 'adi.mixLayer.paragraph'
  },
  button: {
    emptyName: 'adi.mixLayer.button',
    emptyLink: 'http://keepwork.com',
    emptyTarget: '_blank'
  },
  mediaTwo: {
    emptySrc: require('@/../static/adi/mixLayer/mix-layer.png'),
    emptyLink: 'http://keepwork.com',
    emptyTarget: '_blank'
  },
  titleTwo: {
    emptyName: 'adi.mixLayer.title',
    emptyLink: 'http://keepwork.com',
    emptyTarget: '_blank'
  },
  subtitleTwo: {
    emptyName: 'adi.mixLayer.subtitle',
    emptyLink: 'http://keepwork.com',
    emptyTarget: '_blank'
  },
  paragraphTwo: {
    emptyData: 'adi.mixLayer.paragraph'
  },
  buttonTwo: {
    emptyName: 'adi.mixLayer.button',
    emptyLink: 'http://keepwork.com',
    emptyTarget: '_blank'
  }
}
export default [
  // style 0
  {
    templateID: 0,
    data: {
      root: {
        overflow: 'hidden',
        position: 'relative'
      },
      media: {
        height: '689px',
        position: 'relative',
        'z-index': 1
      },
      colGroup: {
        height: '689px'
      },
      colCouple: {
        'margin-top': '-600px',
        position: 'relative',
        'word-wrap': 'break-word',
        'z-index': 2
      },
      title: {
        'margin-bottom': '5px'
      },
      colCoupleRow: {
        'padding-left': '5%',
        'padding-right': '15%'
      },
      '@media only screen and (max-width: 768px)': {
        media: {
          height: '344px'
        },
        colGroup: {
          height: '344px'
        },
        colCouple: {
          'margin-top': '20px',
          'text-align': 'left'
        },
        colCoupleRow: {
          'padding-left': '20px',
          'padding-right': '20px'
        }
      }
    },
    props: {
      colGroup: { span: 24 },
      colCouple: { span: 24 }
    },
    theme: {
      root: ['mod-space'],
      media: ['mod-full-width'],
      title: ['font_1', 'color_1'],
      subtitle: ['font_3', 'color_1'],
      colCoupleRow: ['mod-full-width'],
      paragraph: ['font_9', 'color_1']
    },
    options: {
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/mixLayer/mix1.png'),
    preview: {
      outter: {
        height: '176px'
      },
      inner: {
        'margin-top': '-20px'
      }
    }
  },
  // style 1
  {
    templateID: 0,
    data: {
      root: {
        overflow: 'hidden',
        position: 'relative'
      },
      media: {
        height: '689px',
        position: 'relative',
        'z-index': 1
      },
      colGroup: {
        height: '689px'
      },
      colCouple: {
        'margin-top': '-600px',
        'word-wrap': 'break-word',
        position: 'relative',
        'text-align': 'center',
        'z-index': 2
      },
      title: {
        'margin-bottom': '5px'
      },
      colCoupleRow: {
        'padding-left': '10%',
        'padding-right': '10%'
      },
      '@media only screen and (max-width: 768px)': {
        media: {
          height: '344px'
        },
        colGroup: {
          height: '344px'
        },
        colCouple: {
          'margin-top': '20px',
          'text-align': 'center'
        },
        colCoupleRow: {
          'padding-left': '20px',
          'padding-right': '20px'
        }
      }
    },
    props: {
      colGroup: { span: 24 },
      colCouple: { span: 24 }
    },
    theme: {
      root: ['mod-space'],
      media: ['mod-full-width'],
      title: ['font_1', 'color_1'],
      subtitle: ['font_3', 'color_1'],
      colCoupleRow: ['mod-full-width'],
      paragraph: ['font_9', 'color_1']
    },
    options: {
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/mixLayer/mix2.png'),
    preview: {
      outter: {
        height: '176px'
      },
      inner: {
        'margin-top': '-20px'
      }
    }
  },
  // style 2
  {
    templateID: 0,
    data: {
      root: {
        overflow: 'hidden',
        position: 'relative'
      },
      media: {
        height: '689px',
        position: 'relative',
        'z-index': 1
      },
      colGroup: {
        height: '689px'
      },
      title: {
        'margin-bottom': '5px'
      },
      colCouple: {
        'margin-top': '-600px',
        'word-wrap': 'break-word',
        'text-align': 'right',
        position: 'relative',
        'z-index': 2
      },
      colCoupleRow: {
        'padding-left': '15%',
        'padding-right': '5%'
      },
      '@media only screen and (max-width: 768px)': {
        media: {
          height: '344px'
        },
        colGroup: {
          height: '344px'
        },
        colCouple: {
          'margin-top': '20px',
          'text-align': 'right'
        },
        colCoupleRow: {
          'padding-left': '20px',
          'padding-right': '20px'
        }
      }
    },
    props: {
      colGroup: { span: 24 },
      colCouple: { span: 24 }
    },
    theme: {
      root: ['mod-space'],
      media: ['mod-full-width'],
      title: ['font_1', 'color_1'],
      subtitle: ['font_3', 'color_1'],
      colCoupleRow: ['mod-full-width'],
      paragraph: ['font_9', 'color_1']
    },
    options: {
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/mixLayer/mix3.png'),
    preview: {
      outter: {
        height: '176px'
      },
      inner: {
        'margin-top': '-20px'
      }
    }
  },
  // style 3
  {
    templateID: 0,
    data: {
      root: {
        overflow: 'hidden',
        position: 'relative'
      },
      media: {
        height: '689px',
        position: 'relative',
        'z-index': 1
      },
      colGroup: {
        height: '689px'
      },
      colCouple: {
        'margin-top': '-400px',
        position: 'relative',
        'z-index': 2
      },
      title: {
        'margin-bottom': '5px'
      },
      colCoupleRow: {
        'padding-left': '5%',
        'padding-right': '15%'
      },
      '@media only screen and (max-width: 768px)': {
        media: {
          height: '344px'
        },
        colGroup: {
          height: '344px'
        },
        colCouple: {
          'margin-top': '20px',
          'text-align': 'left'
        },
        colCoupleRow: {
          'padding-left': '20px',
          'padding-right': '20px'
        }
      }
    },
    props: {
      colGroup: { span: 24 },
      colCouple: { span: 24 }
    },
    theme: {
      root: ['mod-space'],
      media: ['mod-full-width'],
      title: ['font_1', 'color_1'],
      subtitle: ['font_3', 'color_1'],
      colCoupleRow: ['mod-full-width'],
      paragraph: ['font_9', 'color_1']
    },
    options: {
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/mixLayer/mix4.png'),
    preview: {
      outter: {
        height: '176px'
      },
      inner: {
        'margin-top': '-20px'
      }
    }
  },
  // style 4
  {
    templateID: 0,
    data: {
      root: {
        overflow: 'hidden',
        position: 'relative'
      },
      media: {
        height: '689px',
        position: 'relative',
        'z-index': 1
      },
      colGroup: {
        height: '689px'
      },
      colCouple: {
        'margin-top': '-400px',
        'text-align': 'center',
        position: 'relative',
        'z-index': 2
      },
      title: {
        'margin-bottom': '5px'
      },
      colCoupleRow: {
        'padding-left': '10%',
        'padding-right': '10%'
      },
      '@media only screen and (max-width: 768px)': {
        media: {
          height: '344px'
        },
        colGroup: {
          height: '344px'
        },
        colCouple: {
          'margin-top': '20px',
          'text-align': 'center'
        },
        colCoupleRow: {
          'padding-left': '20px',
          'padding-right': '20px'
        }
      }
    },
    props: {
      colGroup: { span: 24 },
      colCouple: { span: 24 }
    },
    theme: {
      root: ['mod-space'],
      media: ['mod-full-width'],
      title: ['font_1', 'color_1'],
      subtitle: ['font_3', 'color_1'],
      colCoupleRow: ['mod-full-width'],
      paragraph: ['font_9', 'color_1']
    },
    options: {
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/mixLayer/mix5.png'),
    preview: {
      outter: {
        height: '176px'
      },
      inner: {
        'margin-top': '-20px'
      }
    }
  },
  // style 5
  {
    templateID: 0,
    data: {
      root: {
        overflow: 'hidden',
        position: 'relative'
      },
      media: {
        height: '689px',
        position: 'relative',
        'z-index': 1
      },
      colGroup: {
        height: '689px'
      },
      colCouple: {
        'margin-top': '-400px',
        'text-align': 'right',
        position: 'relative',
        'z-index': 2
      },
      title: {
        'margin-bottom': '5px'
      },
      colCoupleRow: {
        'padding-left': '15%',
        'padding-right': '5%'
      },
      '@media only screen and (max-width: 768px)': {
        media: {
          height: '344px'
        },
        colGroup: {
          height: '344px'
        },
        colCouple: {
          'margin-top': '20px',
          'text-align': 'right'
        },
        colCoupleRow: {
          'padding-left': '20px',
          'padding-right': '20px'
        }
      }
    },
    props: {
      colGroup: { span: 24 },
      colCouple: { span: 24 }
    },
    theme: {
      root: ['mod-space'],
      media: ['mod-full-width'],
      title: ['font_1', 'color_1'],
      subtitle: ['font_3', 'color_1'],
      colCoupleRow: ['mod-full-width'],
      paragraph: ['font_9', 'color_1']
    },
    options: {
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/mixLayer/mix6.png'),
    preview: {
      outter: {
        height: '176px'
      },
      inner: {
        'margin-top': '-20px'
      }
    }
  },
  // style 6
  {
    templateID: 0,
    data: {
      root: {
        overflow: 'hidden',
        position: 'relative'
      },
      media: {
        height: '689px',
        position: 'relative',
        'z-index': 1
      },
      colGroup: {
        height: '689px'
      },
      colCouple: {
        'margin-top': '-250px',
        position: 'relative',
        'z-index': 2
      },
      title: {
        'margin-bottom': '5px'
      },
      colCoupleRow: {
        'padding-left': '5%',
        'padding-right': '15%'
      },
      '@media only screen and (max-width: 768px)': {
        media: {
          height: '344px'
        },
        colGroup: {
          height: '344px'
        },
        colCouple: {
          'margin-top': '20px',
          'text-align': 'left'
        },
        colCoupleRow: {
          'padding-left': '20px',
          'padding-right': '20px'
        }
      }
    },
    props: {
      colGroup: { span: 24 },
      colCouple: { span: 24 }
    },
    theme: {
      root: ['mod-space'],
      media: ['mod-full-width'],
      title: ['font_1', 'color_1'],
      subtitle: ['font_3', 'color_1'],
      colCoupleRow: ['mod-full-width'],
      paragraph: ['font_9', 'color_1']
    },
    options: {
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/mixLayer/mix7.png'),
    preview: {
      outter: {
        height: '176px'
      },
      inner: {
        'margin-top': '-20px'
      }
    }
  },
  // style 7
  {
    templateID: 0,
    data: {
      root: {
        overflow: 'hidden',
        position: 'relative'
      },
      media: {
        height: '689px',
        position: 'relative',
        'z-index': 1
      },
      colGroup: {
        height: '689px'
      },
      colCouple: {
        'margin-top': '-250px',
        'text-align': 'center',
        position: 'relative',
        'z-index': 2
      },
      title: {
        'margin-bottom': '5px'
      },
      colCoupleRow: {
        'padding-left': '10%',
        'padding-right': '10%'
      },
      '@media only screen and (max-width: 768px)': {
        media: {
          height: '344px'
        },
        colGroup: {
          height: '344px'
        },
        colCouple: {
          'margin-top': '20px',
          'text-align': 'center'
        },
        colCoupleRow: {
          'padding-left': '20px',
          'padding-right': '20px'
        }
      }
    },
    props: {
      colGroup: { span: 24 },
      colCouple: { span: 24 }
    },
    theme: {
      root: ['mod-space'],
      media: ['mod-full-width'],
      title: ['font_1', 'color_1'],
      subtitle: ['font_3', 'color_1'],
      colCoupleRow: ['mod-full-width'],
      paragraph: ['font_9', 'color_1']
    },
    options: {
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/mixLayer/mix8.png'),
    preview: {
      outter: {
        height: '176px'
      },
      inner: {
        'margin-top': '-20px'
      }
    }
  },
  // style 8
  {
    templateID: 0,
    data: {
      root: {
        overflow: 'hidden',
        position: 'relative'
      },
      media: {
        height: '689px',
        position: 'relative',
        'z-index': 1
      },
      colGroup: {
        height: '689px'
      },
      colCouple: {
        'margin-top': '-250px',
        'text-align': 'right',
        position: 'relative',
        'z-index': 2
      },
      title: {
        'margin-bottom': '5px'
      },
      colCoupleRow: {
        'padding-left': '15%',
        'padding-right': '5%'
      },
      '@media only screen and (max-width: 768px)': {
        media: {
          height: '344px'
        },
        colGroup: {
          height: '344px'
        },
        colCouple: {
          'margin-top': '20px',
          'text-align': 'right'
        },
        colCoupleRow: {
          'padding-left': '20px',
          'padding-right': '20px'
        }
      }
    },
    props: {
      colGroup: { span: 24 },
      colCouple: { span: 24 }
    },
    theme: {
      root: ['mod-space'],
      media: ['mod-full-width'],
      title: ['font_1', 'color_1'],
      subtitle: ['font_3', 'color_1'],
      colCoupleRow: ['mod-full-width'],
      paragraph: ['font_9', 'color_1']
    },
    options: {
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/mixLayer/mix9.png'),
    preview: {
      outter: {
        height: '176px'
      },
      inner: {
        'margin-top': '-20px'
      }
    }
  },

  // style 9 横向2X1
  {
    templateID: 1,
    data: {
      colMedia: { 'z-index': 1 },
      media: { height: '790px' },
      mediaTwo: { height: '790px' },
      colGroupAA: {
        'z-index': 2,
        'margin-top': '-600px',
        'text-align': 'center'
      },
      colGroupBA: {
        'z-index': 2,
        'margin-top': '-600px',
        'text-align': 'center'
      },
      subtitle: {
        'margin-top': '10px',
        'margin-bottom': '45px'
      },
      colButton: {
        display: 'flex',
        'justify-content': 'center'
      },
      button: {
        width: '110px',
        'margin-top': '10px',
        border: '1px solid #3ba4ff',
        'border-radius': '4px'
      },
      subtitleTwo: {
        'margin-top': '10px',
        'margin-bottom': '45px'
      },
      buttonTwo: {
        width: '110px',
        'margin-top': '10px',
        border: '1px solid #3ba4ff',
        'border-radius': '4px'
      },
      colSpace: { height: '18px' },
      '@media only screen and (max-width: 768px)': {
        media: {
          height: '344px'
        },
        mediaTwo: {
          height: '344px'
        },
        colGroupAA: {
          'margin-top': '35px',
          'text-align': 'left'
        },
        colGroupB: { 'margin-top': '69px' },
        colGroupBA: {
          'margin-top': '35px',
          'text-align': 'left'
        },
        colButton: {
          display: 'flex',
          'justify-content': 'flex-end'
        }
      }
    },
    props: {
      colGroupRow: { gutter: 10 },
      colGroup: { span: 24 },
      colMedia: { span: 24 },
      colGroupA: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      colGroupB: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      colGroupAA: {
        xs: {
          span: 24
        },
        sm: {
          span: 16,
          push: 4
        }
      },
      colGroupBA: {
        xs: {
          span: 24
        },
        sm: {
          span: 16,
          push: 4
        }
      }
    },
    theme: {
      root: ['mod-space', 'mod-full-width'],
      title: ['font_1', 'color_0'],
      subtitle: ['font_3', 'color_0'],
      paragraph: ['font_9', 'color_0'],
      button: ['font_10', 'color_7'],
      titleTwo: ['font_1', 'color_0'],
      subtitleTwo: ['font_3', 'color_0'],
      paragraphTwo: ['font_9', 'color_0'],
      buttonTwo: ['font_10', 'color_7']
    },
    options: {
      theme: {
        button: {
          bgColor: 'color_0'
        },
        buttonTwo: {
          bgColor: 'color_0'
        }
      },
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/mixLayer/horizontalTwo.png'),
    preview: {
      outter: {
        height: '180px'
      },
      inner: {
        'margin-top': '-20px'
      }
    }
  },

  // style 10 纵向2X1
  {
    templateID: 1,
    data: {
      colMedia: { 'z-index': 1 },
      media: { height: '460px' },
      mediaTwo: { height: '460px' },
      colGroupAA: {
        'z-index': 2,
        'margin-top': '-360px'
      },
      colGroupBA: {
        'z-index': 2,
        'margin-top': '-360px'
      },
      subtitle: {
        'margin-top': '10px',
        'margin-bottom': '45px'
      },
      colButton: {
        display: 'flex',
        'justify-content': 'flex-end'
      },
      button: {
        width: '110px',
        'margin-top': '10px',
        border: '1px solid #3ba4ff',
        'border-radius': '4px'
      },
      subtitleTwo: {
        'margin-top': '10px',
        'margin-bottom': '45px'
      },
      buttonTwo: {
        width: '110px',
        'margin-top': '10px',
        border: '1px solid #3ba4ff',
        'border-radius': '4px'
      },
      colGroupB: { 'margin-top': '18px' },
      '@media only screen and (max-width: 768px)': {
        media: {
          height: '344px'
        },
        mediaTwo: {
          height: '344px'
        },
        colGroupAA: {
          'margin-top': '35px'
        },
        colGroupB: { 'margin-top': '69px' },
        colGroupBA: {
          'margin-top': '35px'
        }
      }
    },
    props: {
      colGroup: { span: 24 },
      colMedia: { span: 24 },
      colGroupAA: {
        xs: {
          span: 24
        },
        sm: {
          span: 20,
          push: 2
        }
      },
      colGroupBA: {
        xs: {
          span: 24
        },
        sm: {
          span: 20,
          push: 2
        }
      }
    },
    theme: {
      root: ['mod-space'],
      colGroupRow: ['mod-full-width'],
      title: ['font_1', 'color_0'],
      subtitle: ['font_3', 'color_0'],
      paragraph: ['font_9', 'color_0'],
      button: ['font_10', 'color_7'],
      titleTwo: ['font_1', 'color_0'],
      subtitleTwo: ['font_3', 'color_0'],
      paragraphTwo: ['font_9', 'color_0'],
      buttonTwo: ['font_10', 'color_7']
    },
    options: {
      theme: {
        button: {
          bgColor: 'color_0'
        },
        buttonTwo: {
          bgColor: 'color_0'
        }
      },
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/mixLayer/verticalTwo.png'),
    preview: {
      outter: {
        height: '240px'
      },
      inner: {
        'margin-top': '-20px'
      }
    }
  }
]
