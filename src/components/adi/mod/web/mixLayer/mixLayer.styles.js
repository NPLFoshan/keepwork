let emptyData = {
  media: {
    emptySrc: require('@/../static/adi/mixLayer/mix-layer.jpg'),
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  mediaA: {
    emptySrc: require('@/../static/adi/mixLayer/mix-layer.jpg'),
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  mediaB: {
    emptySrc: require('@/../static/adi/mixLayer/mix-layer.jpg'),
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  mediaC: {
    emptySrc: require('@/../static/adi/mixLayer/mix-layer.jpg'),
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  mediaD: {
    emptySrc: require('@/../static/adi/mixLayer/mix-layer.jpg'),
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  title: {
    emptyName: 'adi.mixLayer.title',
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  titleA: {
    emptyName: 'adi.mixLayer.title',
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  titleB: {
    emptyName: 'adi.mixLayer.title',
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  titleC: {
    emptyName: 'adi.mixLayer.title',
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  titleD: {
    emptyName: 'adi.mixLayer.title',
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  subtitle: {
    emptyName: 'adi.mixLayer.subtitle',
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  subtitleA: {
    emptyName: 'adi.mixLayer.subtitle',
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  subtitleB: {
    emptyName: 'adi.mixLayer.subtitle',
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  subtitleC: {
    emptyName: 'adi.mixLayer.subtitle',
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  subtitleD: {
    emptyName: 'adi.mixLayer.subtitle',
    emptyLink: '#',
    emptyTarget: '_blank'
  },
  paragraph: {
    emptyData: 'adi.mixLayer.paragraph'
  },
  paragraphA: {
    emptyData: 'adi.mixLayer.paragraph'
  },
  paragraphB: {
    emptyData: 'adi.mixLayer.paragraph'
  },
  paragraphC: {
    emptyData: 'adi.mixLayer.paragraph'
  },
  paragraphD: {
    emptyData: 'adi.mixLayer.paragraph'
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
      colGroup: {
        'background-color': '#000',
        float: 'none',
        padding: 0
      },
      colMedia: {
        height: '689px'
      },
      media: {
        height: '689px',
        position: 'relative',
        'z-index': 1,
        opacity: '0.5'
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
          height: '344px',
          opacity: '1'
        },
        colMedia: {
          height: '344px'
        },
        colGroup: {
          'background-color': 'rgba(0,0,0,0)',
          float: 'none'
        },
        colCouple: {
          'margin-top': '20px',
          'text-align': 'left'
        },
        colCoupleRow: {
          'padding-left': '20px',
          'padding-right': '20px'
        }
      },
      '@media only screen and (min-width: 768px)': {
        colParagraph: {
          height: '490px',
          'overflow': 'auto'
        }
      }
    },
    props: {
      colMedia: { span: 24 },
      colCouple: { span: 24 },
      colGroup: { span: 24 }
    },
    theme: {
      root: ['mod-space'],
      media: ['mod-full-width'],
      colGroup: ['mod-full-width'],
      title: ['bigtitle', 'fontsColor'],
      subtitle: ['subtitle', 'fontsColor'],
      colCoupleRow: ['mod-full-width'],
      paragraph: ['paragraphType', 'fontsColor']
    },
    options: {
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/mixLayer/mix1.png'),
    preview: {
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
      colGroup: {
        'background-color': '#000',
        float: 'none',
        padding: 0
      },
      colMedia: {
        height: '689px'
      },
      media: {
        height: '689px',
        position: 'relative',
        'z-index': 1,
        opacity: '0.5'
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
          height: '344px',
          opacity: '1'
        },
        colMedia: {
          height: '344px'
        },
        colGroup: {
          'background-color': 'rgba(0,0,0,0)',
          float: 'none'
        },
        colCouple: {
          'margin-top': '20px',
          'text-align': 'center'
        },
        colCoupleRow: {
          'padding-left': '20px',
          'padding-right': '20px'
        }
      },
      '@media only screen and (min-width: 768px)': {
        colParagraph: {
          height: '490px',
          'overflow': 'auto'
        }
      }
    },
    props: {
      colMedia: { span: 24 },
      colCouple: { span: 24 },
      colGroup: { span: 24 }
    },
    theme: {
      root: ['mod-space'],
      media: ['mod-full-width'],
      colGroup: ['mod-full-width'],
      title: ['bigtitle', 'fontsColor'],
      subtitle: ['subtitle', 'fontsColor'],
      colCoupleRow: ['mod-full-width'],
      paragraph: ['paragraphType', 'fontsColor']
    },
    options: {
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/mixLayer/mix2.png'),
    preview: {
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
      colGroup: {
        'background-color': '#000',
        float: 'none',
        padding: 0
      },
      colMedia: {
        height: '689px'
      },
      media: {
        height: '689px',
        position: 'relative',
        'z-index': 1,
        opacity: '0.5'
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
          height: '344px',
          opacity: '1'
        },
        colMedia: {
          height: '344px'
        },
        colGroup: {
          'background-color': 'rgba(0,0,0,0)',
          float: 'none'
        },
        colCouple: {
          'margin-top': '20px',
          'text-align': 'right'
        },
        colCoupleRow: {
          'padding-left': '20px',
          'padding-right': '20px'
        }
      },
      '@media only screen and (min-width: 768px)': {
        colParagraph: {
          height: '490px',
          'overflow': 'auto'
        }
      }
    },
    props: {
      colMedia: { span: 24 },
      colCouple: { span: 24 },
      colGroup: { span: 24 }
    },
    theme: {
      root: ['mod-space'],
      media: ['mod-full-width'],
      colGroup: ['mod-full-width'],
      title: ['bigtitle', 'fontsColor'],
      subtitle: ['subtitle', 'fontsColor'],
      colCoupleRow: ['mod-full-width'],
      paragraph: ['paragraphType', 'fontsColor']
    },
    options: {
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/mixLayer/mix3.png'),
    preview: {
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
      colGroup: {
        'background-color': '#000',
        float: 'none',
        padding: 0
      },
      colMedia: {
        height: '689px'
      },
      media: {
        height: '689px',
        position: 'relative',
        'z-index': 1,
        opacity: '0.5'
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
          height: '344px',
          opacity: '1'
        },
        colMedia: {
          height: '344px'
        },
        colGroup: {
          'background-color': 'rgba(0,0,0,0)',
          float: 'none'
        },
        colCouple: {
          'margin-top': '20px',
          'text-align': 'left'
        },
        colCoupleRow: {
          'padding-left': '20px',
          'padding-right': '20px'
        }
      },
      '@media only screen and (min-width: 768px)': {
        colParagraph: {
          height: '300px',
          'overflow': 'auto'
        }
      }
    },
    props: {
      colMedia: { span: 24 },
      colCouple: { span: 24 },
      colGroup: { span: 24 }
    },
    theme: {
      root: ['mod-space'],
      media: ['mod-full-width'],
      colGroup: ['mod-full-width'],
      title: ['bigtitle', 'fontsColor'],
      subtitle: ['subtitle', 'fontsColor'],
      colCoupleRow: ['mod-full-width'],
      paragraph: ['paragraphType', 'fontsColor']
    },
    options: {
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/mixLayer/mix4.png'),
    preview: {
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
      colGroup: {
        'background-color': '#000',
        float: 'none',
        padding: 0
      },
      colMedia: {
        height: '689px'
      },
      media: {
        height: '689px',
        position: 'relative',
        'z-index': 1,
        opacity: '0.5'
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
          height: '344px',
          opacity: '1'
        },
        colMedia: {
          height: '344px'
        },
        colGroup: {
          'background-color': 'rgba(0,0,0,0)',
          float: 'none'
        },
        colCouple: {
          'margin-top': '20px',
          'text-align': 'center'
        },
        colCoupleRow: {
          'padding-left': '20px',
          'padding-right': '20px'
        }
      },
      '@media only screen and (min-width: 768px)': {
        colParagraph: {
          height: '300px',
          'overflow': 'auto'
        }
      }
    },
    props: {
      colMedia: { span: 24 },
      colCouple: { span: 24 },
      colGroup: { span: 24 }
    },
    theme: {
      root: ['mod-space'],
      media: ['mod-full-width'],
      colGroup: ['mod-full-width'],
      title: ['bigtitle', 'fontsColor'],
      subtitle: ['subtitle', 'fontsColor'],
      colCoupleRow: ['mod-full-width'],
      paragraph: ['paragraphType', 'fontsColor']
    },
    options: {
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/mixLayer/mix5.png'),
    preview: {
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
      colGroup: {
        'background-color': '#000',
        float: 'none',
        padding: 0
      },
      colMedia: {
        height: '689px'
      },
      media: {
        height: '689px',
        position: 'relative',
        'z-index': 1,
        opacity: '0.5'
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
          height: '344px',
          opacity: '1'
        },
        colMedia: {
          height: '344px'
        },
        colGroup: {
          'background-color': 'rgba(0,0,0,0)',
          float: 'none'
        },
        colCouple: {
          'margin-top': '20px',
          'text-align': 'right'
        },
        colCoupleRow: {
          'padding-left': '20px',
          'padding-right': '20px'
        }
      },
      '@media only screen and (min-width: 768px)': {
        colParagraph: {
          height: '300px',
          'overflow': 'auto'
        }
      }
    },
    props: {
      colMedia: { span: 24 },
      colCouple: { span: 24 },
      colGroup: { span: 24 }
    },
    theme: {
      root: ['mod-space'],
      media: ['mod-full-width'],
      colGroup: ['mod-full-width'],
      title: ['bigtitle', 'fontsColor'],
      subtitle: ['subtitle', 'fontsColor'],
      colCoupleRow: ['mod-full-width'],
      paragraph: ['paragraphType', 'fontsColor']
    },
    options: {
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/mixLayer/mix6.png'),
    preview: {
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
      colGroup: {
        'background-color': '#000',
        float: 'none',
        padding: 0
      },
      colMedia: {
        height: '689px'
      },
      media: {
        height: '689px',
        position: 'relative',
        'z-index': 1,
        opacity: '0.5'
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
          height: '344px',
          opacity: '1'
        },
        colMedia: {
          height: '344px'
        },
        colGroup: {
          'background-color': 'rgba(0,0,0,0)',
          float: 'none'
        },
        colCouple: {
          'margin-top': '20px',
          'text-align': 'left'
        },
        colCoupleRow: {
          'padding-left': '20px',
          'padding-right': '20px'
        }
      },
      '@media only screen and (min-width: 768px)': {
        colParagraph: {
          height: '150px',
          'overflow': 'auto'
        }
      }
    },
    props: {
      colMedia: { span: 24 },
      colCouple: { span: 24 },
      colGroup: { span: 24 }
    },
    theme: {
      root: ['mod-space'],
      media: ['mod-full-width'],
      colGroup: ['mod-full-width'],
      title: ['bigtitle', 'fontsColor'],
      subtitle: ['subtitle', 'fontsColor'],
      colCoupleRow: ['mod-full-width'],
      paragraph: ['paragraphType', 'fontsColor']
    },
    options: {
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/mixLayer/mix7.png'),
    preview: {
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
      colGroup: {
        'background-color': '#000',
        float: 'none',
        padding: 0
      },
      colMedia: {
        height: '689px'
      },
      media: {
        height: '689px',
        position: 'relative',
        'z-index': 1,
        opacity: '0.5'
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
          height: '344px',
          opacity: '1'
        },
        colMedia: {
          height: '344px'
        },
        colGroup: {
          'background-color': 'rgba(0,0,0,0)',
          float: 'none'
        },
        colCouple: {
          'margin-top': '20px',
          'text-align': 'center'
        },
        colCoupleRow: {
          'padding-left': '20px',
          'padding-right': '20px'
        }
      },
      '@media only screen and (min-width: 768px)': {
        colParagraph: {
          height: '150px',
          'overflow': 'auto'
        }
      }
    },
    props: {
      colMedia: { span: 24 },
      colCouple: { span: 24 },
      colGroup: { span: 24 }
    },
    theme: {
      root: ['mod-space'],
      media: ['mod-full-width'],
      colGroup: ['mod-full-width'],
      title: ['bigtitle', 'fontsColor'],
      subtitle: ['subtitle', 'fontsColor'],
      colCoupleRow: ['mod-full-width'],
      paragraph: ['paragraphType', 'fontsColor']
    },
    options: {
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/mixLayer/mix8.png'),
    preview: {
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
      colGroup: {
        'background-color': '#000',
        float: 'none',
        padding: 0
      },
      colMedia: {
        height: '689px'
      },
      media: {
        height: '689px',
        position: 'relative',
        'z-index': 1,
        opacity: '0.5'
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
          height: '344px',
          opacity: '1'
        },
        colMedia: {
          height: '344px'
        },
        colGroup: {
          'background-color': 'rgba(0,0,0,0)',
          float: 'none'
        },
        colCouple: {
          'margin-top': '20px',
          'text-align': 'right'
        },
        colCoupleRow: {
          'padding-left': '20px',
          'padding-right': '20px'
        }
      },
      '@media only screen and (min-width: 768px)': {
        colParagraph: {
          height: '150px',
          'overflow': 'auto'
        }
      }
    },
    props: {
      colMedia: { span: 24 },
      colCouple: { span: 24 },
      colGroup: { span: 24 }
    },
    theme: {
      root: ['mod-space'],
      media: ['mod-full-width'],
      colGroup: ['mod-full-width'],
      title: ['bigtitle', 'fontsColor'],
      subtitle: ['subtitle', 'fontsColor'],
      colCoupleRow: ['mod-full-width'],
      paragraph: ['paragraphType', 'fontsColor']
    },
    options: {
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/mixLayer/mix9.png'),
    preview: {
      inner: {
        'margin-top': '-20px'
      }
    }
  },
  {
    templateID: 1,
    data: {
      root: {
        position: 'relative'
      },
      colGroupRow: {
        display: 'flex',
        'flex-direction': 'row',
        'align-items': 'flex-start',
        'justify-content': 'center'
      },
      colCoupleRow: {
        display: 'flex',
        'flex-direction': 'row',
        'align-items': 'flex-start',
        'justify-content': 'center',
        'margin-top': '-600px',
        'z-index': '2'
      },
      colMediaA: {
        height: '689px',
        padding: '0'
      },
      colMediaB: {
        margin: '0 2% 0 2%',
        height: '689px',
        padding: '0'
      },
      colMediaC: {
        margin: '0 2% 0 0',
        height: '689px',
        padding: '0'
      },
      colMediaD: {
        height: '689px',
        padding: '0'
      },
      mediaA: {
        height: '689px',
        'z-index': 1
      },
      mediaB: {
        height: '689px',
        'z-index': 1
      },
      mediaC: {
        height: '689px',
        'z-index': 1
      },
      mediaD: {
        height: '689px',
        'z-index': 1
      },
      colCoupleA: {
        padding: '0 5px'
      },
      colCoupleB: {
        margin: '0 2% 0 2%',
        padding: '0 5px'
      },
      colCoupleC: {
        margin: '0 2% 0 0',
        padding: '0 5px'
      },
      colCoupleD: {
        padding: '0 5px'
      },
      '@media only screen and (max-width: 768px)': {
        colGroupRow: {
          display: 'block'
        },
        colCoupleRow: {
          'margin-top': '-800px',
          display: 'block'
        },
        colMediaA: {
          position: 'relative',
          height: '200px',
          padding: '0'
        },
        colMediaB: {
          position: 'relative',
          height: '200px',
          padding: '0',
          margin: '10px 0 10px 0'
        },
        colMediaC: {
          position: 'relative',
          height: '200px',
          padding: '0',
          margin: '0 0 10px 0'
        },
        colMediaD: {
          position: 'relative',
          height: '200px',
          padding: '0'
        },
        mediaA: {
          height: '200px',
          position: 'relative',
          'z-index': 1
        },
        mediaB: {
          height: '200px',
          position: 'relative',
          'z-index': 1
        },
        mediaC: {
          height: '200px',
          position: 'relative',
          'z-index': 1
        },
        mediaD: {
          height: '200px',
          position: 'relative',
          'z-index': 1
        },
        colCoupleA: {
          height: '200px',
          padding: '0 5px',
          overflow: 'hidden'
        },
        colCoupleB: {
          height: '200px',
          margin: '10px 0 10px 0',
          padding: '0 5px',
          overflow: 'hidden'
        },
        colCoupleC: {
          height: '200px',
          margin: '0 0 10px 0',
          padding: '0 5px',
          overflow: 'hidden'
        },
        colCoupleD: {
          height: '200px',
          padding: '0 5px',
          overflow: 'hidden'
        }
      }
    },
    props: {
      colMedia: { span: 24 },
      colCouple: { span: 24 },
      colGroup: { span: 24 }
    },
    theme: {
      root: ['mod-space'],
      // media: ['mod-full-width'],
      colGroup: ['mod-full-width'],
      titleA: ['subtitle', 'fontsColor'],
      titleB: ['subtitle', 'fontsColor'],
      titleC: ['subtitle', 'fontsColor'],
      titleD: ['subtitle', 'fontsColor'],
      subtitleA: ['paragraphType', 'fontsColor'],
      subtitleB: ['paragraphType', 'fontsColor'],
      subtitleC: ['paragraphType', 'fontsColor'],
      subtitleD: ['paragraphType', 'fontsColor'],
      paragraphA: ['auxiliaryText', 'fontsColor'],
      paragraphB: ['auxiliaryText', 'fontsColor'],
      paragraphC: ['auxiliaryText', 'fontsColor'],
      paragraphD: ['auxiliaryText', 'fontsColor'],
      colCoupleRow: ['mod-full-width']
    },
    options: {
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/mixLayer/mix2.png'),
    preview: {
      inner: {
        'margin-top': '-20px'
      }
    }
  },
  {
    templateID: 2,
    data: {
      root: {
        position: 'relative'
      },
      colGroupRow: {
        display: 'flex',
        'flex-direction': 'row',
        'align-items': 'flex-start',
        'justify-content': 'center'
      },
      colCoupleRow: {
        display: 'flex',
        'flex-direction': 'row',
        'align-items': 'flex-start',
        'justify-content': 'center',
        'margin-top': '-600px',
        'z-index': '2'
      },
      colMediaA: {
        height: '689px',
        padding: '0'
      },
      colMediaB: {
        margin: '0 2% 0 2%',
        height: '689px',
        padding: '0'
      },
      mediaA: {
        height: '689px',
        'z-index': 1
      },
      mediaB: {
        height: '689px',
        'z-index': 1
      },
      colCoupleA: {
        padding: '0 5px'
      },
      colCoupleB: {
        margin: '0 2% 0 2%',
        padding: '0 5px'
      },
      '@media only screen and (max-width: 768px)': {
        colGroupRow: {
          display: 'block'
        },
        colCoupleRow: {
          'margin-top': '-400px',
          display: 'block'
        },
        colMediaA: {
          height: '200px',
          padding: '0'
        },
        colMediaB: {
          height: '200px',
          padding: '0',
          margin: '10px 0 10px 0'
        },
        mediaA: {
          height: '200px',
          position: 'relative',
          'z-index': 1
        },
        mediaB: {
          height: '200px',
          position: 'relative',
          'z-index': 1
        },
        colCoupleA: {
          height: '200px',
          padding: '0 5px',
          overflow: 'hidden'
        },
        colCoupleB: {
          height: '200px',
          margin: '10px 0 10px 0',
          padding: '0 5px',
          overflow: 'hidden'
        }
      }
    },
    props: {
      colMedia: { span: 24 },
      colCouple: { span: 24 },
      colGroup: { span: 24 }
    },
    theme: {
      root: ['mod-space'],
      // media: ['mod-full-width'],
      colGroup: ['mod-full-width'],
      titleA: ['subtitle', 'fontsColor'],
      titleB: ['subtitle', 'fontsColor'],
      titleC: ['subtitle', 'fontsColor'],
      titleD: ['subtitle', 'fontsColor'],
      subtitleA: ['paragraphType', 'fontsColor'],
      subtitleB: ['paragraphType', 'fontsColor'],
      paragraphA: ['auxiliaryText', 'fontsColor'],
      paragraphB: ['auxiliaryText', 'fontsColor'],
      colCoupleRow: ['mod-full-width']
    },
    options: {
      config: { ...emptyData }
    },
    cover: require('@/../static/adi/mixLayer/mix2.png'),
    preview: {
      inner: {
        'margin-top': '-20px'
      }
    }
  }
]
